import { LinearGradient } from 'expo-linear-gradient';
import {Image,Platform,StatusBar} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export const Layout = ({ children, opacity }: { children: React.ReactNode , opacity?: number}) => {
  return (
    <SafeAreaView style={{ backgroundColor: '#0D0D0E', flex: 1 }}>
      <Image source={require("../../assets/Bg-3.png")} style={{ position: 'absolute', zIndex: 0, height: '100%', width: '100%', opacity: opacity ?? 0.3 }} />
      {Platform.OS === 'ios' ? <StatusBar hidden={true} /> : <StatusBar backgroundColor={'#0D0D0E'} />}
      {children}
    </SafeAreaView>
  );
};

export const TableBgLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#18161C' }}>
      <LinearGradient colors={['#18161C', '#141217', '#18161C']} style={{ flex: 1 }}>
        {Platform.OS === 'ios' ? <StatusBar hidden={true} /> : <StatusBar backgroundColor={'#0D0D0E'} />}
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
};