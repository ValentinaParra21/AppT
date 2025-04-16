import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const sandwiches = [
  { id: "1", nombre: "Sándwich de Pollo", descripcion: "Pollo asado con queso y lechuga", precio: 18000 },
  { id: "2", nombre: "Sándwich Vegetariano", descripcion: "Verduras frescas con queso y aderezo", precio: 16000 },
  { id: "3", nombre: "Sándwich de Roast Beef", descripcion: "Carne de res con mostaza y queso suizo", precio: 20000 },
  { id: "4", nombre: "Sándwich de Atún", descripcion: "Atún con mayonesa y lechuga", precio: 17000 },
];

const SandwichesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecciona tu Sándwich</Text>
      <FlatList
        data={sandwiches}
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

export default SandwichesScreen;