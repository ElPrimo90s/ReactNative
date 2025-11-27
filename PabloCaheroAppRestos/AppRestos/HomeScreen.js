import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#34A853';


const DATA = [
  { id: '1', title: 'Verduras Mixtas Frescas', store: 'Verdulería El Huerto', tags: ['Donación', 'Urgente', 'verduras'], price: 'Gratis', distance: '0.5km', time: '-29 días', img: 'carrots' },
  { id: '2', title: 'Pan Artesanal y Bollería', store: 'Panadería La Espiga', tags: ['Oferta', 'Urgente', 'panadería'], price: '$300', distance: '1.2km', time: '-29 días', img: 'bread' },
  { id: '3', title: 'Frutas de Temporada', store: 'Frutería San José', tags: ['Oferta', 'Urgente', 'frutas'], price: '$500', distance: '0.8km', time: '-28 días', img: 'fruits' },
  { id: '4', title: 'Leche Fresca', store: 'Lácteos DAIRY', tags: ['Oferta', 'Urgente', 'lácteos'], price: '$150', distance: '0.3km', time: '-30 días', img: 'milk' },
  { id: '5', title: 'Sándwich de Huevo', store: 'Cafetería La Esquina', tags: ['Donación', 'Urgente', 'comida'], price: 'Gratis', distance: '0.9km', time: '-27 días', img: 'sandwich' },
  // { id: '6', title: 'Trigo para siembra', store: 'Campo Verde', tags: ['Urgente'], price: 'Gratis', distance: '1.5km', time: '-30 días', img: 'field' }, // Imagen de campo
];

const ProductCard = ({ item, navigation }) => {
    
    const placeholderImages = {
        carrots: 'https://images.unsplash.com/photo-1596707325203-d64b584a2066',
        bread: 'https://images.unsplash.com/photo-1542826433-cfbf28ff5159',
        fruits: 'https://images.unsplash.com/photo-1582234057398-fe6a51d020d5',
        milk: 'https://images.unsplash.com/photo-1552554608-f4041b31a3d9',
        sandwich: 'https://images.unsplash.com/photo-1524584210431-7b3b64414c9c',
        field: 'https://images.unsplash.com/photo-1529125553655-467f5641775f'
    };
    
    
    const renderTags = () => (
        <View style={styles.tagContainer}>
            {item.tags.includes('Donación') && (
                <View style={[styles.tag, styles.tagDonation]}>
                    <Feather name="box" size={14} color="#FFF" />
                    <Text style={styles.tagText}> Donación</Text>
                </View>
            )}
            {item.tags.includes('Urgente') && (
                <View style={[styles.tag, styles.tagUrgent]}>
                    <Ionicons name="alert-circle-outline" size={14} color="#FFF" />
                    <Text style={styles.tagText}> ¡Urgente!</Text>
                </View>
            )}
        </View>
    );

    return (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: placeholderImages[item.img] }} style={styles.cardImage} />
            {renderTags()}
            
            <View style={styles.cardContent}>
                <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.storeName}>{item.store}</Text>
                
                <View style={styles.infoRow}>
                    <Text style={styles.timeText}>{item.time}</Text>
                    <Text style={styles.priceText}>{item.price}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.distanceText}>{item.distance}</Text>
                    <Text style={styles.categoryTag}>{item.tags.slice(-1)[0]}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


export default function HomeScreen({ navigation }) {
    const [selectedTab, setSelectedTab] = useState('Todos');

    return (
        <View style={styles.fullContainer}>
            {/* Header: Bienvenida y Notificación */}
            <View style={styles.header}>
                <Text style={styles.greetingText}>Hola, Christopher</Text>
                <TouchableOpacity onPress={() => navigation.navigate('NotificationsTab')}>
                    <Ionicons name="notifications-outline" size={24} color="#FFF" />
                    <View style={styles.notificationBadge}><Text style={styles.badgeText}>2</Text></View>
                </TouchableOpacity>
            </View>

            {/* Barra de Búsqueda */}
            <View style={styles.searchBarContainer}>
                <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput 
                    placeholder="Buscar productos o comercios..." 
                    style={styles.searchInput} 
                />
            </View>

            {/* Pestañas de Filtro */}
            <View style={styles.filterTabs}>
                {['Todos', 'Donaciones', 'Ofertas'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabButton, selectedTab === tab && styles.tabButtonActive]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Lista de Productos (Usando FlatList para la cuadrícula) */}
            <FlatList
                data={DATA.filter(item => 
                    selectedTab === 'Todos' ? true : 
                    selectedTab === 'Donaciones' ? item.tags.includes('Donación') : 
                    item.tags.includes('Oferta')
                )}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => <ProductCard item={item} navigation={navigation} />}
                contentContainerStyle={styles.listContainer}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#F0F8EC', // Fondo suave
    },
   
    header: {
        backgroundColor: PRIMARY_COLOR,
        paddingHorizontal: 20,
        paddingTop: 50, // Ajuste para el notch
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greetingText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    notificationBadge: {
        position: 'absolute',
        right: -5,
        top: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
        height: 45,
        marginTop: -20, // Superponer al header
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    
    filterTabs: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    tabButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
    },
    tabButtonActive: {
        backgroundColor: PRIMARY_COLOR,
    },
    tabText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    
    listContainer: {
        paddingHorizontal: 10,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    tagContainer: {
        position: 'absolute',
        top: 10,
        left: 5,
        flexDirection: 'row',
        gap: 5,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    tagDonation: {
        backgroundColor: PRIMARY_COLOR,
    },
    tagUrgent: {
        backgroundColor: '#FF5733', // Rojo/Naranja para urgencia
    },
    tagText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 2,
    },
    cardContent: {
        padding: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    storeName: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    timeText: {
        fontSize: 12,
        color: 'red',
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    distanceText: {
        fontSize: 12,
        color: '#999',
    },
    categoryTag: {
        fontSize: 10,
        color: '#999',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
    }
});