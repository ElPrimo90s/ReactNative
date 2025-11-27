import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#34A853';

const NOTIFICATIONS_DATA = [
    { id: '1', title: 'Nuevo producto disponible', detail: 'Verduras Mixtas Frescas en donación cerca de ti', date: '28 oct', type: 'product', unread: true },
    { id: '2', title: 'Oferta especial', detail: 'Pan Artesanal con 70% de descuento', date: '28 oct', type: 'offer', unread: true },
    { id: '3', title: 'Tu pedido ha sido confirmado', detail: 'Panadería La Espiga ha confirmado tu recogida', date: '27 oct', type: 'order', unread: false },
];

const NotificationItem = ({ notification }) => (
    <View style={[styles.notificationCard, notification.unread && styles.unreadCard]}>
        <View style={styles.iconWrapper}>
            <Feather name={notification.type === 'product' ? 'package' : notification.type === 'offer' ? 'percent' : 'check-circle'} size={24} color={PRIMARY_COLOR} />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationDetail}>{notification.detail}</Text>
            <Text style={styles.notificationDate}>{notification.date}</Text>
        </View>
        {notification.unread && <View style={styles.dot} />}
    </View>
);

export default function NotificationsScreen() {
    const [notifications, setNotifications] = React.useState(NOTIFICATIONS_DATA);
    
    const unreadCount = notifications.filter(n => n.unread).length;

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
       
    };

    return (
        <View style={styles.fullContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="#FFF" onPress={() => {}} />
                <View>
                    <Text style={styles.title}>Notificaciones</Text>
                    <Text style={styles.subtitle}>{unreadCount} sin leer</Text>
                </View>
                <Ionicons name="notifications-outline" size={24} color="#FFF" />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerActions}>
                    <Text style={styles.sectionTitle}>Nuevas</Text>
                    <TouchableOpacity onPress={handleMarkAllRead}>
                        <Text style={styles.markReadText}>
                            <Ionicons name="checkmark-circle-outline" size={16} color={PRIMARY_COLOR} /> Marcar todas como leídas
                        </Text>
                    </TouchableOpacity>
                </View>

                {notifications.map(n => <NotificationItem key={n.id} notification={n} />)}

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
    title: { fontSize: 22, color: '#FFF', fontWeight: 'bold' },
    subtitle: { fontSize: 14, color: '#FFF' },
    container: {
        padding: 20,
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    markReadText: {
        fontSize: 14,
        color: PRIMARY_COLOR,
    },
    
    notificationCard: {
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
    unreadCard: {
        borderLeftWidth: 4,
        borderLeftColor: PRIMARY_COLOR,
    },
    iconWrapper: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#E6F4EA', // Verde claro
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    notificationDetail: {
        fontSize: 14,
        color: '#666',
    },
    notificationDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 3,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: PRIMARY_COLOR,
        marginLeft: 10,
    }
});