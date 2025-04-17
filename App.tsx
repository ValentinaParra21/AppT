import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator'; // Asumiendo que moviste el Stack allá
import { AuthProvider } from './src/auth/AuthContext';
import Toast from 'react-native-toast-message';


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
}
