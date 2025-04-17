import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const quesos = [
  { id: "1", nombre: "Queso Brie", descripcion: "Suave y cremoso", precio: 12000 },
  { id: "2", nombre: "Queso Gouda", descripcion: "Dulce y ligero", precio: 10000 },
  { id: "3", nombre: "Queso Azul", descripcion: "Fuerte y picante", precio: 15000 },
  { id: "4", nombre: "Queso Parmesano", descripcion: "Duro y sabroso", precio: 13000 },
];

const QuesosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecciona tu Queso</Text>
      <FlatList
        data={quesos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
            <Text style={styles.precio}>${item.precio}</Text>
            <TouchableOpacity style={styles.boton}>
              <Text style={styles.botonTexto}>Añadir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descripcion: {
    fontSize: 14,
    color: "gray",
  },
  precio: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  boton: {
    backgroundColor: "#ffcc00",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  botonTexto: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuesosScreen;