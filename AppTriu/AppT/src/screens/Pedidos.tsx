import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootStackParamList } from "../types";
import { useAuth } from "../auth/AuthContext";

const Pedidos: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Pedidos">>();
  const { logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [pedido, setPedido] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [descripcion, setDescripcion] = useState("");
  const [cliente, setCliente] = useState({
    identificacion: "",
    nombre: "",
    direccion: "",
    telefono: "",
  });

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleLogout = async () => {
    await logout();
    toggleMenu();
  };

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const dataString = await AsyncStorage.getItem("pedido");
        if (dataString) {
          const data = JSON.parse(dataString);
          setPedido(data);

          const totalCalculado = data.reduce((acc: number, item: any) => {
            const precio = parseFloat(item.platillo?.precio) || 0;
            const cantidad = parseInt(item.cantidad, 10) || 0;
            return acc + precio * cantidad;
          }, 0);

          setTotal(totalCalculado);
        }
      } catch (error) {
        console.error("Error cargando pedido:", error);
      }
    };

    fetchPedido();
  }, []);

  const enviarPedido = async () => {
    if (!descripcion.trim()) {
      Alert.alert("Falta información", "La descripción del pedido es obligatoria.");
      return;
    }
  
    if (
      !cliente.identificacion.trim() ||
      !cliente.nombre.trim() ||
      !cliente.direccion.trim() ||
      !cliente.telefono.trim()
    ) {
      Alert.alert("Falta información", "Por favor completa todos los campos del cliente.");
      return; 
    }
  
    try {
      const token = await AsyncStorage.getItem("token");
      const now = new Date();
      const fecha = now.toISOString().split("T")[0];
      const hora = now.toTimeString().slice(0, 5);
      const estado = "Activo";
  
      const platillos = pedido.map((item) => ({
        platillo: item.platillo?._id || item._id, // usa el id correcto del platillo
        cantidad: parseInt(item.cantidad, 10),
      }));
  
      const totalPedido = parseFloat(total.toFixed(2));
  
      const response = await fetch("192.168.20.25:9001/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fecha,
          hora,
          total: totalPedido,
          Descripcion: descripcion, // <- Correcto con mayúscula
          estado,
          cliente,
          platillos,
        }),
      });
  
      const result = await response.json();
      console.log("Pedido enviado:", result);
      await AsyncStorage.removeItem("pedido");
      setPedido([]);
      setTotal(0);
      setDescripcion("");
      setCliente({ identificacion: "", nombre: "", direccion: "", telefono: "" });
      Alert.alert("Éxito", "¡Pedido enviado con éxito!");
    } catch (error) {
      console.error("Error al enviar pedido:", error);
      Alert.alert("Error", "Hubo un problema al enviar el pedido.");
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Menú lateral e ícono */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Image source={require("../../assets/logoT.png")} style={styles.logo} />
      </View>

      {menuVisible && <Pressable style={styles.overlay} onPress={toggleMenu} />}
      <View style={[styles.menu, { left: menuVisible ? 0 : -270 }]}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.menuTitle}>Menú Principal</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Pedidos")}>
          <Ionicons name="clipboard" size={20} color="#fff" />
          <Text style={styles.menuText}>Pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Menu")}>
          <Ionicons name="restaurant" size={20} color="#fff" />
          <Text style={styles.menuText}>Menú del Día</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.menuText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Resumen del Pedido</Text>

          {pedido.map((item, index) => (
            <View key={index} style={styles.platilloItem}>
              <Text style={styles.platilloName}>{item.platillo?.nombre || "Sin nombre"}</Text>
              <Text style={styles.cantidadInput}>x{item.cantidad || 0}</Text>
              <Text style={styles.removeText}>
                ${(
                  (parseFloat(item.platillo?.precio) || 0) * (parseInt(item.cantidad, 10) || 0)
                ).toFixed(2)}
              </Text>
            </View>
          ))}

          <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>

          {/* Formulario del cliente */}
          <Text style={styles.title}>Datos del Cliente</Text>

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            placeholder="Descripción del pedido"
            value={descripcion}
            onChangeText={setDescripcion}
          />

          <Text style={styles.label}>Identificación</Text>
          <TextInput
            style={styles.input}
            placeholder="Cédula o RUC"
            value={cliente.identificacion}
            onChangeText={(text) => setCliente({ ...cliente, identificacion: text })}
          />

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del cliente"
            value={cliente.nombre}
            onChangeText={(text) => setCliente({ ...cliente, nombre: text })}
          />

          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={styles.input}
            placeholder="Dirección del cliente"
            value={cliente.direccion}
            onChangeText={(text) => setCliente({ ...cliente, direccion: text })}
          />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Teléfono del cliente"
            value={cliente.telefono}
            keyboardType="phone-pad"
            onChangeText={(text) => setCliente({ ...cliente, telefono: text })}
          />

          <TouchableOpacity style={styles.submitButton} onPress={enviarPedido}>
            <Text style={styles.submitButtonText}>Enviar Pedido</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A237E",
    paddingTop: 40,
    paddingHorizontal: 20,
    height: 90,
    gap: 20,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
    marginLeft: "70%",
    marginBottom: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 270,
    backgroundColor: "#1A237E",
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 10,
    zIndex: 1000,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  menuTitle: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A237E",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#90CAF9",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#E3F2FD",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A237E",
    marginBottom: 5,
  },
  platilloItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  platilloName: {
    fontSize: 16,
    color: "#34495E",
    flex: 1,
  },
  cantidadInput: {
    width: 50,
    height: 40,
    borderColor: "#90CAF9",
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    backgroundColor: "#E3F2FD",
  },
  removeText: {
    color: "#fff",
    fontSize: 14,
    backgroundColor: "#1A237E",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1565C0",
    textAlign: "right",
    marginVertical: 20,
  },
  submitButton: {
    backgroundColor: "#1A237E",
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Pedidos;
