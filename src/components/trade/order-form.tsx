// OrderForm.js
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [{label: 'market', value: 'Market'}, {label: 'limit', value: 'Limit'}]

export const OrderForm = () => {

  const [active, setActive] = useState(0);
  const [orderType, setOrderType] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, active === 0 ? styles.buyButton : styles.inActiveButton]} onPress={() => setActive(0)}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, active === 1 ? styles.sellButton : styles.inActiveButton]} onPress={() => setActive(1)}>
          <Text style={styles.sellButtonText}>Sell</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        {/* <View style={styles.formRow}>
          <Text style={styles.formLabel}>Market</Text>
        </View> */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={orderType}
        onChange={item => {
          setOrderType(item.value);
        }}
        renderLeftIcon={() => (
          <Entypo name="info-with-circle" size={20} color="white" />
        )}
      />

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Market Price</Text>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Total</Text>
          <Text style={styles.formValue}>USDT</Text>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Avbl</Text>
          <Text style={styles.formValue}>
            0 USDT {/* Replace PlusCircleIcon with a suitable React Native icon */}
          </Text>
        </View>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Buy BTC</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    width: '50%',
    marginTop: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  inActiveButton: {
    backgroundColor: '#374151',
  },
  buyButton: {
    backgroundColor: '#2FBC84',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  sellButton: {
    backgroundColor: '#FF4960',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  sellButtonText: {
    color: '#D1D5DB',
    textAlign: 'center',
  },
  formContainer: {
    paddingVertical: 12,
    flexDirection: 'column',
    gap: 12,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  formLabel: {
    color: '#9CA3AF',
  },
  formValue: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 8,
    borderRadius: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    backgroundColor: '#2A313C',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    flexDirection:'row',
    alignItems:'center',
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

});
