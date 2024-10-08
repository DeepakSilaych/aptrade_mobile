// Footer.js
import React from 'react';
import { StyleSheet,Text, TouchableOpacity, View } from 'react-native';

export const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      {['Home', 'Markets', 'Trade', 'Futures', 'Wallets'].map((item) => (
        <TouchableOpacity key={item}>
          <Text style={styles.footerText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#0B0B0D',
  },
  footerText: {
    color: 'white',
  },
});