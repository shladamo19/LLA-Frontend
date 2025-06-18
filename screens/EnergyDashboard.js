import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function EnergyDashboard() {
  const [energyData, setEnergyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEnergy() {
      try {
        const response = await fetch('https://lla-backend-mj96.onrender.com/api/energy');
        if (!response.ok) throw new Error(`Network response not ok: ${response.status}`);
        const data = await response.json();
        setEnergyData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEnergy();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Energy Dashboard</Text>
      
      <Text style={styles.label}>Level:</Text>
      <Text style={styles.value}>{energyData.level}</Text>

      <Text style={styles.label}>Mood:</Text>
      <Text style={styles.value}>{energyData.mood}</Text>

      <Text style={styles.label}>Timestamp:</Text>
      <Text style={styles.value}>{new Date(energyData.ts).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#f5f5f5',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    color: '#bbb',
    marginTop: 16,
  },
  value: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 18,
    fontWeight: '700',
  },
});
