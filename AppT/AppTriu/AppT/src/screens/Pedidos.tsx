import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from "@react-native-picker/picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Pedidos = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [platillosDisponibles, setPlatillosDisponibles] = useState<any[]>([]);
  const [pedido, setPedido] = useState({
    fecha: format(new Date(), "yyyy-MM-dd"),
    hora: format(new Date(), "HH:mm"),
    Descripcion: "",
    CodigoP: "",
    estado: "Activo",
    platillos: [] as Array<{ platillo: string; cantidad: number }>,
    cliente: {
      nombre: "Cliente Genérico",
      identificacion: "0000000000",
      direccion: "No especificada",
      telefono: "No especificado",
      email: "no@especificado.com"
    }
  });
  const [totalPedido, setTotalPedido] = useState(0);
  const [selectedPlatillo, setSelectedPlatillo] = useState("");

  useEffect(() => {
    const cargarPlatillos = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error("No se encontró token de autenticación");
        }

        const response = await axios.get("http://192.168.20.23:9001/api/platillos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlatillosDisponibles(response.data.data || []);
      } catch (error) {
        setError("Error al cargar los platillos");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    cargarPlatillos();
  }, []);

  const calcularTotal = (platillos: any[]) => {
    return platillos.reduce((total, item) => {
      const platillo = platillosDisponibles.find(p => p._id === item.platillo);
      return total + (platillo?.precio || 0) * item.cantidad;
    }, 0);
  };

  const agregarPlatilloAPedido = () => {
    if (!selectedPlatillo) return;

    const nuevosPlatillos = [
      ...pedido.platillos,
      { platillo: selectedPlatillo, cantidad: 1 }
    ];

    setPedido(prev => ({
      ...prev,
      platillos: nuevosPlatillos
    }));

    setTotalPedido(calcularTotal(nuevosPlatillos));
    setSelectedPlatillo("");
  };

  const eliminarPlatilloDelPedido = (index: number) => {
    const nuevosPlatillos = pedido.platillos.filter((_, i) => i !== index);
    setPedido(prev => ({
      ...prev,
      platillos: nuevosPlatillos
    }));
    setTotalPedido(calcularTotal(nuevosPlatillos));
  };

  const actualizarCantidad = (index: number, cantidad: string) => {
    const nuevosPlatillos = [...pedido.platillos];
    nuevosPlatillos[index].cantidad = parseInt(cantidad) || 1;
    
    setPedido(prev => ({
      ...prev,
      platillos: nuevosPlatillos
    }));
    
    setTotalPedido(calcularTotal(nuevosPlatillos));
  };

  const validarPedido = () => {
    if (
      !pedido.Descripcion ||
      !pedido.CodigoP ||
      pedido.platillos.length === 0
    ) {
      Alert.alert("Error", "Por favor completa todos los campos y selecciona al menos un platillo.");
      return false;
    }
    return true;
  };

  const enviarPedido = async () => {
    if (!validarPedido()) return;

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error("No se encontró token de autenticación");
      }

      const payload = {
        ...pedido,
        total: totalPedido
      };

      const response = await axios.post("http://192.168.0.35:9001/api/Pedidos", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      Alert.alert("Éxito", "Pedido creado correctamente");
      // Resetear formulario
      setPedido({
        fecha: format(new Date(), "yyyy-MM-dd"),
        hora: format(new Date(), "HH:mm"),
        Descripcion: "",
        CodigoP: "",
        estado: "Activo",
        platillos: [],
        cliente: {
          nombre: "Cliente Genérico",
          identificacion: "0000000000",
          direccion: "No especificada",
          telefono: "No especificado",
          email: "no@especificado.com"
        }
      });
      setTotalPedido(0);
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar el pedido");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatoPesos = (valor: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(valor);
  };

  if (loading && platillosDisponibles.length === 0) {
    return (
      <ImageBackground 
        source={require('../../assets/pedido.png')} 
        style={styles.background}
      >
        <View style={[styles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground 
        source={require('../../assets/pedido.png')} 
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={[styles.title, { color: "red" }]}>{error}</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={require('../../assets/pedido.png')} 
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Realizar Pedido</Text>
          
          <View style={styles.rememberBox}>
            <Text style={styles.rememberText}>Recuerda que todos tus pedidos quedan registrados</Text>
          </View>

          <TextInput
            placeholder="Descripción del pedido"
            placeholderTextColor="#555"
            style={styles.input}
            value={pedido.Descripcion}
            onChangeText={(text) => setPedido({...pedido, Descripcion: text})}
          />

          <TextInput
            placeholder="Código del pedido"
            placeholderTextColor="#555"
            style={styles.input}
            value={pedido.CodigoP}
            onChangeText={(text) => setPedido({...pedido, CodigoP: text})}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedPlatillo}
              onValueChange={(itemValue) => setSelectedPlatillo(itemValue)}
              style={styles.picker}
              dropdownIconColor="#FFD700"
            >
              <Picker.Item label="Seleccionar platillo" value="" />
              {platillosDisponibles.map((platillo) => (
                <Picker.Item 
                  key={platillo._id} 
                  label={`${platillo.nombre} - ${formatoPesos(platillo.precio)}`} 
                  value={platillo._id} 
                />
              ))}
            </Picker>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={agregarPlatilloAPedido}
              disabled={!selectedPlatillo}
            >
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.platillosContainer}>
            {pedido.platillos.map((item, index) => {
              const platillo = platillosDisponibles.find(p => p._id === item.platillo);
              return (
                <View key={index} style={styles.platilloItem}>
                  <View style={styles.platilloInfo}>
                    <Text style={styles.platilloName}>
                      {platillo?.nombre || "Platillo no encontrado"}
                    </Text>
                    <TextInput
                      style={styles.cantidadInput}
                      keyboardType="numeric"
                      value={item.cantidad.toString()}
                      onChangeText={(text) => actualizarCantidad(index, text)}
                    />
                    <Text style={styles.platilloPrice}>
                      {formatoPesos((platillo?.precio || 0) * item.cantidad)}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => eliminarPlatilloDelPedido(index)}
                  >
                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: {formatoPesos(totalPedido)}</Text>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={enviarPedido}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.buttonText}>Enviar Pedido</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

// Tus estilos permanecen igual...
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: 'rgba(0, 0, 50, 0.8)',
  },
  title: { 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 20,
    textAlign: "center",
    color: "#FFD700",
    textTransform: "uppercase",
  },
  rememberBox: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#000",
  },
  rememberText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    textTransform: "uppercase",
  },
  input: { 
    width: "100%",
    borderWidth: 2, 
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 10,
    backgroundColor: "#FFF",
    fontSize: 16,
    color: "#000",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  picker: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 2,
    color: "#000",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  platillosContainer: {
    marginVertical: 10,
  },
  platilloItem: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  platilloInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  platilloName: {
    flex: 1,
    color: "#000",
    fontWeight: "bold",
  },
  cantidadInput: {
    width: 50,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
    textAlign: "center",
    color: "#000",
    backgroundColor: "#FFF",
  },
  platilloPrice: {
    color: "#000",
    fontWeight: "bold",
    minWidth: 100,
    textAlign: "right",
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#FFF",
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#FFD700",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Pedidos;