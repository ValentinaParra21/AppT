import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types";
import { useAuth } from "../auth/AuthContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { logout } = useAuth();

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

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
          <Text style={styles.menuText}>Menú</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.menuText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

 
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.card}>
          <Image source={require("../../assets/TT.jpg")} style={styles.cardImage} />
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.subtitle}>Queso Raclette TRIÜ</Text>
          <Text style={styles.description}>
            Hoy es un buen día para brindar un excelente servicio. Gestiona pedidos y consulta el menú fácilmente.
          </Text>

          <View style={styles.cardsContainer}>
            <View style={styles.cardItem}>
              <Ionicons name="card" size={40} color="#1A1A60" />
              <Text style={styles.cardTitle}>Nuevo Pedido</Text>
              <Text style={styles.cardDescription}>
                Realiza y gestiona pedidos de manera eficiente.
              </Text>
              <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate("Pedidos")}>
                <Text style={styles.cardButtonText}>Pedidos</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardItem}>
              <Ionicons name="restaurant" size={40} color="#1A1A60" />
              <Text style={styles.cardTitle}>Menú del Día</Text>
              <Text style={styles.cardDescription}>
                Consulta el menu de Triu y realiza de mejor manera tus pedidos.
              </Text>
              <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate("Menu")}>
                <Text style={styles.cardButtonText}>Menú</Text>
              </TouchableOpacity>
            </View>
          </View>

  
          <View style={styles.missionBox}>
            <Text style={styles.missionTitle}>Objetivos de hoy</Text>
            {[
              "Atiende con amabilidad.",
              "Toma pedidos correctamente.",
              "Ofrece una experiencia TRIÜ.",
            ].map((text, idx) => (
              <View style={styles.missionItem} key={idx}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#4CAF50" />
                <Text style={styles.missionText}>{text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFF1",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#1A1A60", 
    elevation: 4,
    marginTop: 30,  
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 5,
  },
  menu: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 270,
    backgroundColor: "#1A1A60",  
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 10,
    elevation: 8,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 15,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 30,
    color: "#fff", 
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#fff",
  },
  body: {
    paddingVertical: 30,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 20,
    alignItems: "center",
    elevation: 4,
    marginTop: 10
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A60",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cardItem: {
    width: "55%",
    padding: 15,
    alignItems: "center",

  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A60",
    marginTop: 10,
  },
  cardDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginTop: 5,
    marginBottom: 15,
  },
  cardButton: {
    backgroundColor: "#1A1A60",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  cardButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  missionBox: {
    width: "100%",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  missionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  missionText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#444",
  },
});

export default Home;
  