import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const RosterScreen = ({ rosterPlayers, addPlayerToRoster }) => {
  return (
    <ScrollView contentContainerStyle={styles.cardsContainer} horizontal={false}>
      {rosterPlayers.map((player, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{player.Name}</Text>
          <Text>Position: {player.Position}</Text>
          <Text>Age: {player.Age}</Text>
          <Text>Height: {player.Height}</Text>
          <Text>Weight: {player.Weight}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const AllPlayersScreen = ({ allPlayers, addPlayerToRoster }) => {
  return (
    <ScrollView contentContainerStyle={styles.cardsContainer} horizontal={false}>
      {allPlayers.map((player, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => addPlayerToRoster(player)}>
          <Text style={styles.cardTitle}>{player.Name}</Text>
          <Text>Position: {player.Position}</Text>
          <Text>Age: {player.Age}</Text>
          <Text>Height: {player.Height}</Text>
          <Text>Weight: {player.Weight}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const FieldScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Field Screen</Text>
    </View>
  );
};

const TeamScreen = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [rosterPlayers, setRosterPlayers] = useState([]);

  useEffect(() => {
    // Fetch data from JSON files
    const fetchData = async () => {
      try {
        const premierData = require('../json_files/premier-roster.json');
        const bundesligaData = require('../json_files/bundesliga-roster.json');
        const laligaData = require('../json_files/laliga-roster.json');
        const ligue1Data = require('../json_files/ligue1-roster.json');
        const serieData = require('../json_files/serie-roster.json');
    
        const allPlayers = [
          ...extractPlayersFromLeague(premierData),
          ...extractPlayersFromLeague(bundesligaData),
          ...extractPlayersFromLeague(laligaData),
          ...extractPlayersFromLeague(ligue1Data),
          ...extractPlayersFromLeague(serieData)
        ];
    
        setPlayers(allPlayers);
        setFilteredPlayers(allPlayers);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    
    const extractPlayersFromLeague = (leagueData) => {
      const allPlayers = [];
      for (const clubKey in leagueData) {
        if (Object.hasOwnProperty.call(leagueData, clubKey)) {
          const clubPlayers = leagueData[clubKey];
          allPlayers.push(...clubPlayers);
        }
      }
      return allPlayers;
    };
    
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    filterPlayers(text, selectedPositions);
  };

  const handleFilter = () => {
    filterPlayers(searchText, selectedPositions);
  };

  const togglePosition = (position) => {
    const updatedSelectedPositions = selectedPositions.includes(position)
      ? selectedPositions.filter(pos => pos !== position)
      : [...selectedPositions, position];
    setSelectedPositions(updatedSelectedPositions);
    filterPlayers(searchText, updatedSelectedPositions);
  };

  const filterPlayers = (searchText, positions) => {
    const filtered = players.filter(player => {
      const playerName = player.Name || ''; // Handle null values for Name property
      return (
        (searchText === '' || playerName.toLowerCase().includes(searchText.toLowerCase())) &&
        (positions.length === 0 || positions.includes(player.Position))
      );
    });
    setFilteredPlayers(filtered);
  };
  

  const addPlayerToRoster = (player) => {
    setRosterPlayers([...rosterPlayers, player]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search player..."
          onChangeText={handleSearch}
          value={searchText}
        />
        <TouchableOpacity onPress={handleFilter}>
          <Text>Filter</Text>
        </TouchableOpacity>
      </View>

      <Tab.Navigator>
        <Tab.Screen name="Roster">
          {() => <RosterScreen rosterPlayers={rosterPlayers} />}
        </Tab.Screen>
        <Tab.Screen name="All Players">
          {() => <AllPlayersScreen allPlayers={filteredPlayers} addPlayerToRoster={addPlayerToRoster} />}
        </Tab.Screen>
        <Tab.Screen name="Field" component={FieldScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
  },
  filters: {
    marginBottom: 20,
  },
  filterOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterOption: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filterOptionSelected: {
    backgroundColor: 'lightblue',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    width: '47%', // Three columns
    aspectRatio: 1, // Make the cards square
    shadowColor: 'blue', // Blue shadow color
    shadowOffset: { width: 0, height: 0 }, // Evenly distributed shadow
    shadowOpacity: 0.5, // Increased opacity for visibility
    shadowRadius: 8,
    elevation: 5,
  }, 
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TeamScreen;

