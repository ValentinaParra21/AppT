import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const vinos = [
  { id: "1", nombre: "Vino Tinto Cabernet", descripcion: "Cuerpo robusto con notas de frutas rojas", precio: 45000 },
  { id: "2", nombre: "Vino Blanco Chardonnay", descripcion: "Fresco y afrutado con toques de vainilla", precio: 40000 },
  { id: "3", nombre: "Vino Rosado Merlot", descripcion: "Suave y ligero con aromas florales", precio: 42000 },
  { id: "4", nombre: "Vino Espumoso Brut", descripcion: "Refrescante y burbujeante con notas cítricas", precio: 48000 },
];

const VinosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecciona tu Vino</Text>
      <FlatList
        data={vinos}
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

export default VinosScreen;