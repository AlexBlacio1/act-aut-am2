import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../config/Config';
import { onValue, ref } from 'firebase/database';

export default function ListaScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(db, 'usuarios');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const usuarios = snapshot.val();
      if (usuarios) {
        const formattedData = Object.keys(usuarios).map((key) => ({
          id: key,
          ...usuarios[key],
        }));
        setData(formattedData);
      } else {
        setData([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.text}>ID: {item.id}</Text>
      <Text style={styles.text}>Correo: {item.email}</Text>
      <Text style={styles.text}>Edad: {item.age}</Text>
      <Text style={styles.text}>Ciudad: {item.city}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyText}>No hay usuarios registrados</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
