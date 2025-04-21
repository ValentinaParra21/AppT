import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../auth/AuthContext"; 
import { ImageBackground } from 'react-native';

type RootStackParamList = {
  Fuertes: undefined;
  Quesos: undefined;
  Vinos: undefined;
  Sandwiches: undefined;
  Pedidos: undefined;
  Menu: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

type Categoria = {
  _id: string;
  nombre: string;
  descripcion: string;
  imagenUrl?: string;
};

export default function MenuScreen() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("No se encontró el token.");
          return;
        }

        const response = await axios.get("http://192.168.20.25:9001/api/categorias", {
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

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleLogout = async () => {
    await logout();
    toggleMenu();
  };

  const renderIcon = (nombre: string) => {
    switch (nombre.toLowerCase()) {
      case "platos fuertes":
      case "fuertes":
        return <Ionicons name="restaurant" size={24} color="#fff" />;
      case "quesos":
        return <Ionicons name="cube" size={24} color="#fff" />;
      case "vinos":
        return <Ionicons name="wine" size={24} color="#fff" />;
      case "sandwiches":
        return <Ionicons name="fast-food" size={24} color="#fff" />;
      default:
        return <Ionicons name="help-circle" size={24} color="#fff" />;
    }
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

      <Text style={styles.title}>REVISA TU MENÚ</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePressCategoria(item)}>
            <ImageBackground
              source={require('../../assets/azulito.webp')}
              style={styles.cardBackground}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.cardContent}>
                {renderIcon(item.nombre)}
                <Text style={styles.cardTitle}>{item.nombre}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {item.descripcion}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FA",
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
    resizeMode: "contain",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
  menu: {
    position: "absolute",
    top: 35,
    bottom: 0,
    width: 270,
    backgroundColor: "#0A1D56",
    padding: 20,
    zIndex: 2,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  menuText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A1D56",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  cardBackground: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: "#fff",
  },
});
