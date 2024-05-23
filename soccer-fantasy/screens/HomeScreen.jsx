import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const HomeScreen = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playerNames = ['ChristianoRonaldo', 'LionelMessi'];
      const playerDataPromises = playerNames.map(name =>
        fetch(`http://127.0.0.1:5000/table`).then(response => response.json())
      );
      const playersData = await Promise.all(playerDataPromises);
      setPlayers(playersData);
    };

    fetchPlayers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <ScrollView horizontal>
        {players.map((player, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{player.name}</Text>
            <Text>{player.position}</Text>
            <Text>{player.club}</Text>
            <Text>{player.nationality}</Text>
            <Text>{player.dob}</Text>
            <Text>{player.height}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    margin: 10,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
