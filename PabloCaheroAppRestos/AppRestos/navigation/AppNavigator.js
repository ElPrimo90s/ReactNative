import React, { useState, useEffect } from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import WelcomeScreen from '../WelcomeScreen'; 
import RegisterScreen from '../RegisterScreen';
import LoginScreen from '../LoginScreen';
import MainTabNavigator from './MainTabNavigator'; 
import PublishProductScreen from '../PublishProductScreen';

const Stack = createStackNavigator();


const resetToWelcome = (navigation) => {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
        })
    );
};

function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); 

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('userRole');
        if (storedRole) {
          setUserRole(storedRole);
        }
      } catch (error) {
        console.error('Error al leer el rol de usuario de AsyncStorage', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserRole();
  }, []);

  if (isLoading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Cargando...</Text></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {userRole ? ( 
          
          <Stack.Group> 
            <Stack.Screen 
              name="MainApp" 
              component={MainTabNavigator} 
              initialParams={{ userRole: userRole, resetToWelcome: resetToWelcome }}
            />
            {/* Ruta de publicación para usuarios autenticados */}
            <Stack.Screen name="PublishProduct" component={PublishProductScreen} options={{ headerShown: false }} />
          </Stack.Group>

        ) : ( 
        
          <Stack.Group>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} /> 
            <Stack.Screen name="Login" component={LoginScreen} />

            {/* Ruta MainApp para permitir la transición de login */}
            <Stack.Screen 
                 name="MainApp" 
                 component={MainTabNavigator} 
                 initialParams={{ userRole: userRole, resetToWelcome: resetToWelcome }}
             /> 

             {/* 
                 Esto evita el error si el estado 'userRole' tarda en actualizarse. */}
             <Stack.Screen name="PublishProduct" component={PublishProductScreen} options={{ headerShown: false }} />
          </Stack.Group>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;