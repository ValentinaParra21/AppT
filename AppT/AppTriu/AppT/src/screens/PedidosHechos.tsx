// src/screens/PedidosHechos.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const pedidos = [
  { id: "1", estado: "Entregado" },
  { id: "2", estado: "Pendiente" },
  { id: "3", estado: "En preparación" },
];

const PedidosHechos = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos Hechos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.pedido}>
            <Text>Pedido #{item.id}</Text>
            <Text>Estado: {item.estado}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  pedido: { padding: 15, borderBottomWidth: 1 },
});

export default PedidosHechos;
