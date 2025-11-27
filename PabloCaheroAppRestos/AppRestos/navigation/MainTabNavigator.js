import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'; 

import HomeScreen from '../HomeScreen';
import MyProductsScreen from '../MyProductsScreen'; 
import NotificationsScreen from '../NotificationsScreen';
import ProfileScreen from '../ProfileScreen';

const Tab = createBottomTabNavigator();
const PRIMARY_COLOR = '#34A853'; // Verde
const MERCHANT_ACCENT_COLOR = '#FF5722'; // Naranja


export default function MainTabNavigator({ navigation, route }) {
 
    const { userRole, resetToWelcome } = route.params || {}; 
    const isMerchant = userRole === 'Comerciante' || userRole === 'Organizacion';

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
             
                tabBarActiveTintColor: isMerchant ? MERCHANT_ACCENT_COLOR : PRIMARY_COLOR,
                tabBarInactiveTintColor: '#999',
                tabBarStyle: styles.tabBarStyle,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                }}
            />
            
            {/* 3. PESTAÑA UNIFICADA: MIS PRODUCTOS (El FAB está dentro de MyProductsScreen.js) */}
            <Tab.Screen
                name="MyProductsTab"
                component={MyProductsScreen}
                options={{
                    
                    title: isMerchant ? 'Mis productos' : 'Mis pedidos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons 
                            name="store-outline" // Ícono fijo de tienda
                            color={color} 
                            size={size} 
                        />
                    ),
                }}
                
                initialParams={{ userRole: userRole }}
            />
            
            <Tab.Screen
                name="NotificationsTab"
                component={NotificationsScreen}
                options={{
                    title: 'Notificaciones',
                    tabBarBadge: 2, 
                    tabBarIcon: ({ color, size }) => <Ionicons name="notifications-outline" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color, size }) => <AntDesign name="user" color={color} size={size} />,
                }}
                
                initialParams={{ resetToWelcome: resetToWelcome }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 60,
        paddingBottom: 5,
        paddingTop: 5,
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
});