import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { login } from '../services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the login button press
  const handleLogin = async () => {
    // Implement your login logic here

    try {
      const response = await login(email, password);
      console.log(response);
      await AsyncStorage.setItem('userData', JSON.stringify(response));
      navigation.navigate('DashboardScreen');
    } catch (e) {
      Alert.alert(
        'Invalid Credentials',
        'Invalid user name or password. Please try again!',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false },
      );
    }

    // navigation.navigate('DashboardScreen');
    // You can add your authentication logic here (e.g., API call, validation, etc.)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login into FitTracker</Text>

      {/* Username input field */}
      <TextInput style={styles.input} placeholder="Username" value={email} onChangeText={(text) => setEmail(text)} />

      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: 250,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

LoginScreen.navigationOptions = {
  headerTitle: 'Login',
};
