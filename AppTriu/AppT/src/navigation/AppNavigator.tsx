import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../auth/AuthContext';
import { ActivityIndicator, View } from 'react-native';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Menu from '../screens/Menu';
import Pedidos from '../screens/Pedidos';
import PedidosHechos from '../screens/PedidosHechos';
import BebidasScreen from '../screens/BebidasScreen';
import SandwichesScreen from '../screens/SandwichesScreen';
import ParaCompartirScreen from '../screens/ParaCompartirScreen';
import SopaScreen from '../screens/SopasScreen';
import EnsaladaScreen from '../screens/EnsaladaScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Menu: undefined;
  Pedidos: undefined;
  PedidosHechos: undefined;
  Sandwiches: undefined;
  Bebidas: undefined;
  ParaCompartir: undefined;
  Sopas: undefined;
  Ensaladas: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('[NAVIGATOR] isLoading:', isLoading);
  console.log('[NAVIGATOR] isAuthenticated:', isAuthenticated);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFC107" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Pedidos" component={Pedidos} />
          <Stack.Screen name="PedidosHechos" component={PedidosHechos} />
          <Stack.Screen name="Bebidas" component={BebidasScreen} />
          <Stack.Screen name="Sandwiches" component={SandwichesScreen} />
          <Stack.Screen name="ParaCompartir" component={ParaCompartirScreen} />
          <Stack.Screen name="Sopas" component={SopaScreen} />
          <Stack.Screen name="Ensaladas" component={EnsaladaScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
