import { Stack } from "expo-router";
import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";
import { Modalize } from 'react-native-modalize';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface Trade {
  price: number;
  amount: number;
  total: number;
}

const availableTokens = [
  { symbol: "BTC", name: "Bitcoin", price: 63193.49 },
  { symbol: "ETH", name: "Ethereum", price: 4320.50 },
  { symbol: "SOL", name: "Solana", price: 124.15 },
  { symbol: "BNB", name: "Binance Coin", price: 298.85 },
];

const initialBuyOrders: Trade[] = [
  { price: 63193.50, amount: 1.234, total: 78025.01 },
  { price: 63193.40, amount: 0.567, total: 35850.61 },
  { price: 63193.30, amount: 0.200, total: 12638.66 },
  { price: 63193.10, amount: 0.354, total: 22396.21 },
  { price: 63193.10, amount: 0.354, total: 22396.21 },
];

const initialSellOrders: Trade[] = [
  { price: 63194.1, amount: 0.342, total: 21629.58 },
  { price: 63194.10, amount: 0.765, total: 48355.36 },
  { price: 63194.20, amount: 0.432, total: 27357.82 },
  { price: 63193.10, amount: 0.354, total: 22396.21 },
  { price: 63194.30, amount: 1.000, total: 63194.31 },
];

export default function Trade() {
  const [selectedToken, setSelectedToken] = useState<string>("BTC");
  const [price, setPrice] = useState<string>(availableTokens[0].price.toString());
  const [amount, setAmount] = useState<string>("0.01");
  const [total, setTotal] = useState<string>((parseFloat(price) * parseFloat(amount)).toFixed(2));
  const [isBuying, setIsBuying] = useState<boolean>(true);

  const modalizeRef = useRef<Modalize>(null);

  const backgroundColor = useSharedValue(isBuying ? 'green' : 'red');
  const buttonBackgroundColor = useSharedValue(isBuying ? 'green' : 'red');

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isBuying ? 'green' : 'red', { duration: 300 }),
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isBuying ? 'green' : 'red', { duration: 300 }),
    };
  });

  const handleTokenChange = (tokenSymbol: string) => {
    const token = availableTokens.find(t => t.symbol === tokenSymbol);
    if (token) {
      setSelectedToken(token.symbol);
      setPrice(token.price.toString());
      setTotal((token.price * parseFloat(amount)).toFixed(2));
    }
    modalizeRef.current?.close();
  };

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    setTotal((parseFloat(price) * parseFloat(newAmount)).toFixed(2));
  };

  const handlePriceChange = (newPrice: string) => {
    setPrice(newPrice);
    setTotal((parseFloat(newPrice) * parseFloat(amount)).toFixed(2));
  };

  const handleTradeAction = () => {
    const action = isBuying ? "Buying" : "Selling";
    console.log(`${action} ${amount} ${selectedToken} at $${price}`);
  };

  const toggleBuySell = (buying: boolean) => {
    setIsBuying(buying);
    backgroundColor.value = withTiming(buying ? 'green' : 'red', { duration: 300 });
    buttonBackgroundColor.value = withTiming(buying ? 'green' : 'red', { duration: 300 });
  };

  const openTokenSelector = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <Stack.Screen />
      <View className="flex-rcol bg-slate-900 p-4 h-full">

        {/* Token Picker with Bottom Sheet */}
        <View className="mt-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={openTokenSelector}>
            <Text className="text-white text-xl font-bold">
              {selectedToken} / USDT ▼
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-400 text-sm mb-4">${price}</Text>

        <View className="flex-row gap-4 justify-between">
          <View className="flex-1">
            {/* Buy/Sell Segmented Control with Animation */}
            <View className="flex-row justify-between mb-4">
              <TouchableOpacity
                onPress={() => toggleBuySell(true)}
                className={`flex-1 p-3 rounded-l-lg ${isBuying ? "bg-green-500" : "bg-gray-700"}`}
              >
                <Text className={`text-center ${isBuying ? "text-black font-bold" : "text-white"}`}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleBuySell(false)}
                className={`flex-1 p-3 rounded-r-lg ${!isBuying ? "bg-red-500" : "bg-gray-700"}`}
              >
                <Text className={`text-center ${!isBuying ? "text-black font-bold" : "text-white"}`}>
                  Sell
                </Text>
              </TouchableOpacity>
            </View>

            {/* Price Input */}
            <View className="flex-row items-center mb-4">
              <TextInput
                value={price}
                onChangeText={handlePriceChange}
                keyboardType="numeric"
                placeholder="Price (USDT)"
                className="flex-1 p-3 bg-gray-800 text-white rounded-lg"
              />
            </View>

            {/* Amount Input */}
            <View className="flex-row items-center mb-4">
              <TextInput
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                placeholder="Amount"
                className="flex-1 p-3 bg-gray-800 text-white rounded-lg"
              />
            </View>

            {/* Total Display */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-lg">Total (USDT):</Text>
              <Text className="text-white text-lg font-bold">$ {total}</Text>
            </View>


            {/* Animated Trade Action Button */}
            <Animated.View style={[animatedButtonStyle, { borderRadius: 30, overflow: 'hidden' }]}>
              <TouchableOpacity
                onPress={handleTradeAction}
                className="p-4"
              >
                <Text className="text-center text-black font-semibold">
                  {isBuying ? `Buy ${selectedToken}` : `Sell ${selectedToken}`}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Order Book */}
          <View className="flex-2">
            <View className="flex-row justify-between">
              <View className="flex-col">
                <Text className="text-gray-400">Price</Text>
                <Text className="text-gray-400 text-xs">(USDT)</Text>
              </View>
              <View className="flex-col">
                <Text className="text-gray-400 text-right">Amount</Text>
                <Text className="text-gray-400 text-xs text-right">({selectedToken})</Text>
              </View>
            </View>

            <View>
              {initialBuyOrders.map((order, index) => (
                <View
                  key={index}
                  className="flex-row justify-between gap-4 items-center mt-2">
                  <Text className="text-green-400">{order.price}</Text>
                  <Text className="text-white">{order.total}</Text>
                </View>
              ))}
            </View>

            <Text className="text-white text-center text-lg mt-2">{initialBuyOrders[0].price}</Text>

            <ScrollView>
              {initialSellOrders.map((order, index) => (
                <View
                  key={index}
                  className="flex-row justify-between gap-4 items-center mt-2"
                >
                  <Text className="text-red-400">{order.price}</Text>
                  <Text className="text-white">{order.total}</Text>
                </View>
              ))}
            </ScrollView>

          </View>
          
        </View>

        {/* Bottom Sheet Modal for Token Selection */}
        <Modalize ref={modalizeRef} adjustToContentHeight={true}>
          <View className="p-4 bg-gray-800">
            <Text className="text-white text-lg font-semibold mb-4">Select a Token</Text>
            {availableTokens.map((token, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTokenChange(token.symbol)}
                className="p-4 bg-gray-900 rounded-lg mb-2"
              >
                <Text className="text-white">{token.name} ({token.symbol}) - ${token.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modalize>
      </View>
    </>
  );
}
