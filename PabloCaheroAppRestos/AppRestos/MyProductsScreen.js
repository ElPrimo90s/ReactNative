import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';


const PRIMARY_COLOR = '#34A853'; 
const MERCHANT_ACCENT_COLOR = '#FF5722'; 

const MY_PRODUCTS_DATA = [
  
];

const MyProductCard = ({ item }) => {
  const placeholderImages = {
    bread: 'https://images.unsplash.com/photo-1542826433-cfbf28ff5159',
    cookies: 'https://images.unsplash.com/photo-1542826433-cfbf28ff5159',
  };
  
  return (
    <TouchableOpacity style={styles.productCard}>
      <Image source={{ uri: placeholderImages[item.img] || 'https://via.placeholder.com/100' }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={[styles.productStatus, item.status === 'Activo' && { color: PRIMARY_COLOR }]}>{item.status}</Text>
      </View>
      <Feather name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );
};


export default function MyProductsScreen({ navigation }) {
  
  const [myProducts] = useState(MY_PRODUCTS_DATA); 

  
  const headerTitle = 'Mis Productos / Pedidos'; 
  const emptyText = 'Aún no tienes productos publicados. ¡Presiona "+" para comenzar!';
  const colorScheme = MERCHANT_ACCENT_COLOR; 

  const renderContent = () => {
    if (myProducts.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="cube-outline" size={80} color="#CCC" />
          <Text style={styles.emptyStateText}>{emptyText}</Text>
          <Text style={styles.emptyStateHelp}>Publicar productos es la forma más rápida de ayudar.</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={myProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MyProductCard item={item} />}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <View style={styles.fullContainer}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colorScheme }]}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>

      {renderContent()}
      
      {/*  BOTÓN FLOTANTE (FAB)  */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('PublishProduct')} 
      >
        <AntDesign name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: { flex: 1, backgroundColor: '#F0F8EC' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 15,
  },
  emptyStateHelp: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  listContent: {
    padding: 15,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  
  floatingButton: {
    position: 'absolute',
    bottom: 25, 
    right: 25,
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: MERCHANT_ACCENT_COLOR, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    zIndex: 10,
  },
});