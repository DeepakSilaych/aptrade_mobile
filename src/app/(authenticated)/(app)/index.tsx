
import { View } from 'react-native';

import Header from '@/components/home/header';
import Tabs from '@/components/home/tabs';
import {Layout} from '@/components/layout';

export default function HomeScreen() {

  return (
    <Layout>
      <View style={{marginBottom: 30}}>
        <Header />
      </View>
        <Tabs />
    </Layout>
  );
}
