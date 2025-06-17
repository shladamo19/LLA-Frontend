import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

const DashboardEnergy = () => {
  const [energyData, setEnergyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://lla-backend-mj96.onrender.com/energy')
      .then(response => response.json())
      .then(data => {
        setEnergyData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching energy data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#888" />
        <Text>Loading your energy data...</Text>
      </View>
    );
  }

  if (!energyData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load energy dashboard.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Live / Love / Align</Text>

      {Object.entries(energyData).map(([key, value]) => (
        <View key={key} style={styles.card}>
          <Text style={styles.label}>{formatKey(key)}</Text>
          <Text style={styles.value}>{formatValue(value)}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const formatKey = (key) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const formatValue = (value) => {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return value?.toString() ?? 'N/A';
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default DashboardEnergy;

