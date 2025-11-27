import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';


const specialties = ["Todos", "Medicina General", "Pediatría", "Cardiología", "Dermatología", "Nutrición"];

const doctorsData = [
  {
    id: 1,
    name: "Dr. Carlos Ramírez",
    specialty: "Medicina General",
    rating: 4.9,
    reviews: 234,
    yearsExp: 15,
    nextAvailable: "Hoy 16:00",
    modality: "Virtual",
    imageUrl: 'https://via.placeholder.com/60/00796b/FFFFFF?text=CR', 
    isAvailable: true,
  },
  {
    id: 2,
    name: "Dra. Ana Martínez",
    specialty: "Pediatría",
    rating: 4.8,
    reviews: 189,
    yearsExp: 12,
    nextAvailable: "Hoy 18:00",
    modality: "Virtual",
    imageUrl: 'https://via.placeholder.com/60/00796b/FFFFFF?text=AM',
    isAvailable: true,
  },
  {
    id: 3,
    name: "Dr. Ricardo Gómez",
    specialty: "Cardiología",
    rating: 4.7,
    reviews: 55,
    yearsExp: 20,
    nextAvailable: "Mañana 10:00",
    modality: "Presencial",
    imageUrl: 'https://via.placeholder.com/60/00796b/FFFFFF?text=RG',
    isAvailable: false,
  },
];




const DoctorCard = ({ doctor }) => {
  const isAvailableToday = doctor.nextAvailable.startsWith('Hoy');

  return (
    <View style={styles.doctorCard}>
      <View style={styles.doctorInfoRow}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: doctor.imageUrl }} style={styles.doctorImage} />
            {doctor.isAvailable && <View style={styles.availabilityDot} />}
        </View>
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={[styles.specialtyTag, { backgroundColor: doctor.specialty === 'Pediatría' ? '#e8f5e9' : '#e0f7fa' }]}>
            {doctor.specialty}
          </Text>
          <View style={styles.ratingRow}>
            <FontAwesome name="star" size={14} color="#ffc107" />
            <Text style={styles.ratingText}>{doctor.rating} ({doctor.reviews})</Text>
            <FontAwesome name="graduation-cap" size={14} color="#666" style={{ marginLeft: 15 }} />
            <Text style={styles.yearsText}>{doctor.yearsExp} años</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.availabilityRow}>
        <View style={styles.availabilityBox}>
            <Text style={styles.availabilityLabel}>Próxima disponibilidad</Text>
            <Text style={[styles.availabilityTime, isAvailableToday && { color: '#00c853' }]}>
                {doctor.nextAvailable}
            </Text>
        </View>
        <View style={styles.availabilityBox}>
            <Text style={styles.availabilityLabel}>Modalidad</Text>
            <View style={styles.modalityTextContainer}>
                <MaterialCommunityIcons name="video-outline" size={16} color="#4a90e2" />
                <Text style={styles.modalityText}>{doctor.modality}</Text>
            </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.fullProfileButton}
        onPress={() => console.log(`Ver perfil de ${doctor.name}`)}
      >
        <Text style={styles.fullProfileButtonText}>Ver perfil completo</Text>
      </TouchableOpacity>
    </View>
  );
};



const ConsultaScreen = () => {
  const [activeSpecialty, setActiveSpecialty] = useState('Todos');

  const filteredDoctors = activeSpecialty === 'Todos' 
    ? doctorsData 
    : doctorsData.filter(doc => doc.specialty === activeSpecialty);

  return (
    <ScrollView style={styles.container}>
      
      {/* 1. Encabezado y Estadísticas */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <MaterialCommunityIcons name="stethoscope" size={32} color="white" style={{ marginRight: 10 }} />
          <View>
            <Text style={styles.mainTitle}>Doctores Voluntarios</Text>
            <Text style={styles.subTitle}>Atención médica gratuita</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Doctores activos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2.4K</Text>
            <Text style={styles.statLabel}>Consultas realizadas</Text>
          </View>
        </View>
      </View>

      {/*  Menú de Especialidades */}
      <View style={styles.specialtiesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={specialties}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.specialtyButton,
                activeSpecialty === item && styles.activeSpecialtyButton,
                item === 'Pediatría' && { backgroundColor: activeSpecialty === item ? '#00c853' : 'white' } // Color de ejemplo
              ]}
              onPress={() => setActiveSpecialty(item)}
            >
              <Text style={[
                styles.specialtyText,
                activeSpecialty === item && styles.activeSpecialtyText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.specialtyList}
        />
      </View>

      {/*  Tarjeta de Consultas Gratuitas */}
      <View style={styles.freeConsultCard}>
        <MaterialCommunityIcons name="heart-pulse" size={30} color="#00c853" />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.cardMainText}>Consultas 100% Gratuitas</Text>
          <Text style={styles.cardSubText}>
            Nuestros doctores donan su tiempo para ayudar a quienes más lo necesitan
          </Text>
        </View>
      </View>
      
      {/*  Lista de Doctores */}
      <View style={styles.doctorsListHeader}>
        <Text style={styles.doctorsCount}>{filteredDoctors.length} Doctores</Text>
        <Text style={styles.availableTodayText}>Disponibles hoy</Text>
      </View>

      {filteredDoctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)}

      {/*  Tarjeta de Reclutamiento de Voluntarios */}
      <View style={styles.volunteerCard}>
        <MaterialCommunityIcons name="stethoscope" size={36} color="white" />
        <Text style={styles.volunteerTitle}>¿Eres médico?</Text>
        <Text style={styles.volunteerSubtitle}>
          Únete a nuestro equipo de voluntarios y ayuda a miles de personas
        </Text>
        <TouchableOpacity style={styles.volunteerButton}>
          <Text style={styles.volunteerButtonText}>Quiero ser voluntario</Text>
        </TouchableOpacity>
      </View>
      
      {/* Espacio para asegurar el scroll */}
      <View style={{ height: 30 }} />
      
    </ScrollView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },

  
  header: {
    backgroundColor: '#00c853', // Verde principal
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  
  
  specialtiesContainer: {
    paddingVertical: 10,
    backgroundColor: '#333740', // Fondo oscuro como en la imagen para el scrollbar
    marginTop: -10, // Para superponer un poco sobre el header
    zIndex: 1,
  },
  specialtyList: {
    paddingHorizontal: 10,
  },
  specialtyButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activeSpecialtyButton: {
    backgroundColor: '#00c853', // Verde activo
    borderColor: '#00c853',
  },
  specialtyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  activeSpecialtyText: {
    color: 'white',
  },

  
  freeConsultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9', // Fondo verde muy claro
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 12,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardMainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d40',
  },
  cardSubText: {
    fontSize: 13,
    color: '#333',
    marginTop: 3,
    flexShrink: 1,
  },
  
 
  doctorsListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  doctorsCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  availableTodayText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#00c853', // Verde
  },

 
  doctorCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#eee',
  },
  availabilityDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00c853', // Verde activo
    borderWidth: 2,
    borderColor: 'white',
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  specialtyTag: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '600',
    color: '#004d40',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginTop: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    marginRight: 10,
  },
  yearsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  
  availabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  availabilityBox: {
    flex: 1,
  },
  availabilityLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  availabilityTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalityTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a90e2',
    marginLeft: 5,
  },
  fullProfileButton: {
    borderWidth: 1,
    borderColor: '#00c853',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  fullProfileButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00c853',
  },

 
  volunteerCard: {
    backgroundColor: '#4a90e2', // Fondo azul vibrante
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  volunteerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  volunteerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  volunteerButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  volunteerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
});

export default ConsultaScreen;