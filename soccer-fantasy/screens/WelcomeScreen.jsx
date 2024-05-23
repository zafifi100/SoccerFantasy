import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  const [typedTexts, setTypedTexts] = useState([]);
  const texts = [
    "Let your dreams come to reality!",
    "Add friends and challenge them!",
    "Build your dream fantasy team!"
  ];

  useEffect(() => {
    animateTyping();
  }, []);

  const animateTyping = () => {
    const typedTextArray = [];
    let currentIndex = 0;
    let currentText = '';
    let currentTextIndex = 0;
    let isLastLineTyped = false;

    const interval = setInterval(() => {
      if (currentIndex < texts.length) {
        if (currentTextIndex < texts[currentIndex].length) {
          currentText += texts[currentIndex][currentTextIndex];
          typedTextArray[currentIndex] = currentText;
          setTypedTexts([...typedTextArray]);
          currentTextIndex++;
        } else {
          if (currentIndex === texts.length - 1) {
            isLastLineTyped = true;
          }
          currentIndex++;
          currentText = '';
          currentTextIndex = 0;
        }
      } else {
        clearInterval(interval);
        if (isLastLineTyped) {
          setTimeout(() => {
            setTypedTexts([]); // Clear typed texts
            animateTyping(); // Restart typing animation
          }, 5000); // Restart typing animation after 5 seconds
        }
      }
    }, 100); // Adjust typing speed
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ff6f61', '#6fa3ef']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleMain}>Treble</Text>
        <Text style={styles.titleSub}> Fantasy Sports</Text>
      </View>
      <View style={styles.content}>
        {typedTexts.map((text, index) => (
          <Text key={index} style={styles.typewriterText}>{text}</Text>
        ))}
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} marginTop>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 120
  },
  titleMain: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  titleSub: {
    fontSize: 24,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginTop: -10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    marginTop: 250,
    alignItems: 'center',
    position: 'fixed'
  },
  buttons: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  typewriterText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Courier New',
    marginBottom: 20,
  },
});

export default WelcomeScreen;
