// BalanceSection.js
import React from 'react';
import { StyleSheet,Text, TouchableOpacity, View } from 'react-native';

export const BalanceSection = () => {
  return (
    <View style={styles.balanceContainer}>
      <Text style={styles.balanceText}>Available Funds: 0.00 USDT</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Increase Balance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    padding: 10,
    backgroundColor: '#0B0B0D',
    alignItems: 'center',
  },
  balanceText: {
    color: 'white',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});