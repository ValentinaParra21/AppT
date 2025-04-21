import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types";
import { useAuth } from "../auth/AuthContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Pedidos">;

const Pedidos: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const handleLogout = async () => {
    await logout();
    toggleMenu();
  };

  return (
    <View style={styles.container}>
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

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Realizar Pedido</Text>

          <TextInput style={styles.input} placeholder="Nombre del platillo" />
          <TextInput style={styles.input} placeholder="Cantidad" keyboardType="numeric" />

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Agregar Platillo</Text>
          </TouchableOpacity>

          <View style={styles.platillosContainer}>
            <View style={styles.platilloItem}>
              <Text style={styles.platilloName}>Platillo 1</Text>
              <TextInput style={styles.cantidadInput} defaultValue="1" />
              <TouchableOpacity style={styles.removeButton}>
                <Text style={styles.removeText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.totalText}>Total: $</Text>

          <TouchableOpacity style={styles.submitButton}>
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
    paddingTop: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0A1D56",
    padding: 12,
    marginBottom: 20,
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
    top: 35,
    left: 0,
    bottom: 0,
    width: 270,
    backgroundColor: "#0A1D56",
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
  addButton: {
    backgroundColor: "#1A237E",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  platillosContainer: {
    marginTop: 20,
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
  removeButton: {
    backgroundColor: "#E53935",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  removeText: {
    color: "#fff",
    fontSize: 14,
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
