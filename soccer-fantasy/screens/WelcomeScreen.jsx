import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false); // Hide overlay after 3 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Designer.png')} style={styles.backgroundImage}>
        {showOverlay && (
          <LinearGradient colors={['#0074D9', '#ffffff']} style={styles.overlay} />
        )}
      </ImageBackground>
      {!showOverlay && (
        <View style={styles.contentContainer}>
          <Image source={require('../assets/Designer.png')} style={styles.logo} />
          <Text style={styles.subtitle}>Welcome to Your App</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.buttonText, { color: '#000' }]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#7393B0' }]} onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.buttonText, { color: '#fff' }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100, // Adjust the width of the logo
    height: 100, // Adjust the height of the logo
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#fff',
  },
});

export default WelcomeScreen;
