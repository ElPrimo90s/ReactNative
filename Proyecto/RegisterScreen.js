import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';

// --- Componente de Campo de Contraseña Reutilizable ---
const PasswordInput = ({ placeholder, value, onChangeText, isConfirm }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View>
      <Text style={styles.inputLabel}>{isConfirm ? 'Confirmar contraseña' : 'Contraseña'}</Text>
      <View style={styles.inputGroup}>
        <MaterialCommunityIcons name="lock-outline" size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
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
    </View>
  );
};

// --- Componente Principal: RegisterScreen ---
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    console.log('Registrando usuario:', name, email);
    // Lógica para registro y navegación a Dashboard
    // navigation.navigate('Tabs');
  };

  return (
    <View style={styles.fullScreenContainer}>
      {/* Fondo Morado */}
      <View style={styles.backgroundContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.heartCircle}>
          <Ionicons name="heart" size={40} color="white" />
        </View>
        <Text style={styles.logoTitle}>Crear Cuenta</Text>
        <Text style={styles.logoSubtitle}>Únete a nuestra comunidad solidaria</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          
          {/* Nombre Completo */}
          <View>
            <Text style={styles.inputLabel}>Nombre completo</Text>
            <View style={styles.inputGroup}>
              <MaterialCommunityIcons name="account-outline" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

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
          <PasswordInput
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
          />

          {/* Confirmar Contraseña */}
          <PasswordInput
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isConfirm={true}
          />
          
          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
            <Text style={styles.primaryButtonText}>Crear Cuenta</Text>
          </TouchableOpacity>

          {/* Enlace "Iniciar Sesión" */}
          <View style={styles.switchModeContainer}>
            <Text style={styles.switchModeText}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.switchModeLink}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.termsText}>
            Al crear una cuenta, aceptas nuestros <Text style={styles.boldText}>Términos y Condiciones</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

// --- StyleSheet (Compartido) ---
const primaryColor = '#4a148c'; 
const secondaryColor = '#673ab7'; 

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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
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
    marginTop: 30, 
    marginBottom: 15,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Enlaces y Texto
  switchModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  switchModeText: {
    fontSize: 15,
    color: '#666',
  },
  switchModeLink: {
    fontSize: 15,
    fontWeight: 'bold',
    color: primaryColor,
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