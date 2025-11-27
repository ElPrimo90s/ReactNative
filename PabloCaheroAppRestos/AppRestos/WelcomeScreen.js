import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function WelcomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./assets/leaf_logo.png')} 
            style={styles.logo}
          />
          <Text style={styles.appName}>FoodLink</Text>
          <Text style={styles.tagline}>Evita el desperdicio, comparte alimentos</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardItem}>
            <MaterialCommunityIcons name="leaf" size={24} color="#34A853" style={styles.cardIcon} />
            <Text style={styles.cardText}>
              Conecta comercios con consumidores para reducir el desperdicio de alimentos
            </Text>
          </View>
          <View style={styles.cardItem}>
            <AntDesign name="arrowright" size={24} color="#F7A122" style={styles.cardIcon} />
            <Text style={styles.cardText}>
              Encuentra productos próximos a caducar a precios bajos o en donación
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')} 
        >
          <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Register')} 
        >
          <Text style={styles.secondaryButtonText}>Registrarse</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Únete a la comunidad que combate el desperdicio alimentario</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#F0F8EC', // Fondo verde claro
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F8EC',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34A853', // Verde principal
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  cardIcon: {
    marginRight: 15,
    marginTop: 3,
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#34A853',
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#34A853',
    borderWidth: 2,
    paddingVertical: 13,
    borderRadius: 25,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginBottom: 40,
  },
  secondaryButtonText: {
    color: '#34A853',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});