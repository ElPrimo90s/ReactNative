import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Consumidor'); // Default user type

  const handleRegister = () => {
    /* 
       Conexion de API
        */
    /*
    try {
        const response = await fetch(API_URL_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre_usuario: fullName, // Coincide con la BD
                correo: email,
                contrasena: password,
                tipo_usuario: userType, // 'Consumidor', 'Comerciante', 'Organizacion'
                // telefono: '', // 
                // direccion: '' // 
            }),
        });

        const result = await response.json();

        if (result.success) {
            // Registro exitoso
            Alert.alert(
                "¡Registro Exitoso!",
                "Tu cuenta ha sido creada. Por favor inicia sesión.",
                [
                    { text: "OK", onPress: () => navigation.navigate('Login') }
                ]
            );
        } else {
            // Error del servidor (ej. correo duplicado)
            Alert.alert("Error al registrar", result.message || "Inténtalo de nuevo.");
        }

    } catch (error) {
        console.error("Error de conexión:", error);
        Alert.alert("Error", "No se pudo conectar al servidor.");
    } finally {
        setLoading(false);
    }
    */
    navigation.navigate('MainApp'); 
    
    
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#333" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Únete a FoodLink</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
          <Feather name="user" size={20} color="#999" style={styles.inputIcon} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="tu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <MaterialCommunityIcons name="email-outline" size={20} color="#999" style={styles.inputIcon} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Feather name="lock" size={20} color="#999" style={styles.inputIcon} />
        </View>

        <Text style={styles.label}>Tipo de usuario</Text>
        <View style={styles.userTypeSelection}>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'Consumidor' && styles.userTypeButtonActive]}
            onPress={() => setUserType('Consumidor')}
          >
            <Feather name="shopping-cart" size={20} color={userType === 'Consumidor' ? '#34A853' : '#666'} />
            <Text style={[styles.userTypeButtonText, userType === 'Consumidor' && styles.userTypeButtonTextActive]}>
              Consumidor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'Comerciante' && styles.userTypeButtonActive]}
            onPress={() => setUserType('Comerciante')}
          >
            <MaterialCommunityIcons name="store" size={20} color={userType === 'Comerciante' ? '#34A853' : '#666'} />
            <Text style={[styles.userTypeButtonText, userType === 'Comerciante' && styles.userTypeButtonTextActive]}>
              Comerciante
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'Organización' && styles.userTypeButtonActive]}
            onPress={() => setUserType('Organización')}
          >
            <Feather name="users" size={20} color={userType === 'Organización' ? '#34A853' : '#666'} />
            <Text style={[styles.userTypeButtonText, userType === 'Organización' && styles.userTypeButtonTextActive]}>
              Organización
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.primaryButtonText}>Crear cuenta</Text>
        </TouchableOpacity>

        <Text style={styles.footerLinkText}>
          ¿Ya tienes cuenta?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Inicia sesión
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F0F8EC',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F8EC',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30, 
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34A853',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputIcon: {
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  userTypeSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '100%',
    maxWidth: 400,
  },
  userTypeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  userTypeButtonActive: {
    borderColor: '#34A853',
    borderWidth: 2,
    backgroundColor: '#E6F4EA', 
  },
  userTypeButtonText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  userTypeButtonTextActive: {
    color: '#34A853',
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#34A853',
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerLinkText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  link: {
    color: '#34A853',
    fontWeight: 'bold',
  },
});