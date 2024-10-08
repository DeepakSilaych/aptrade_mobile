/* eslint-disable react/no-unstable-nested-components */
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import * as Haptics from 'expo-haptics';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Pressable,View } from 'react-native';

// import { Header } from '@/components/app/common/header';
import { useAuth, useResponsive } from '@/core';
import { GoldWallet,
SilverWallet} from '@/ui/icons';

export default function TabLayout() {
  const status = useAuth.use.status();
  // const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  // if (isFirstTime) {
  //   return <Redirect href="/onboarding" />;
  // }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs tabBar={(props: any) => <MyTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarTestID: 'home-tab',
          headerShown: false,
          // header: () => <Header />,
        }}
      />
      <Tabs.Screen
        name="trade"
          options={{
            title: 'Trade',
            tabBarTestID: 'trade-tab',
            headerShown: false,
            // header: () => <Header />,
          }}
        />
      <Tabs.Screen
        name="futures"
        options={{
          title: 'Futures',
          tabBarTestID: 'futures-tab',
          headerShown: false,
          // header: () => <Header />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarTestID: 'wallet-tab',
          headerShown: false,
          // header: () => <Header />,
        }}
      />
    </Tabs>
  );
}

const MyTabBar = ({state, descriptors, navigation}: any) => {

  const [size1,setSize1] = React.useState(26);
  const [size2,setSize2] = React.useState(26);
  const [size3,setSize3] = React.useState(26);
  const [size4,setSize4] = React.useState(26);

  useEffect(() => {}, [size1, size2, size3])

  const {vw,vh} = useResponsive();
	return (
			<View style={{borderColor: 'rgba(0,0,0,0.05)', backgroundColor: '#18171C', height: vh(10), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: vw(100), borderTopWidth: 1}} >
				{state.routes.map((route: any, index: number) => {
					const isFocused = state.index === index;
					const {options} = descriptors[route.key];

					const onPress = () => {
						const event = navigation.emit({
							type:'tabPress',
							target: 'route.key'
						});
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
						if(!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					return (
            <View key={index} style={{flex: 1, height: vh(10), flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', width: vw(11), marginHorizontal: vw(3) }}>
							{
								index === 0 && (
                  <Pressable key={index} onPressIn={() => {setSize1(24)}} onPressOut={() => {setSize1(26)}} onPress={onPress} testID={options.tabBarTestID} accessibilityRole="button" style={{flex: 1, height: vh(7), flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingHorizontal: vw(5), gap:2, marginTop:10}}>
										{isFocused ? <Entypo name="home" size={size1} color="#E9AE5F" /> : <Entypo name="home" size={size1} color="#B5B5BF" />}
										{/* {isFocused ? <Text style={{color: '#E9AE5F', fontSize: 11, fontFamily:'Satoshi-Bold'}}>Home</Text> : <Text style={{color: '#B5B5BF', fontSize: 10, fontWeight: 'bold'}}>Home</Text>} */}
									</Pressable>
								)
							}
							{
								index === 1 && (
                  <Pressable key={index} onPressIn={() => {setSize2(24)}} onPressOut={() => {setSize2(26)}} onPress={onPress} testID={options.tabBarTestID} accessibilityRole="button" style={{flex: 1, height: vh(7), flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingHorizontal: vw(5), gap:2, marginTop:10}}>
										{isFocused ? <Entypo name="swap" size={size2} color="#E9AE5F" /> : <Entypo name="swap" size={size2} color="#B5B5BF" />}
										{/* {isFocused ? <Text style={{color: '#E9AE5F', fontSize: 11, fontFamily:'Satoshi-Bold'}}>Trade</Text> : <Text style={{color: '#B5B5BF', fontSize: 10, fontWeight: 'bold'}}>Trade</Text>} */}
                  </Pressable>
								)
							}
							{
								index === 2 && (
                  <Pressable key={index} onPressIn={() => {setSize3(24)}} onPressOut={() => {setSize3(26)}} onPress={onPress} testID={options.tabBarTestID} accessibilityRole="button" style={{flex: 1, height: vh(7), flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingHorizontal: vw(5), gap:2, marginTop:10}}>
										{isFocused ? <AntDesign name="areachart" size={size3} color="#E9AE5F" /> : <AntDesign name="areachart" size={size3} color="#B5B5BF" />}
										{/* {isFocused ? <Text style={{color: '#E9AE5F', fontSize: 11, fontFamily:'Satoshi-Bold'}}>Futures</Text> : <Text style={{color: '#B5B5BF', fontSize: 10, fontWeight: 'bold'}}>Futures</Text>} */}
                  </Pressable>
								)
							}
							{
								index === 3 && (
                  <Pressable key={index} onPressIn={() => {setSize4(21)}} onPressOut={() => {setSize4(23)}} onPress={onPress} testID={options.tabBarTestID} accessibilityRole="button" style={{flex: 1, height: vh(7), flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingHorizontal: vw(5), gap:2, marginTop:10}}>
										{isFocused ? <GoldWallet size={size4} /> : <SilverWallet size={size4} />}
										{/* {isFocused ? <Text style={{color: '#E9AE5F', fontSize: 11, fontFamily:'Satoshi-Bold'}}>Wallet</Text> : <Text style={{color: '#B5B5BF', fontSize: 10, fontWeight: 'bold'}}>Wallet</Text>} */}
									</Pressable>
								)
							}
            </View>
					);
				})}
			</View>
	);
};

