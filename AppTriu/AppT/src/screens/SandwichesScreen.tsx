import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Platillo = {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen?: string;
};

const SandwichScreen = () => {
  const navigation = useNavigation();
  const [platillos, setPlatillos] = useState<Platillo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [platilloSeleccionado, setPlatilloSeleccionado] = useState<Platillo | null>(null);
  const [pedido, setPedido] = useState<{ platillo: Platillo; cantidad: number }[]>([]);
  const [confirmado, setConfirmado] = useState(false);

  const categoriaId = "680888f5b4cabd731613f7e0"; // ID de la categoría "Sandwiches"

  useEffect(() => {
    const fetchPlatillos = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `http://192.168.20.25:9001/api/platillos?categoria=${categoriaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlatillos(response.data.data);

        const storedPedido = await AsyncStorage.getItem("pedido");
        if (storedPedido) {
          setPedido(JSON.parse(storedPedido));
        }
      } catch (error) {
        console.error("Error cargando las Sandwiches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatillos();
  }, []);

  const abrirModal = (plato: Platillo) => {
    setPlatilloSeleccionado(plato);
    setCantidad(1);
    setModalVisible(true);
  };

  const añadirAlPedido = async () => {
    if (!platilloSeleccionado) return;

    if (cantidad < 1) {
      Alert.alert("Cantidad inválida", "Debes seleccionar al menos 1 unidad.");
      return;
    }

    const index = pedido.findIndex(item => item.platillo._id === platilloSeleccionado._id);
    let nuevoPedido;

    if (index !== -1) {
      nuevoPedido = [...pedido];
      nuevoPedido[index].cantidad += cantidad;
    } else {
      nuevoPedido = [...pedido, { platillo: platilloSeleccionado, cantidad }];
    }

    setPedido(nuevoPedido);
    await AsyncStorage.setItem("pedido", JSON.stringify(nuevoPedido));

    setModalVisible(false);
    setConfirmado(true);
    setTimeout(() => setConfirmado(false), 1500);
  };

  const irAResumen = () => {
    navigation.navigate("Pedidos"); // Ajusta este nombre si es diferente en tu app
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1A1A60" />
        <Text>Cargando platillos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.titulo}>Sandwiches"</Text>

        {platillos.map((plato) => (
          <View key={plato._id} style={styles.card}>
            <Image
              source={require("../../assets/fuerte.png")}
              style={styles.imagen}
            />
            <View style={styles.contenido}>
              <Text style={styles.nombre}>{plato.nombre}</Text>
              <Text style={styles.descripcion}>{plato.descripcion}</Text>
              <View style={styles.precioContainer}>
                <Text style={styles.precio}>{plato.precio}</Text>
                <TouchableOpacity
                  style={styles.botonAñadir}
                  onPress={() => abrirModal(plato)}
                >
                  <Text style={styles.botonTexto}>Añadir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.resumenContainer}>
        <Text style={styles.resumenTexto}>
          Total items: {pedido.reduce((sum, item) => sum + item.cantidad, 0)}
        </Text>
        <TouchableOpacity style={styles.botonResumen} onPress={irAResumen}>
                   <Text style={styles.resumenTextoBoton}>Ver resumen</Text>
                 </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitulo}>Cantidad</Text>
          <View style={styles.controlesCantidad}>
            <TouchableOpacity onPress={() => setCantidad(Math.max(1, cantidad - 1))}>
              <AntDesign name="minuscircleo" size={30} color="#333" />
            </TouchableOpacity>
            <Text style={styles.cantidadTexto}>{cantidad}</Text>
            <TouchableOpacity onPress={() => setCantidad(cantidad + 1)}>
              <AntDesign name="pluscircleo" size={30} color="#333" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.botonConfirmar} onPress={añadirAlPedido}>
            <Text style={styles.botonTexto}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {confirmado && (
        <View style={styles.feedback}>
          <Text style={styles.feedbackTexto}>¡Añadido al pedido!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  scrollContainer: { padding: 15 },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  imagen: { width: "100%", height: 200, resizeMode: "cover" },
  contenido: { padding: 15 },
  nombre: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 8 },
  descripcion: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
    lineHeight: 22,
  },
  precioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  precio: { fontSize: 20, fontWeight: "bold", color: "#f2c200" },
  botonAñadir: {
    backgroundColor: "#f2c200", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  botonTexto: { color: "#1e2a38", fontWeight: "bold" },
  resumenContainer: {
    backgroundColor: "#1e2a38", 
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resumenTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  botonResumen: {
    backgroundColor: "#f2c200", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  resumenTextoBoton: {
    color: "#1e2a38", 
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  modal: { justifyContent: "flex-end", margin: 0 },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalTitulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  controlesCantidad: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "60%",
    marginBottom: 20,
  },
  cantidadTexto: { fontSize: 20, fontWeight: "bold", marginHorizontal: 20 },
  botonConfirmar: {
    backgroundColor: "#f2c200", 
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  feedback: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "#2ecc71",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  feedbackTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SandwichScreen;
