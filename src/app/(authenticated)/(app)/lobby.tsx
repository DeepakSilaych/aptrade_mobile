import { Text,View } from "react-native";

import {Layout} from '@/components/layout';


export default function LobbyScreen() {
  return (
    <Layout>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'white'}}>Lobby</Text>
      </View>
    </Layout>
  )
}