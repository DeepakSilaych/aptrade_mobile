import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { AptoTrade } from '@/components/common/apto-trade';
import { Layout } from '@/components/layout';
import SwipeFingerprint from '@/components/loading/fingerprint';
import { useAuth } from '@/core/auth';
import { useResponsive } from '@/core/hooks';


export default function LoadingScreen() {
  const status = useAuth.use.status();
  // const router = useRouter();
  const { wp, vh } = useResponsive();

  const onSwipe = () => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if(status === 'signOut') {
      router.replace('/login');
    }else{
      router.replace('/(authenticated)/(app)/');
    }
  };

  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AptoTrade height={wp(60)} width={wp(60)} />
        <View style={{ position: 'absolute', bottom: vh(8) }}>
          <SwipeFingerprint onSwipe={onSwipe} />
        </View>
      </View>
    </Layout>
  );
}
