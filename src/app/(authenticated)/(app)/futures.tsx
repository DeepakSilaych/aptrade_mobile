import {View } from "react-native";

import {Layout} from '@/components/layout';
import { useAuth } from "@/core";
import { SubmitButton } from "@/ui";


export default function FuturesScreen() {

  const {signOut} = useAuth();

  return (
    <Layout>
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
          <SubmitButton text="Logout" onSubmit={signOut} />
        </View>
    </Layout>
  )
}