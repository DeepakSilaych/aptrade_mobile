// App.js
import React from 'react';
import { View } from 'react-native';

import { Layout } from '@/components/layout';
import { OrderBook } from '@/components/trade/order-book';
import { OrderForm } from '@/components/trade/order-form';
import { Header } from '@/components/trade/trade-header';

export default function TradeScreen() {
  return (
    <Layout>
        <Header />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, alignItems: 'flex-start'}}>
          <OrderBook />
          <OrderForm />
        </View>
        {/* <OrderForm />
        <BalanceSection /> */}
      {/* <Footer /> */}
    </Layout>
  );
}