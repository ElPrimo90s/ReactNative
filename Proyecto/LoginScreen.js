import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';

// --- Componente de Campo de Contraseña Reutilizable ---
const PasswordInput = ({ value, onChangeText }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.inputGroup}>
      <MaterialCommunityIcons name="lock-outline" size={24} color="#666" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder="Tu contraseña"
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.visibilityToggle}>
        <Ionicons name={secureTextEntry ? "eye-outline" : "eye-off-outline"} size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

// --- Componente Principal: LoginScreen ---
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Iniciando sesión con:', email);
    // Aquí iría la lógica de autenticación
     navigation.navigate('Tabs');
  };

  return (
    <View style={styles.fullScreenContainer}>
      {/* Fondo Morado */}
      <View style={styles.backgroundContainer}>
        <View style={styles.heartCircle}>
          <Ionicons name="heart" size={40} color="white" />
        </View>
        <Text style={styles.logoTitle}>Salud Solidaria</Text>
        <Text style={styles.logoSubtitle}>Ayudando a quienes más lo necesitan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Iniciar Sesión</Text>
          
          {/* Correo Electrónico */}
          <View>
            <Text style={styles.inputLabel}>Correo electrónico</Text>
            <View style={styles.inputGroup}>
              <MaterialCommunityIcons name="email-outline" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="tu@email.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
          
          {/* Contraseña */}
          <View>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <PasswordInput
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          
          {/* Botón "Crear Cuenta Nueva" */}
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.secondaryButtonText}>Crear Cuenta Nueva</Text>
          </TouchableOpacity>
          
          {/* Botón "Continuar sin cuenta" */}
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <Text style={styles.linkText}>Continuar sin cuenta</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            Al continuar, aceptas nuestros <Text style={styles.boldText}>Términos y Condiciones</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

// --- StyleSheet (Compartido) ---
const primaryColor = '#4a148c'; // Morado oscuro
const secondaryColor = '#673ab7'; // Morado medio

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundContainer: {
    backgroundColor: primaryColor,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 350, 
  },
  heartCircle: {
    backgroundColor: secondaryColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logoSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  
  // Contenido de la Tarjeta
  scrollContent: {
    paddingTop: 230,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 40,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    marginTop: 15,
  },

  // Inputs
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white', 
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  visibilityToggle: {
    paddingHorizontal: 5,
  },

  // Botones
  primaryButton: {
    backgroundColor: secondaryColor,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25, 
    marginBottom: 15,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: secondaryColor,
    marginBottom: 15,
  },
  secondaryButtonText: {
    color: secondaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Enlaces y Texto
  linkText: {
    fontSize: 15,
    fontWeight: '600',
    color: primaryColor,
    textAlign: 'center',
    marginBottom: 15,
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: 'bold',
  }
});