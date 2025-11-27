import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

// --- Datos Simulados ---
const initialLocations = [
  { id: 1, name: "Hospital Comunitario Central", type: "Hospital", tagColor: '#a188ff', distance: '0.8 km', address: 'Av. Principal 123, Centro', phone: '+34 912 345 678', hours: 'Lun-Vie: 8:00-20:00' },
  { id: 2, name: "Farmacia Solidaria San José", type: "Farmacia", tagColor: '#e0b5ff', distance: '1.2 km', address: 'Calle Esperanza 45, Norte', phone: '+34 913 456 789', hours: 'Lun-Dom: 9:00-21:00' },
  { id: 3, name: "Centro de Salud Esperanza", type: "Centro de Salud", tagColor: '#b19cd9', distance: '2.5 km', address: 'Barrio Las Flores, Sur', phone: '+34 914 567 890', hours: 'Lun-Sab: 7:00-19:00' },
  { id: 4, name: "Farmacia del Pueblo", type: "Farmacia", tagColor: '#e0b5ff', distance: '3.1 km', address: 'Plaza Mayor 8, Este', phone: '+34 915 678 901', hours: 'Lun-Vie: 8:30-20:30' },
];

const LocationItem = ({ location }) => (
  <View style={styles.locationCard}>
    <View style={styles.cardHeader}>
      <Text style={styles.locationName}>{location.name}</Text>
      <Text style={styles.distanceText}>{location.distance}</Text>
    </View>

    <Text style={[styles.locationTag, { backgroundColor: location.tagColor }]}>{location.type}</Text>

    <View style={styles.locationDetail}>
      <FontAwesome5 name="map-marker-alt" size={14} color="#666" style={styles.detailIcon} />
      <Text style={styles.detailText}>{location.address}</Text>
    </View>
    <View style={styles.locationDetail}>
      <FontAwesome5 name="phone" size={14} color="#666" style={styles.detailIcon} />
      <Text style={styles.detailText}>{location.phone}</Text>
    </View>
    <View style={styles.locationDetail}>
      <FontAwesome5 name="clock" size={14} color="#666" style={styles.detailIcon} />
      <Text style={styles.detailText}>{location.hours}</Text>
    </View>
  </View>
);

// --- Componente Principal ---

const BuscarScreen = () => {
  const [activeTab, setActiveTab] = useState('Lista');
  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState(initialLocations); // En un proyecto real, esto vendría de una API

  const renderContent = () => {
    if (activeTab === 'Mapa') {
      return (
        <View style={styles.mapContainer}>
          <Ionicons name="location-outline" size={60} color="#ccc" />
          <Text style={styles.mapText}>Vista de mapa</Text>
          <Text style={styles.mapHintText}>Integración con mapas próximamente</Text>
        </View>
      );
    }

    // Contenido de la Lista
    return (
      <>
        <View style={styles.listHeader}>
          <Text style={styles.resultsCount}>{locations.length} lugares cerca de ti</Text>
          <TouchableOpacity onPress={() => console.log('Ordenar por distancia')}>
            <Text style={styles.sortText}>Ordenar por distancia</Text>
          </TouchableOpacity>
        </View>

        {locations.map(loc => (
          <LocationItem key={loc.id} location={loc} />
        ))}
        {/* Espacio extra al final del scroll */}
        <View style={{ height: 30 }} /> 
      </>
    );
  };

  const renderLegend = () => {
    if (activeTab === 'Mapa') {
      return (
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Leyenda</Text>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#a188ff' }]} />
            <Text style={styles.legendText}>Hospitales</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#e0b5ff' }]} />
            <Text style={styles.legendText}>Farmacias</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* 1. Header con Degradado */}
      <LinearGradient
        colors={['#a188ff', '#d1c4e9']} // Morado vibrante a Morado claro
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <MaterialCommunityIcons name="map-marker-radius" size={28} color="white" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.headerTitle}>Ubicaciones</Text>
            <Text style={styles.headerSubtitle}>Encuentra medicinas cerca de ti</Text>
          </View>
        </View>
      </LinearGradient>

      {/* 2. Barra de Búsqueda */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBox}>
          <AntDesign name="search1" size={18} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar medicamento..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Abrir Filtros')}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#555" />
        </TouchableOpacity>
      </View>

      {/* 3. Tarjeta de Ubicación Actual */}
      <View style={styles.locationCardContainer}>
        <View style={styles.locationInfo}>
          <MaterialCommunityIcons name="send" size={24} color="#4a90e2" style={styles.locationIcon} />
          <View>
            <Text style={styles.locationLabel}>Tu ubicación</Text>
            <Text style={styles.locationValue}>Centro, Madrid</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => console.log('Cambiar ubicación')}>
          <Text style={styles.changeLocationText}>Cambiar</Text>
        </TouchableOpacity>
      </View>
      
      {/* 4. Selector de Lista/Mapa */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Lista' && styles.activeTab]}
          onPress={() => setActiveTab('Lista')}
        >
          <Text style={[styles.tabText, activeTab === 'Lista' && styles.activeTabText]}>Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Mapa' && styles.activeTab, styles.mapTabButton]}
          onPress={() => setActiveTab('Mapa')}
        >
          <Text style={[styles.tabText, activeTab === 'Mapa' && styles.activeTabText]}>Mapa</Text>
        </TouchableOpacity>
      </View>

      {/* 5. Contenido (Lista o Mapa) */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>

      {/* 6. Leyenda (solo en vista de mapa) */}
      {renderLegend()}
      
    </ScrollView>
  );
};

// --- StyleSheet ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },

  // 1. Header con Degradado
  headerGradient: {
    paddingTop: 50, // Espacio para la barra de estado
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },

  // 2. Barra de Búsqueda
  searchBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -20, // Superposición con el header
    zIndex: 10,
    marginBottom: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: 'white',
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },

  // 3. Tarjeta de Ubicación Actual
  locationCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f4ff', // Azul muy claro
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 15,
  },
  locationLabel: {
    fontSize: 14,
    color: '#666',
  },
  locationValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  changeLocationText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4a90e2',
  },

  // 4. Selector de Lista/Mapa
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  mapTabButton: {
    marginLeft: -10, // Para superponer ligeramente el borde
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#333',
  },

  // 5. Contenido (Lista o Mapa)
  contentContainer: {
    paddingHorizontal: 20,
  },
  
  // A. Vista de Mapa (Placeholder)
  mapContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    height: screenWidth * 0.9, // Altura relativa
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 10,
  },
  mapHintText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  
  // B. Vista de Lista
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 5,
  },
  resultsCount: {
    fontSize: 15,
    color: '#666',
  },
  sortText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#a188ff', // Morado principal
  },
  
  // 6. Tarjetas de Ubicación
  locationCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  distanceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 10,
  },
  locationTag: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 10,
  },
  locationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailIcon: {
    width: 20,
    textAlign: 'center',
    marginRight: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
  },
  
  // 7. Leyenda (Solo en Vista de Mapa)
  legendContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 15,
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#eee',
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#555',
  }
});

export default BuscarScreen;