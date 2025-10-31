import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// Componente para las métricas pequeñas
const MetricCard = ({ iconName, value, label, color }) => (
  <View style={styles.metricCard}>
    <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
      <MaterialCommunityIcons name={iconName} size={24} color={color} />
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

// Componente modificado para la navegación
const ActionCard = ({ iconName, title, subtitle, color, isNew = false, onPress }) => (
  // El onPress ahora recibe la función de navegación
  <TouchableOpacity style={styles.actionCard} onPress={onPress}> 
    <View style={[styles.actionIcon, { backgroundColor: color + '20' }]}>
      <MaterialIcons name={iconName} size={30} color={color} />
    </View>
    <View style={styles.actionTextContainer}>
      <View style={styles.actionTitleRow}>
        <Text style={styles.actionTitle}>{title}</Text>
        {isNew && <Text style={styles.newBadge}>NUEVO</Text>}
      </View>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={24} color="#ccc" />
  </TouchableOpacity>
);

// 🌟 AQUÍ RECIBIMOS LA PROP 'navigation' 🌟
export default function DashboardScreen({ navigation }) { 
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      
      <Text style={styles.headerTitle}>Salud Solidaria</Text>
      <Text style={styles.headerSubtitle}>Juntos construimos un mundo más saludable</Text>

      {/* Sección de Impacto Superior (Heart Card) */}
      <View style={styles.impactCard}>
        <View style={styles.impactTextContainer}>
            <Text style={styles.impactTitle}>Impacto del Mes</Text>
            <Text style={styles.impactValue}>2,847 Personas</Text>
            <Text style={styles.impactDetail}>Han recibido ayuda médica gratuita</Text>
        </View>
        <FontAwesome5 name="heart" size={80} color="white" style={styles.heartIcon} />
      </View>

      {/* Sección de Métricas */}
      <View style={styles.metricsRow}>
        <MetricCard iconName="pill" value="1.2K" label="Medicamentos Donados" color="#6a5acd" />
        <MetricCard iconName="doctor" value="89" label="Doctores Activos" color="#a020f0" />
        <MetricCard iconName="map-marker-radius" value="34" label="Puntos de Ayuda" color="#ff4500" />
      </View>
      
      {/* Acciones Rápidas */}
      <Text style={styles.actionTitleHeader}>Acciones Rápidas</Text>
      
      {/* Botón que navega a la pantalla 'Donar' */}
      <ActionCard 
        iconName="local-hospital" 
        title="Donar Medicamentos" 
        subtitle="Ayuda a quienes más lo necesitan" 
        color="#007bff"
        isNew={true}
        onPress={() => navigation.navigate('Donar')}
      />
      
      {/* Botón que navega a la pantalla 'Consulta' */}
      <ActionCard 
        iconName="medical-services" 
        title="Consulta Gratuita" 
        subtitle="Doctores voluntarios disponibles" 
        color="#28a745"
        onPress={() => navigation.navigate('Consulta')}
      />
      
      {/* Botón que navega a la pantalla 'Buscar' */}
      <ActionCard 
        iconName="location-on" 
        title="Buscar Medicamentos" 
        subtitle="Encuentra medicinas cerca de ti" 
        color="#6f42c1"
        onPress={() => navigation.navigate('Buscar')}
      />

    </ScrollView>
  );
}

// ... Estilos (los mismos que antes) ...
const styles = StyleSheet.create({
  // ... (Copiar los estilos del código anterior aquí) ...
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 50, // Espacio para el notch/barra de estado
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  impactCard: {
    backgroundColor: '#28a745', 
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 5,
  },
  impactTextContainer: {
    flex: 1,
  },
  impactTitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  impactValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 5,
  },
  impactDetail: {
    fontSize: 14,
    color: 'white',
  },
  heartIcon: {
    opacity: 0.2, 
    position: 'absolute',
    right: 20,
    top: 5,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  metricCard: {
    width: '30%', 
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  metricLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  actionTitleHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  actionIcon: {
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  newBadge: {
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  }
});