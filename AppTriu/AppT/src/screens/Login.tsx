import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../auth/AuthContext';
import toast from 'react-native-toast-message';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { login, isAuthenticated, error, clearError } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    if (error) {
      toast.show({
        type: 'error',
        text1: 'Error de inicio de sesión',
        text2: error,
      });
      clearError();
    }
  }, [error, clearError]);

  const handleLogin = async () => {
    if (!correo || !password) {
      toast.show({
        type: 'error',
        text1: 'Campos vacíos',
        text2: 'Por favor llena todos los campos',
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(correo, password);

      if (success) {
        toast.show({
          type: 'success',
          text1: 'Inicio de sesión exitoso',
        });
      } else {
        toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se pudo iniciar sesión',
        });
      }
    } catch (err) {
      console.error('Error en login:', err);
      toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: 'Inténtalo más tarde',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>

        <Image
          source={require('../../assets/Fondoinicio.png')}
          style={styles.headerImage}
        />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>TRIÜ</Text>
          </View>
        </View>


        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scroll: {
    flexGrow: 1,
  },
  headerImage: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -55,
    zIndex: 10,
  },
  logoCircle: {
    backgroundColor: '#FFCC00',
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    marginTop: -50,
   
  },
  input: {
    marginTop: 50,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: -20,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#FFCC00',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;