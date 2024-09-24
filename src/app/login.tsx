import { useRouter } from "expo-router";
import React from "react";
import { Keyboard, KeyboardAvoidingView,Platform,Pressable,StyleSheet,Text, TextInput, TouchableWithoutFeedback,View} from "react-native";

import { AptoTrade } from '@/components/common/apto-trade';
import {Layout} from "@/components/layout";
import { useAuth } from '@/core';
import { useResponsive } from '@/core/hooks';
import { Next } from "@/ui/icons";

export default function LoginScreen() {
  const { wp } = useResponsive();
  const router = useRouter();
  const [countryCode, ] = React.useState('+91');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const {signIn} = useAuth();
  const submit = async () => {
    if(phoneNumber.length === 10) {
      // const resp = await login(Number(phoneNumber));
      // if(resp!.status === 'success') { 
        router.push({pathname: '/(authenticated)/(app)/', params: {phone: phoneNumber}});
        signIn({username: 'test', phone: phoneNumber, token: 'test'});
      // }
    }
  }
  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
        >
          <View style={{flex: 1, justifyContent: 'space-between', height: '100%'}}>
            <View style={{ gap: 20 }}>
              <AptoTrade height={wp(40)} width={wp(50)} />
              <View style={{padding: 16}}>
                <Text style={{fontSize: 24, fontWeight: '700', color: '#858593', fontFamily: 'Satoshi-Bold'}}>Welcome back</Text>
                <View style={{flexDirection: 'row', marginTop:24}}>
                  <TextInput
                    style={styles.input}
                    placeholder="Country code"
                    placeholderTextColor={'#858593'}
                    value={countryCode}
                    editable={false}
                  />  
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Mobile number"
                    placeholderTextColor={'#626D77'}
                    keyboardType="numeric"
                    value={phoneNumber}
                    maxLength={10}
                    onChangeText={setPhoneNumber}
                  />
                </View>
              </View>
            </View>
            <Pressable onPress={submit} style={{position: 'absolute', bottom: 80, right: 20}}>
              <Next size={50} />
            </Pressable>
            <View style={{ gap: 4, alignItems: 'center', marginBottom: 20 }}>
              <Text style={{color: '#858593', fontSize: 12}}>By continuing, you agree to our </Text>
              <View style={{flexDirection: 'row', gap: 4}}>
                <Text style={{color: '#E9AE5F', fontSize: 12}}>Terms of Service</Text>
                <Text style={{color: '#858593', fontSize: 12}}>and </Text>
                <Text style={{color: '#E9AE5F', fontSize: 12}}>Privacy Policy</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    </Layout>
  );
}



const styles = StyleSheet.create({
  input: {
    backgroundColor: '#161618',
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    marginRight: 10,
    color: '#858593',
  },
});