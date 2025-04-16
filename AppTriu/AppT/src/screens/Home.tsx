import React, { useState, useRef } from "react";
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, Pressable 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../auth/AuthContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const { logout } = useAuth(); // ⬅️ Accedemos al logout del contexto
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: menuVisible ? -250 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: menuVisible ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    setMenuVisible(!menuVisible);
  };

  // 🔐 Manejo del cierre de sesión
  const handleLogout = async () => {
    await logout(); // Esto actualiza el estado de autenticación
    toggleMenu();   // Opcional: cierra el menú
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Image source={require("../../assets/logoT.png")} style={styles.profileImage} />
      </View>

      {menuVisible && <Pressable style={styles.overlay} onPress={toggleMenu} />}

      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
          <Ionicons name="close" size={28} color="#FFC107" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Pedidos")}>
          <Text style={styles.menuText}>REALIZAR PEDIDO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Menu")}>
          <Text style={styles.menuText}>MENÚ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuText}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/imginicio.png")} style={styles.image} />
          <Text style={styles.overlayText}>¡HOLA!, BIENVENIDO</Text>
        </View>

        <Text style={styles.subtitle}>¡Hola! Bienvenido a Queso Raclette TRIÜ 🧀</Text>
        <Text style={styles.description}>
          Un nuevo día comienza, y es momento de brindar el mejor servicio a nuestros clientes. 
          Desde aquí podrás gestionar pedidos, consultar el menú y asegurar que cada plato llegue perfecto a la mesa.
        </Text>

        <View style={styles.missionContainer}>
          <Text style={styles.missionTitle}>Tu misión hoy:</Text>
          <Text style={styles.missionItem}>✅ Atender con amabilidad y eficiencia.</Text>
          <Text style={styles.missionItem}>✅ Tomar pedidos con precisión.</Text>
          <Text style={styles.missionItem}>✅ Asegurar que cada cliente disfrute la experiencia TRIÜ.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1A1A60",
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#1A1A60",
    paddingTop: 60,
    zIndex: 10,
    paddingHorizontal: 15,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFC107",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 5,
  },
  content: {
    alignItems: "center",
    paddingVertical: 20,
  },
  imageContainer: {
    position: "relative",
    width: "90%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlayText: {
    position: "absolute",
    top: "40%",
    left: "10%",
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    color: "#666",
    marginBottom: 20,
  },
  missionContainer: {
    width: "90%",
    backgroundColor: "#E8E8E8",
    padding: 15,
    borderRadius: 10,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  missionItem: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});

export default Home;
