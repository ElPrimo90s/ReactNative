import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from './DashboardScreen';
import DonarScreen from './DonarScreen';
import ConsultaScreen from './ConsultaScreen';
import BuscarScreen from './BuscarScreen';
import PerfilScreen from './PerfilScreen';
import EditarScreen from './EditarScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

// Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// --- Tab Navigator con tus pantallas ---
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let icon = "home-outline";

          if (route.name === "Dashboard") icon = focused ? "home" : "home-outline";
          if (route.name === "Donar")     icon = focused ? "heart" : "heart-outline";
          if (route.name === "Consulta")  icon = focused ? "medkit" : "medkit-outline";
          if (route.name === "Ubicaciones")    icon = focused ? "location" : "location-outline";
          if (route.name === "Perfil") icon = focused ? "person" : "person-outline";

          return <Ionicons name={icon} size={22} color={color} />;
        },
        tabBarActiveTintColor: "#0a84ff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Donar" component={DonarScreen} />
      <Tab.Screen name="Consulta" component={ConsultaScreen} />
      <Tab.Screen name="Ubicaciones" component={BuscarScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

// --- Stack Principal ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // 1. CAMBIO PRINCIPAL: Inicia la app en la pantalla de Login
        initialRouteName="LoginScreen" 
        screenOptions={{
          // Ocultamos el header por defecto para todas las pantallas de autenticación/tabs
          headerShown: false, 
          // Manteniendo tus estilos originales como respaldo si usaras headerShown: true
          headerStyle: { backgroundColor: '#28a745' },
          headerTintColor: '#fff',
        }}
      >
        
        {/* =================================================== */}
        {/* 1. PANTALLAS DE AUTENTICACIÓN (Nivel Superior) */}
        {/* =================================================== */}
        <Stack.Screen 
            name="LoginScreen" 
            component={LoginScreen}
            options={{ headerShown: false }} // Asegura que no tenga el header de la pila
        />
        <Stack.Screen 
            name="RegisterScreen" 
            component={RegisterScreen}
            options={{ headerShown: false }} // Asegura que no tenga el header de la pila
        />

        {/* =================================================== */}
        {/* 2. PANTALLA PRINCIPAL (Tabs) */}
        {/* =================================================== */}
        <Stack.Screen 
          name="Tabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        
        {/* 3. PANTALLAS MODALES/DE EDICIÓN (Nivel Superior) */}
        <Stack.Screen 
          name="EditarScreen" 
          component={EditarScreen} 
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
