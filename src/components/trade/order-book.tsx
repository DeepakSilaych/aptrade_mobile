// OrderBook.js
import React from 'react';
import { StyleSheet,Text, View } from 'react-native';

export const OrderBook = () => {
  return (
    <View style={{width: '43%'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, marginBottom: 16}}>
        <View style={{flexDirection: 'column', gap: 4}}>
          <Text style={{fontSize: 13, color: 'rgba(255, 255, 255, 0.4)', fontFamily:'Satoshi-Medium'}}>Price</Text>
          <Text style={{fontSize: 13, color: 'rgba(255, 255, 255, 0.4)', fontFamily:'Satoshi-Medium'}}>(USDT)</Text>
        </View>
        <View style={{flexDirection: 'column', gap: 4}}>
          <Text style={{fontSize: 13, color: 'rgba(255, 255, 255, 0.4)', fontFamily:'Satoshi-Medium'}}>Amount</Text>
          <Text style={{fontSize: 13, color: 'rgba(255, 255, 255, 0.4)', fontFamily:'Satoshi-Medium'}}>(BTC)</Text>
        </View>
      </View>
      <View style={styles.container}>
        {[66314.96, 66314.67, 66314.03, 66314.02, 66314.01].map((price, index) => (
          <View key={index} style={styles.rowRed}>
            <Text style={styles.textRed}>{price.toFixed(2)}</Text>
            <Text style={{color: '#F2F9FA'}}>{(Math.random() * 1).toFixed(5)}</Text>
          </View>
        ))}
        <View style={{flexDirection: 'column', justifyContent: 'space-between', marginTop: 16, marginBottom: 16, alignItems: 'center', gap:6}}>
          <Text style={{fontSize: 20, fontFamily:'Satoshi-Bold', color:'#FF4960'}}>66,314.01</Text>
          <Text style={{fontSize: 14, fontFamily:'Satoshi-Medium', color:'#8891A1'}}>≈ $ 66,314.01</Text>
        </View>
        {[66314.00, 66313.46, 66313.45, 66313.41, 66313.40].map((price, index) => (
          <View key={index} style={styles.rowGreen}>
            <Text style={styles.textGreen}>{price.toFixed(2)}</Text>
            <Text style={{color: '#F2F9FA'}}>{(Math.random() * 5).toFixed(5)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 4,
  },
  rowRed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowBold: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  textRed: {
    color: '#FF4960',
    fontFamily:'Satoshi-Medium'
  },
  textGreen: {
    color: '#2FBC84',
    fontFamily:'Satoshi-Medium'
  },
  rowGreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'green',
  },
});
