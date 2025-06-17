import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const EnergyDashboard = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('https://lla-backend.onrender.com/api/user');
        setUserData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <Text style={styles.loading}>Loading Dashboard...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome back, {userData.name} 👋</Text>

      <Section title="🌟 Energy Snapshot" content={userData.energySnapshot} />
      <Section title="🎵 Song of the Day" content={userData.songOfTheDay} />
      <Section title="📜 Daily Quote/Verse" content={userData.quoteOrVerse} />
      <Section title="🔮 Zodiac & Astro Forecast" content={userData.zodiacForecast} />
      <Section title="🌦️ Weather Meaning" content={userData.weatherMeaning} />
      <Section title="😌 Senses & Preferences" content={userData.sensoryInsights} />
      <Section title="🧠 Mental Health Signals" content={userData.mentalHealthMeaning} />
      <Section title="🍱 Food Cravings & Symbolism" content={userData.foodMeaning} />
      <Section title="🫁 Breathing & Healing Practices" content={userData.breathingPractice} />
      <Section title="💡 Suggested Activity" content={userData.activitySuggestion} />
      <Section title="🧬 Inner Archetypes" content={userData.innerArchetypes} />
      <Section title="🧍 External Archetypes" content={userData.peopleRoles} />
      <Section title="🐾 Pets as Mirrors" content={userData.petMeaning} />
      <Section title="🏈 Sports & Hobbies" content={userData.hobbyMeaning} />
      <Section title="🖼️ Tattoos, Clothes, Dreams" content={userData.symbolicChoices} />
      <Section title="📚 Historical/Mythical Parallels" content={userData.historicalContext} />
      <Section title="📺 Media as Mirror" content={userData.mediaMirror} />
      <Section title="📅 Life Events & Meaning" content={userData.lifeEventInsights} />
      <Section title="🧠 Addictions & Shadow" content={userData.addictionInsights} />

      <Text style={styles.footer}>LLA (Live Love Align) – Powered by You 🌍</Text>
    </ScrollView>
  );
};

const Section = ({ title, content }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.content}>{content || '—'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  loading: {
    padding: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
  },
});

export default EnergyDashboard;
