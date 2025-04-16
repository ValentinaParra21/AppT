import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Fuertes: undefined;
  Quesos: undefined;
  Vinos: undefined;
  Sandwiches: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

type Categoria = {
  _id: string;
  nombre: string;
  descripcion: string;
};

export default function MenuScreen() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.error("No se encontró el token.");
          return;
        }

        const response = await axios.get("http://192.168.20.23:9001/api/categorias", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategorias(response.data);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }
    };

    fetchCategorias();
  }, []);

  const handlePressCategoria = (categoria: Categoria) => {
    const nombre = categoria.nombre.toLowerCase();
  
    switch (nombre) {
      case "platos fuertes":
      case "fuertes":
        navigation.navigate("Fuertes");
        break;
      case "quesos":
        navigation.navigate("Quesos");
        break;
      case "vinos":
        navigation.navigate("Vinos");
        break;
      case "sandwiches":
        navigation.navigate("Sandwiches");
        break;
      default:
        console.warn("Categoría no reconocida:", categoria.nombre);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REALIZA UN PEDIDO</Text>

      <FlatList
        data={categorias}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => handlePressCategoria(item)}>
            <Text style={styles.buttonText}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A60",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#D4A017",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "rgb(0, 0, 53)",
    fontWeight: "bold",
  },
});
