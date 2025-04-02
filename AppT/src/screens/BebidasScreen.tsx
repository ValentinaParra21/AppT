import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Platillo = {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen?: string;
};

const FuertesScreen = () => {
  const [platillos, setPlatillos] = useState<Platillo[]>([]);
  const [loading, setLoading] = useState(true);

  const categoriaId = "672ade63179e7878047f5372"; // ID de la categoría "Bebidas"

  useEffect(() => {
    const fetchPlatillos = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `http://192.168.20.23:9001/api/platillos?categoria=${categoriaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlatillos(response.data.data);
      } catch (error) {
        console.error("Error cargando las bebidas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatillos();
  }, []);

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
        <Text style={styles.titulo}>Bebidas</Text>

        {platillos.map((plato) => (
          <View key={plato._id} style={styles.card}>
            {/* Aquí puedes usar una imagen fija mientras no haya URL en la DB */}
            <Image
              source={require("../../assets/fuerte.png")}
              style={styles.imagen}
            />
            <View style={styles.contenido}>
              <Text style={styles.nombre}>{plato.nombre}</Text>
              <Text style={styles.descripcion}>{plato.descripcion}</Text>
              <View style={styles.precioContainer}>
                <Text style={styles.precio}>{plato.precio}</Text>
                <TouchableOpacity style={styles.botonAñadir}>
                  <Text style={styles.botonTexto}>Añadir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.resumenContainer}>
        <Text style={styles.resumenTexto}>Total items: 0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // mismos estilos que ya tienes...
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
  precio: { fontSize: 20, fontWeight: "bold", color: "#e74c3c" },
  botonAñadir: {
    backgroundColor: "#27ae60",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  botonTexto: { color: "#fff", fontWeight: "bold" },
  resumenContainer: { backgroundColor: "#2c3e50", padding: 15 },
  resumenTexto: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default FuertesScreen;
