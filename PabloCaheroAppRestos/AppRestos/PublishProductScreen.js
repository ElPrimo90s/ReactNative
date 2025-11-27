import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch, Alert, Platform } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; 

const MERCHANT_ACCENT_COLOR = '#FF5722'; // Naranja

const PRIMARY_COLOR = '#34A853'; 

export default function PublishProductScreen({ navigation }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDonation, setIsDonation] = useState(false);
  const [price, setPrice] = useState('0'); 
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const categories = ['Frutas', 'Verduras', 'Panadería', 'Lácteos', 'Carnes', 'Comida Preparada', 'Otros'];

  const handlePublish = () => {
    if (!productName || !category || !quantity || !description || !location) {
      Alert.alert('Error', 'Por favor, rellena todos los campos obligatorios.');
      return;
    }
    
    console.log('Publicando producto:', {
      productName,
      category,
      quantity,
      expiryDate: expiryDate.toISOString().split('T')[0],
      isDonation,
      price: isDonation ? '0' : price,
      imageUrl,
      description,
      location,
    });
    Alert.alert('Éxito', 'Producto publicado correctamente.');
    navigation.goBack(); 
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || expiryDate;
    setShowDatePicker(Platform.OS === 'ios');
    setExpiryDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES');
  };

  return (
    <View style={styles.fullContainer}>
      <View style={[styles.header, { backgroundColor: MERCHANT_ACCENT_COLOR }]}>
        <Ionicons name="arrow-back" size={24} color="#FFF" onPress={() => navigation.goBack()} />
        <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Publicar producto</Text>
            <Text style={styles.headerSubtitle}>Comparte alimentos y evita el desperdicio</Text>
        </View>
        <View style={{ width: 24 }} /> {/* Espaciador */}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nombre del producto *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Pan artesanal"
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.label}>Categoría *</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryButton, category === cat && styles.categoryButtonActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.categoryButtonText, category === cat && styles.categoryButtonTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Cantidad *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 5kg, 10 unidades"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Fecha de caducidad *</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
            <MaterialCommunityIcons name="calendar" size={24} color="#999" />
            <Text style={styles.datePickerText}>{formatDate(expiryDate)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={expiryDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <View style={styles.donationToggle}>
          <Feather name="gift" size={24} color={PRIMARY_COLOR} />
          <Text style={styles.donationText}>Marcar como donación (gratis)</Text>
          <Switch
            trackColor={{ false: "#767577", true: PRIMARY_COLOR }}
            thumbColor={isDonation ? "#FFF" : "#f4f3f4"}
            onValueChange={setIsDonation}
            value={isDonation}
          />
        </View>

        <Text style={styles.label}>Precio {isDonation ? '' : '*'}</Text>
        <View style={styles.priceInputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.priceInput}
            placeholder="0"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            editable={!isDonation} 
            placeholderTextColor={isDonation ? '#CCC' : '#999'}
          />
        </View>

        <Text style={styles.label}>URL de la foto (opcional)</Text>
        <View style={styles.inputWithIcon}>
            <Feather name="upload" size={20} color="#999" />
            <TextInput
                style={styles.input}
                placeholder="https://ejemplo.com/foto.jpg"
                value={imageUrl}
                onChangeText={setImageUrl}
            />
        </View>

        <Text style={styles.label}>Descripción *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe el estado y características del producto..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Ubicación *</Text>
        <View style={styles.inputWithIcon}>
            <Feather name="map-pin" size={20} color="#999" />
            <TextInput
                style={styles.input}
                placeholder="Ej: Mercado Central, Zona Norte"
                value={location}
                onChangeText={setLocation}
            />
        </View>


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.publishButtonText}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: { flex: 1, backgroundColor: '#F0F8EC' },
  header: {
    backgroundColor: MERCHANT_ACCENT_COLOR,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: { fontSize: 22, color: '#FFF', fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, color: '#FFF' },
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    height: 50,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryButtonActive: {
    backgroundColor: MERCHANT_ACCENT_COLOR,
  },
  categoryButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 5,
  },
  datePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  donationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4EA', // Verde claro
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
  },
  donationText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    height: 50,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#333',
    marginRight: 5,
    fontWeight: 'bold',
  },
  priceInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  publishButton: {
    flex: 1,
    backgroundColor: MERCHANT_ACCENT_COLOR,
    paddingVertical: 15,
    borderRadius: 25,
    marginLeft: 10,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});