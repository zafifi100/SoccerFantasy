import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const RosterScreen = ({ rosterPlayers }) => {
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

const AllPlayersScreen = ({ allPlayers, addPlayerToRoster, players, setFilteredPlayers }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedPositions, setSelectedPositions] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
    filterPlayers(text, selectedPositions);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search player..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <View style={styles.filters}>
        <ScrollView horizontal={true} contentContainerStyle={styles.filterOptions}>
          {['G', 'D', 'M', 'F'].map((position, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterOption,
                selectedPositions.includes(position) && styles.filterOptionSelected
              ]}
              onPress={() => togglePosition(position)}
            >
              <Text>{position}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    </View>
  );
};

const DraftScreen = () => {
  const [countdown, setCountdown] = useState(90);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(timer);
          // Handle what to do when countdown reaches zero
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Next draft in {formatTime(countdown)}</Text>
    </View>
  );
};

const TeamScreen = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [rosterPlayers, setRosterPlayers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Roster');
  const [pageNumber, setPageNumber] = useState(1);
  const playersPerPage = 1000; // Adjust as needed

  useEffect(() => {
    // Fetch data from JSON files
    const fetchData = async () => {
      try {
        const allPlayers = require('../json_files/AllPlayers.json');
        setPlayers(allPlayers);
        setFilteredPlayers(allPlayers);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    
    fetchData();
  }, []);

  const addPlayerToRoster = (player) => {
    setRosterPlayers([...rosterPlayers, player]);
  };

  const renderTab = () => {
    switch (selectedTab) {
      case 'Roster':
        return <RosterScreen rosterPlayers={rosterPlayers} />;
      case 'All Players':
        return <AllPlayersScreen
          allPlayers={filteredPlayers.slice((pageNumber - 1) * playersPerPage, pageNumber * playersPerPage)}
          addPlayerToRoster={addPlayerToRoster}
          players={players}
          setFilteredPlayers={setFilteredPlayers}
        />;
      case 'Draft':
        return <DraftScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Roster' && styles.selectedTab]}
          onPress={() => setSelectedTab('Roster')}
        >
          <Text style={styles.tabText}>Roster</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'All Players' && styles.selectedTab]}
          onPress={() => setSelectedTab('All Players')}
        >
          <Text style={styles.tabText}>All Players</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Draft' && styles.selectedTab]}
          onPress={() => setSelectedTab('Draft')}
        >
          <Text style={styles.tabText}>Draft</Text>
        </TouchableOpacity>
      </View>

      {renderTab()}
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTab: {
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
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
    elevation: 5,
  }, 
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TeamScreen;
