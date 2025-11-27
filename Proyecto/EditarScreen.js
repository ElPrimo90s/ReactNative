import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';


const EditarScreen = ({ navigation }) => {
  
  const [nombre, setNombre] = useState('christophervengador');
  const [edad, setEdad] = useState('28');
  const [ciudad, setCiudad] = useState('Ciudad de México');
  const [tipoSangre, setTipoSangre] = useState('O+');
  const [email, setEmail] = useState('christophervengador@gmail.com');
  const [telefono, setTelefono] = useState('+52 123 456 7890');
  
  
  const profilePicUrl = 'https://via.placeholder.com/100/D32F2F/FFFFFF?text=CV'; 

  const handleGuardarCambios = () => {
    
    console.log('Guardando cambios:', { nombre, edad, ciudad, tipoSangre, email, telefono });
   
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
            <Text style={styles.screenTitle}>Editar Perfil</Text>
            <Text style={styles.screenSubtitle}>Actualiza tu información personal</Text>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        
        {/* Sección de Foto de Perfil */}
        <View style={styles.profileSection}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: profilePicUrl }} style={styles.profileImage} />
            <TouchableOpacity style={styles.cameraIcon}>
              <MaterialCommunityIcons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.imageHint}>Toca para cambiar la foto</Text>
        </View>
        
        {/* 1. Información Personal */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          <Text style={styles.inputLabel}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.inputLabel}>Edad</Text>
          <TextInput
            style={styles.input}
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
          />

          <Text style={styles.inputLabel}>Ciudad</Text>
          <TextInput
            style={styles.input}
            value={ciudad}
            onChangeText={setCiudad}
          />
          
          <Text style={styles.inputLabel}>Tipo de sangre</Text>
          <View style={styles.pickerInput}>
            <TextInput
                style={styles.pickerText}
                value={tipoSangre}
                editable={false} 
            />
            <MaterialCommunityIcons name="chevron-down" size={24} color="#555" />
          </View>
        </View>

        {/* 2. Información de Contacto */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Información de Contacto</Text>

          <Text style={styles.inputLabel}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.inputLabel}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Botón Flotante de Guardar */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleGuardarCambios}
        >
          <FontAwesome5 name="save" size={18} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditarScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitleContainer: {
    marginLeft: 15,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a90e2', 
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  

  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4a90e2',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  imageHint: {
    marginTop: 10,
    fontSize: 14,
    color: '#999',
  },
  
  
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
    color: '#333',
  },
  
  
  pickerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  pickerText: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },

  
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 15,
    paddingBottom: 30, 
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  saveButton: {
    backgroundColor: '#4a90e2', 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});