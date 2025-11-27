import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useRoute } from '@react-navigation/native'; 

const PRIMARY_COLOR = '#34A853';
const ACCENT_COLOR = '#D9534F'; 

export default function ProfileScreen({ navigation }) {
    const [isEditing, setIsEditing] = useState(false);
    
    
    const route = useRoute();
    const resetToWelcome = route.params?.resetToWelcome; 
    
    const [profileData, setProfileData] = useState({
        name: 'Christopher',
        email: 'christophervengador@gmail.com',
        phone: '',
        address: '',
        userType: 'Consumidor',
    });

    const handleSave = () => {
       
        console.log('Guardando cambios:', profileData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleLogout = async () => { 
        try {
            
            await AsyncStorage.removeItem('userRole');
            await AsyncStorage.removeItem('userToken'); 

            
            if (resetToWelcome) {
                 resetToWelcome(navigation); 
            } else {
                 
                 Alert.alert("Error de navegación", "No se encontró la función de reseteo. Reinicia la aplicación manualmente.");
            }

        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            Alert.alert("Error", "No se pudo cerrar la sesión correctamente.");
        }
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Ionicons name="arrow-back" size={24} color="#FFF" onPress={() => navigation.goBack()} />
            <Text style={styles.headerTitle}>Mi Perfil</Text>
            <View style={{ width: 24 }} />
        </View>
    );

    const renderEditableField = (icon, placeholder, key) => (
        <View style={styles.inputContainer}>
            <Feather name={icon} size={20} color="#999" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={profileData[key]}
                onChangeText={(text) => setProfileData({ ...profileData, [key]: text })}
            />
        </View>
    );

    const renderReadOnlyProfile = () => (
        <>
            <View style={styles.profileDetailRow}>
                <MaterialCommunityIcons name="email-outline" size={20} color="#666" style={styles.detailIcon} />
                <Text style={styles.detailText}>{profileData.email}</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <AntDesign name="arrowright" size={20} color={ACCENT_COLOR} />
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </>
    );

    const renderEditingProfile = () => (
        <>
            {renderEditableField('phone', 'Número de teléfono', 'phone')}
            {renderEditableField('map-pin', 'Tu dirección', 'address')}

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Guardar cambios</Text>
                </TouchableOpacity>
            </View>
        </>
    );

    return (
        <View style={styles.fullContainer}>
            {renderHeader()}
            
            <ScrollView contentContainerStyle={styles.container}>
                {/* Info de Usuario Fija */}
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Feather name="user" size={40} color="#FFF" />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{profileData.name}</Text>
                        <View style={styles.userTypeBadge}>
                            <Text style={styles.userType}>{profileData.userType}</Text>
                        </View>
                    </View>
                    
                    {!isEditing && (
                        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                            <Feather name="edit" size={20} color={PRIMARY_COLOR} />
                            <Text style={styles.editText}>Editar</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Contenido Dinámico */}
                <View style={styles.contentSection}>
                    {isEditing ? renderEditingProfile() : renderReadOnlyProfile()}
                </View>

                {/* Impacto Ambiental */}
                <View style={styles.impactCard}>
                    <Ionicons name="globe-outline" size={30} color="#FFF" />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={styles.impactTitle}>Impacto ambiental</Text>
                        <Text style={styles.impactText}>
                            Gracias a usuarios como tú, FoodLink ayuda a reducir el desperdicio de alimentos y contribuye a un planeta más sostenible.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    fullContainer: { flex: 1, backgroundColor: '#F0F8EC' },
   
    header: {
        backgroundColor: PRIMARY_COLOR,
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 22, color: '#FFF', fontWeight: 'bold' },
    container: {
        padding: 20,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    userTypeBadge: {
        backgroundColor: '#E6F4EA',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginTop: 5,
    },
    userType: {
        color: PRIMARY_COLOR,
        fontSize: 12,
        fontWeight: 'bold',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
    },
    editText: {
        color: PRIMARY_COLOR,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    contentSection: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    detailIcon: {
        marginRight: 15,
    },
    detailText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        height: 50,
        backgroundColor: '#F9F9F9',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 0,
    },
    inputIcon: {
        marginRight: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
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
    saveButton: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 15,
        borderRadius: 25,
        marginLeft: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: ACCENT_COLOR,
        backgroundColor: '#FCEAEA',
        marginTop: 20,
    },
    logoutText: {
        color: ACCENT_COLOR,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    impactCard: {
        flexDirection: 'row',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    impactTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    impactText: {
        fontSize: 14,
        color: '#FFF',
        marginTop: 5,
    }
});