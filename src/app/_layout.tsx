// Import  global CSS file
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { APIProvider } from '@/api';
import { hydrateAuth } from '@/core';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

hydrateAuth();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  useFonts({
    'Alpino-600': require('../../assets/fonts/Alpino600.ttf'),
    'Satoshi-Light': require('../../assets/fonts/Satoshi-Light.otf'),
    'Satoshi-Regular': require('../../assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('../../assets/fonts/Satoshi-Medium.otf'),
    'Satoshi-Medium2': require('../../assets/fonts/Satoshi-Variable2.ttf'),
    'Satoshi-SemiBold': require('../../assets/fonts/Satoshi-Variable.ttf'),
    'Satoshi-Bold': require('../../assets/fonts/Satoshi-Bold.otf'),
    'Satoshi-Black': require('../../assets/fonts/Satoshi-Black.otf'),
  });


  return (
    <Providers> 
      <Stack >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false, animation:'fade' }} />
        <Stack.Screen name="(authenticated)/(app)" options={{ headerShown: false, animation: 'fade' }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </APIProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}