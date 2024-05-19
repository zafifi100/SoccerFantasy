// src/components/MaskedText.js
import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';

const MaskedText = ({ text, fontSize, imageSource }) => {
  return (
    <ImageBackground
      source={imageSource}
      style={styles.imageBackground}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontSize }]}>{text}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default MaskedText;
