import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.usuario}>
            <Text>{item.name}</Text>
            <Text style={styles.correo}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  usuario: { marginBottom: 15, borderBottomWidth: 1, paddingBottom: 10 },
  correo: { color: 'gray' }
});
