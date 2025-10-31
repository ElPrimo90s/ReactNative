import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ConsultaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pestaña: Consulta Gratuita</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 20, fontWeight: 'bold' },
});