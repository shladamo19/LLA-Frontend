import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function ProfileScreen({ route, navigation }) {
  const { name, birthdate, mood } = route.params;

  useEffect(() => {
    const createUser = async () => {
      try {
        await axios.post('https://<your-backend-url>/api/user', {
          name,
          birthdate,
          mood,
        });
        console.log('User profile created');
      } catch (error) {
        console.error('Error creating user:', error);
        Alert.alert('Error', 'Failed to save profile. Try again later.');
      }
    };

    createUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {name}!</Text>
      <Text style={styles.text}>Your birthdate: {birthdate}</Text>
      <Text style={styles.text}>Your mood: {mood}</Text>

      <Button title="Go to Dashboard ➤" onPress={() => navigation.navigate('Dashboard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
  },
});
