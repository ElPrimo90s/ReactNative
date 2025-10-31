import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './DashboardScreen'; // Tu pantalla principal (dashboard)
import DonarScreen from './DonarScreen'; 
import ConsultaScreen from './ConsultaScreen';
import BuscarScreen from './BuscarScreen';

// Crea el Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{ 
            headerStyle: { backgroundColor: '#28a745' }, // Color de la barra superior
            headerTintColor: '#fff', // Color del texto de la barra
        }}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Salud Solidaria', headerShown: false }} // Título y ocultar la barra
        />
        <Stack.Screen name="Donar" component={DonarScreen} />
        <Stack.Screen name="Consulta" component={ConsultaScreen} />
        <Stack.Screen name="Buscar" component={BuscarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}