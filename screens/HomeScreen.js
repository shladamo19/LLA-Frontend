import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [mood, setMood] = useState('');

  const handleNext = () => {
    navigation.navigate('Profile', {
      name,
      birthdate,
      mood
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Live Love Align</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Birthdate (YYYY-MM-DD)"
        value={birthdate}
        onChangeText={setBirthdate}
      />

      <TextInput
        style={styles.input}
        placeholder="Current Mood"
        value={mood}
        onChangeText={setMood}
      />

      <Button title="Next ➤" onPress={handleNext} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    borderRadius: 8,
  }
});
