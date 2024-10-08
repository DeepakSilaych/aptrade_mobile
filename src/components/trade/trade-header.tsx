// Header.js
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Header = () => {
  return (
    <View style={styles.nav}>
      <View style={styles.navLeft}>
        <Text style={styles.textGray}>Convert</Text>
        <Text style={styles.textBold}>Spot</Text>
        <Text style={styles.textGray}>Margin</Text>
        <Text style={styles.textGray}>Bots</Text>
        <Text style={styles.textGray}>
          Copy
        </Text>
        <Text style={styles.textGray}>Buy</Text>
        <Text style={styles.textGray}>P2P</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, alignItems: 'flex-start'}}>
        <View style={styles.marketNav}>
          <View style={styles.navRight}>
            <Text style={styles.market}>BTC/USDT</Text>
            <AntDesign name="caretdown" size={14} color="white" />
          </View>
          <Text style={styles.changeText}>+2.13%</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
          <MaterialIcons name="candlestick-chart" size={24} color="white" />
          <Entypo name="dots-three-horizontal" size={24} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'column',
    gap: 16,
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  marketNav: {
    flexDirection: 'column',
    gap:8,
    // paddingHorizontal: 16,
    // paddingVertical: 24,
  },
  textGray: {
    color: '#6B7280',
    marginRight: 16,
  },
  textBold: {
    fontWeight: 'bold',
    marginRight: 16,
    color: 'white',
  },
  market: {
    fontWeight: 'bold',
    marginRight: 16,
    color: 'white',
    fontSize: 22,
  },
  changeText: {
    color: 'green',
    fontSize: 15,
    fontFamily:'Satoshi-Bold'
  },
  newBadge: {
    backgroundColor: '#FBBF24',
    fontSize: 10,
    color: 'black',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});