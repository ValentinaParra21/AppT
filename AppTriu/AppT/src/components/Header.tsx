import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../auth/AuthContext"; // Importa tu contexto

const Header = () => {
  const { logout } = useAuth(); 
//Este ees un comentario de prueba 
  const handleLogout = async () => {
    await logout(); 
  };

  return (
    <View style={styles.header}> 
      <Text style={styles.title}>TRIÜ</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFC107",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Header;
