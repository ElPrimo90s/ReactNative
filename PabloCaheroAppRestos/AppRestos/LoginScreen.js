import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const API_URL = 'http://ip/apprestos-api/login.php'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => { 
    if (!email || !password) {
      Alert.alert('Error', 'Introduce correo y contraseña.');
      return;
    }
    setLoading(true);

   
    try {
      /* // - Api de Login / Comentada por que se va a subir a github
// 

try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            correo: email, 
            contrasena: password
        })
    });
    const json = await response.json();

    if (json.success) {
        // Guardar datos críticos
        await AsyncStorage.setItem('userRole', json.role); 
        await AsyncStorage.setItem('userId', json.id_usuario.toString()); // Necesario para publicar
        await AsyncStorage.setItem('userName', json.nombre_usuario);
        
        navigation.replace('MainApp');
    } else {
        Alert.alert("Error", json.message);
    }
} catch (error) {
    console.error(error);
}
*/
      const data = { success: true, token: 'sim_tok_123', role: 'Comerciante' }; // SIMULACIÓN
      const response = { ok: true };

   
      if (response.ok && data.success) {
        const userRole = data.role || 'Consumidor'; 
        
   
        await AsyncStorage.setItem('userRole', userRole);
        await AsyncStorage.setItem('userToken', data.token);

        
        navigation.replace('MainApp'); 

      } else {
        
        Alert.alert('Error', 'Credenciales incorrectas.');
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Alert.alert('Error de red', 'No se pudo conectar al servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#333" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>Bienvenido de vuelta</Text>

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
            placeholder="Tu contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Feather name="lock" size={20} color="#999" style={styles.inputIcon} />
        </View>

        <TouchableOpacity onPress={() => console.log('Olvidaste tu contraseña?')}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>{loading ? 'Cargando...' : 'Entrar'}</Text>
        </TouchableOpacity>

        <Text style={styles.footerLinkText}>
          ¿No tienes cuenta?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
            Regístrate aquí
          </Text>
        </Text>

        <View style={styles.demoCredentials}>
          <Text style={styles.demoText}>Usa estas credenciales de ejemplo:</Text>
          <Text style={styles.demoLink}>demo@foodlink.com / demo123</Text>
        </View>
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
  forgotPasswordText: {
    color: '#34A853',
    textAlign: 'right',
    marginBottom: 30,
    fontSize: 15,
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
    marginBottom: 30,
  },
  link: {
    color: '#34A853',
    fontWeight: 'bold',
  },
  demoCredentials: {
    alignItems: 'center',
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  demoLink: {
    fontSize: 14,
    color: '#34A853',
    fontWeight: 'bold',
  },
});