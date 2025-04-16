import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../auth/AuthContext';
import { ActivityIndicator, View } from 'react-native';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Menu from '../screens/Menu';
import Pedidos from '../screens/Pedidos';
import PedidosHechos from '../screens/PedidosHechos';
import FuertesScreen from '../screens/FuertesScreen';
import QuesosScreen from '../screens/QuesosScreen';
import VinosScreen from '../screens/VinosScreen';
import SandwichesScreen from '../screens/SandwichesScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Menu: undefined;
  Pedidos: undefined;
  PedidosHechos: undefined;
  Fuertes: undefined;
  Sandwiches: undefined;
  Vinos: undefined;
  Quesos: undefined;
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
          <Stack.Screen name="Fuertes" component={FuertesScreen} />
          <Stack.Screen name="Quesos" component={QuesosScreen} />
          <Stack.Screen name="Vinos" component={VinosScreen} />
          <Stack.Screen name="Sandwiches" component={SandwichesScreen} />
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
