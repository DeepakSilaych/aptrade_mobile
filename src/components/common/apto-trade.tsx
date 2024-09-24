import { Image } from 'expo-image';
import { View } from 'react-native';
export function AptoTrade({ height, width }: { height: number; width: number }) {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
      <Image source={require('../../../assets/AptoTrade.png')} style={{ width: width, height: height }} />
    </View>
  );
}
