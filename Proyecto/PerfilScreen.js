import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';


const user = {
  name: "christophervengador",
  email: "christophervengador@gmail.com",
  memberSince: "Oct 2024",
  profilePic: 'https://via.placeholder.com/70/D32F2F/FFFFFF?text=CV', 
  donations: 47,
  peopleHelped: 128,
  consultations: 5,
  currentLevel: "Oro",
  nextLevelProgress: 70, 
  donationsToNextLevel: 25,
};

const recentActivity = [
  { id: 1, name: "Donaste Ibuprofeno", time: "Hace 2 días • 5 personas ayudadas", icon: 'package-variant-closed', color: '#c5cae9', iconColor: '#3f51b5' },
  { id: 2, name: "Consulta con Dr. Ramírez", time: "Hace 5 días • Completada", icon: 'calendar-check', color: '#c8e6c9', iconColor: '#4caf50' },
  { id: 3, name: "Donaste Amoxicilina", time: "Hace 1 semana • 3 personas ayudadas", icon: 'package-variant-closed', color: '#c5cae9', iconColor: '#3f51b5' },
];

const menuOptions = [
  { id: 1, title: "Mi Información", subtitle: "Datos personales", icon: 'account-outline' },
  { id: 2, title: "Mis Donaciones", subtitle: "Historial de ayuda", icon: 'package-variant-closed' },
  { id: 3, title: "Mis Consultas", subtitle: "Citas con voluntarios", icon: 'calendar-month-outline' },
  { id: 4, title: "Configuración", subtitle: "Ajustes de la app", icon: 'cog-outline' },
  { id: 5, title: "Ayuda y Soporte", subtitle: "Contáctanos", icon: 'help-circle-outline', last: true },
];

const achievements = [
  { id: 1, label: "Primera donación", icon: 'heart', color: '#ff7043', unlocked: true },
  { id: 2, label: "10 donaciones", icon: 'cube', color: '#1de9b6', unlocked: true },
  { id: 3, label: "100 ayudados", icon: 'trending-up', color: '#448aff', unlocked: true },
  { id: 4, label: "Platino", icon: 'trophy', color: '#9e9e9e', unlocked: false },
];




const PerfilScreen = ({ navigation }) => {
  
 
  const renderMenuItem = (item, index, array) => (
    <TouchableOpacity key={item.id} style={[styles.menuItem, index === array.length - 1 && styles.lastMenuItem]} onPress={() => console.log(item.title)}>
      <View style={styles.menuIconContainer}>
        <MaterialCommunityIcons name={item.icon} size={24} color="#333" />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
      <AntDesign name="right" size={16} color="#ccc" />
    </TouchableOpacity>
  );


  const renderAchievement = (item) => (
    <View key={item.id} style={styles.achievementItem}>
      <View style={[styles.achievementIcon, { backgroundColor: item.unlocked ? item.color : '#f5f5f5' }]}>
        <MaterialCommunityIcons 
            name={item.icon} 
            size={26} 
            color={item.unlocked ? 'white' : '#9e9e9e'}
        />
      </View>
      <Text style={styles.achievementLabel}>{item.label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      
      {/* 1. Encabezado */}
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Mi Perfil</Text>
        <Text style={styles.subtitle}>Gestiona tu cuenta solidaria</Text>
      </View>

      {/* 2. Tarjeta de Perfil */}
      <View style={styles.card}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: user.profilePic }} style={styles.profileImage} />
          <View>
            <Text style={styles.nameText}>{user.name}</Text>
            <Text style={styles.emailText}>{user.email}</Text>
            <View style={styles.memberBadge}>
                <MaterialCommunityIcons name="check-decagram-outline" size={14} color="#00796b" />
                <Text style={styles.badgeText}>Miembro desde {user.memberSince}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => navigation.navigate('EditarScreen')} 
    >
        <Text style={styles.editButtonText}>Editar Perfil</Text>
    </TouchableOpacity>
      </View>

      {/* 3. Tu Impacto Social */}
      <View style={[styles.card, styles.impactCard]}>
        <View style={styles.impactTitle}>
  <AntDesign name="areachart" size={20} color="#004d40" style={{ marginRight: 8 }} />
  <Text style={styles.impactTitleText}>Tu Impacto Social</Text>
