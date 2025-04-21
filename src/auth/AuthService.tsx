// src/auth/AuthService.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.20.25:9001/api/login'; 

export interface User {
  id: string;
  email: string;
  roles: string[]; // ['admin', 'mesero', 'root']
}

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    if (!response.data.token || !response.data.user) {
      throw new Error('Datos de autenticación incompletos');
    }

    // Almacenar token y usuario
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data.user;
  } catch (error) {
    console.error('Error en AuthService.login:', error);
    throw error; // Propagar el error para manejo específico en UI
  }
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.multiRemove(['token', 'user']);
};

export const getCurrentUser = async (): Promise<User | null> => {
  const userJson = await AsyncStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};

export const verifyToken = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await axios.get(`${API_URL}/verify-token`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.isValid;
  } catch (error) {
    await logout();
    return false;
  }
};