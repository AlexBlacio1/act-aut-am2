import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function validarCampos() {
    if (!correo || !contrasenia) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return false;
    }
    return true;
  }

  function login() {
    if (!validarCampos()) return;

    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then(() => {
        navigation.navigate('Lista');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        onChangeText={(texto) => setCorreo(texto)}
        value={correo}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        onChangeText={(texto) => setContrasenia(texto)}
        value={contrasenia}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerText}>¿No estás registrado? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    fontSize: 18,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