</View>
        
        <View style={styles.impactStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.donations}</Text>
            <Text style={styles.statLabel}>Donaciones</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.peopleHelped}</Text>
            <Text style={styles.statLabel}>Personas ayudadas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.consultations}</Text>
            <Text style={styles.statLabel}>Consultas</Text>
          </View>
        </View>
        
        <View style={styles.levelBarContainer}>
          <View style={styles.levelTextContainer}>
            <Text style={{ fontWeight: '600' }}>Nivel Solidario</Text>
            <View style={styles.currentLevelBadge}>
                <MaterialCommunityIcons name="crown-outline" size={14} color="#000" style={{ marginRight: 5 }} />
                <Text style={styles.currentLevelText}>{user.currentLevel}</Text>
            </View>
          </View>
          <View style={styles.levelBar}>
            <View style={[styles.levelProgress, { width: `${user.nextLevelProgress}%` }]} />
          </View>
          <Text style={styles.levelHintText}>
            {user.donationsToNextLevel} donaciones más para nivel Platino
          </Text>
        </View>
      </View>

      {/* 4. Actividad Reciente */}
      <View style={styles.card}>
        <Text style={styles.activityTitle}>Actividad Reciente</Text>
        {recentActivity.map((activity, index) => (
          <View key={activity.id} style={[styles.activityItem, index === recentActivity.length - 1 && styles.lastActivityItem]}>
            <View style={[styles.activityIconContainer, { backgroundColor: activity.color }]}>
              <MaterialCommunityIcons 
                name={activity.icon} 
                size={24} 
                color={activity.iconColor} 
              />
            </View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityName}>{activity.name}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* 5. Menú de Opciones */}
      <View style={[styles.card, { marginTop: 15 }]}>
        {menuOptions.map(renderMenuItem)}
      </View>

      {/* 6. Logros Desbloqueados */}
      <View style={[styles.card, styles.achievementsCard]}>
        <View style={styles.achievementsTitle}>
            <FontAwesome5 name="medal" size={18} color="#f57c00" style={{ marginRight: 8 }} />
            <Text style={styles.achievementsTitleText}>Logros Desbloqueados</Text>
        </View>
        <View style={styles.achievementGrid}>
          {achievements.map(renderAchievement)}
        </View>
      </View>
      
      {/* 7. Botón de Cerrar Sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Cerrar sesión')}>
        <MaterialCommunityIcons name="logout" size={20} color="#e53935" />
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};




const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3, 
    marginBottom: 10,
  },
  
  
  headerContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },

  
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emailText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  memberBadge: {
    backgroundColor: '#e0f2f1', 
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
    marginTop: 5,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  badgeText: {
    color: '#00796b', 
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 5,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  
 
  impactCard: {
    backgroundColor: '#e8f5e9', 
  },
  impactTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  impactTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004d40', 
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b', 
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  levelBarContainer: {
    marginTop: 10,
  },
  levelTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelBar: {
    height: 8,
    backgroundColor: '#b9f6ca', 
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 8,
  },
  levelProgress: {
    height: '100%',
    backgroundColor: '#00c853', 
    borderRadius: 4,
  },
  levelHintText: {
    fontSize: 13,
    color: '#777',
  },
  currentLevelBadge: {
    backgroundColor: '#ffeb3b', 
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLevelText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 13,
  },

  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lastActivityItem: {
    borderBottomWidth: 0,
  },
  activityIconContainer: {
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
  },
  activityDetails: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  activityTime: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },

  
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },

  
  achievementsCard: {
    backgroundColor: '#fffde7', 
    borderColor: '#ffcc80',
    borderWidth: 1,
    marginTop: 15,
  },
  achievementsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  achievementsTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f57c00', 
  },
  achievementGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  achievementItem: {
    alignItems: 'center',
    width: 80,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementLabel: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  
  
  logoutButton: {
    backgroundColor: '#ffebee', 
    borderColor: '#e57373',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e53935', 
    marginLeft: 10,
  },
});

export default PerfilScreen;