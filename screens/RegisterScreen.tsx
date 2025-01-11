import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../config/Config';

export default function RegisterScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [edad, setEdad] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [cedula, setCedula] = useState('');

  function validarCampos() {
    if (!correo || !contrasenia || !ciudad || !cedula || !edad) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(correo)) {
      Alert.alert('Error', 'El correo no es válido');
      return false;
    }
    if (contrasenia.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (isNaN(+edad) || +edad <= 0) {
      Alert.alert('Error', 'La edad debe ser un número válido');
      return false;
    }
    return true;
  }

  async function guardar() {
    try {
      const db = getDatabase();
      await set(ref(db, 'usuarios/' + cedula), {
        email: correo,
        age: parseInt(edad),
        city: ciudad,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la información del usuario');
    }
  }

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then(() => {
        guardar();
        Alert.alert('Éxito', 'Registro exitoso');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  }

  function handleRegistro() {
    if (validarCampos()) {
      registro();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
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
      <TextInput
        placeholder="Edad"
        onChangeText={(texto) => setEdad(texto)}
        value={edad}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Ciudad"
        onChangeText={(texto) => setCiudad(texto)}
        value={ciudad}
        style={styles.input}
      />
      <TextInput
        placeholder="Cédula"
        onChangeText={(texto) => setCedula(texto)}
        value={cedula}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Inicio de sesión')}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? Iniciar sesión</Text>
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
  loginText: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
