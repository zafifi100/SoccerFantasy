import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';

const MatchesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/field.png')} // Update the path to your image
        style={styles.image}
      />
      <View style={styles.buttonsContainer}>
        {[...Array(11)].map((_, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.button, getPlayerPosition(index)]} 
            onPress={openModal}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Hello</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Function to determine player position
const getPlayerPosition = (index) => {
  const positions = [
    { top: 50, left: 195 },
    { top: 100, left: 100 },
    { top: 100, left: 285 },
    { top: 200, left: 90 },
    { top: 200, left: 160 },
    { top: 200, left: 230 },
    { top: 200, left: 300 },
    { top: 275, left: 50 },
    { top: 275, left: 335 },
    { top: 300, left: 195 },
    { top: 350, left: 195 },
  ];

  return positions[index];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 415, // Adjust width as needed
    height: 735, // Adjust height as needed
    borderRadius: 10, // Adjust border radius to round the edges
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '50%', // Only top half of the field
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  buttonText: {
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default MatchesScreen;
