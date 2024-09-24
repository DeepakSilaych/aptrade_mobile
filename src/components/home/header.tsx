import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react'
import { Pressable, TextInput,View } from 'react-native'

import { useResponsive } from '@/core';

import { AptoTrade } from '../common/apto-trade';

const Header = () => {

  const {vh} = useResponsive()

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, gap: 15}}>
      <View style={{marginTop: 6}}>
        <AptoTrade width={35} height={35} />
      </View>
      <Pressable onPress={() => { console.log('search') }} style={{ flex: 1, height: vh(6), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 3 }}>
        <View pointerEvents='none' style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 10, backgroundColor: '#19181F', paddingHorizontal: 10, paddingVertical: 8, gap: 10 }} >
          <Ionicons name="search" size={20} color="gray" />
          <TextInput editable={false} style={{ color: '#9E9E9E' }} placeholderTextColor="#9E9E9E" autoCorrect={false} placeholder={'APT'} />
        </View>
      </Pressable>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 25 }}>
        <Ionicons name="qr-code-sharp" size={20} color="#B5B5BF" />
        <MaterialIcons name="support-agent" size={20} color="#B5B5BF" />
        <Ionicons name="notifications" size={20} color="#B5B5BF" />
      </View>
    </View>
  )
}

export default Header