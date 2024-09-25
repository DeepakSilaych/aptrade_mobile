import { Stack } from "expo-router";
import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
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
  { price: 63193.50, amount: 1.234, total: 78025.00 },
  { price: 63193.40, amount: 0.567, total: 35850.60 },
  { price: 63193.30, amount: 0.200, total: 12638.66 },
  { price: 63193.10, amount: 0.354, total: 22396.20 },
];

const initialSellOrders: Trade[] = [
  { price: 63194.00, amount: 0.342, total: 21629.58 },
  { price: 63194.10, amount: 0.765, total: 48355.36 },
  { price: 63194.20, amount: 0.432, total: 27357.82 },
  { price: 63194.30, amount: 1.000, total: 63194.30 },
];

export default function Trade() {
  const [selectedToken, setSelectedToken] = useState<string>("BTC");
  const [price, setPrice] = useState<string>(availableTokens[0].price.toString());
  const [amount, setAmount] = useState<string>("0.01");
  const [total, setTotal] = useState<string>((parseFloat(price) * parseFloat(amount)).toFixed(2));
  const [isLong, setIsLong] = useState<boolean>(true); // State for long/short
  const [showChart, setShowChart] = useState<boolean>(false); // State for showing chart

  const modalizeRef = useRef<Modalize>(null);

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
    const action = isLong ? "Long" : "Short";
    console.log(`${action} ${amount} ${selectedToken} at $${price}`);
  };

  const toggleLongShort = (long: boolean) => {
    setIsLong(long);
  };

  const openTokenSelector = () => {
    modalizeRef.current?.open();
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <>
      <Stack.Screen />
      <View className="flex-1 bg-slate-900 p-4">

        {/* Token Picker with Bottom Sheet */}
        <View className="mt-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={openTokenSelector}>
            <Text className="text-white text-xl font-bold">
              {selectedToken} / USDT ▼
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-400 text-sm mb-4">${price}</Text>

        {/* Long/Short Segmented Control */}
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            onPress={() => toggleLongShort(true)}
            className={`flex-1 p-3 rounded-l-lg ${isLong ? "bg-blue-500" : "bg-gray-700"}`}
          >
            <Text className={`text-center ${isLong ? "text-black font-bold" : "text-white"}`}>
              Long
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleLongShort(false)}
            className={`flex-1 p-3 rounded-r-lg ${!isLong ? "bg-orange-500" : "bg-gray-700"}`}
          >
            <Text className={`text-center ${!isLong ? "text-black font-bold" : "text-white"}`}>
              Short
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

        {/* Trade Action Button */}
        <TouchableOpacity
          onPress={handleTradeAction}
          className={`p-4 ${isLong ? "bg-blue-600" : "bg-orange-600"} rounded-lg`}
        >
          <Text className="text-center text-white font-semibold">
            {isLong ? `Long ${selectedToken}` : `Short ${selectedToken}`}
          </Text>
        </TouchableOpacity>

        {/* Chart Toggle Button */}
        <TouchableOpacity
          onPress={toggleChart}
          className="mt-4 p-3 bg-green-600 rounded-lg"
        >
          <Text className="text-center text-white font-semibold">
            {showChart ? "Hide Chart" : "Show Chart"}
          </Text>
        </TouchableOpacity>

        {/* Chart Display */}
        {showChart && (
          <View className="mt-6 p-4 bg-gray-800 rounded-lg">
            <Text className="text-white text-lg font-semibold">Chart Placeholder</Text>
            {/* You can replace the below with a chart library/component */}
            <View className="h-32 bg-gray-600 rounded-lg mt-2" />
          </View>
        )}

        {/* Order Book */}
        {/* <View className="mt-6">
          <Text className="text-white text-lg font-semibold mb-2">Order Book</Text>

          <Text className="text-green-400 text-base mb-1">Buy Orders (Bids)</Text>
          <ScrollView className="bg-gray-800 rounded-lg p-2 mb-4">
            {initialBuyOrders.map((order, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center p-2 bg-gray-900 rounded-lg mt-2"
              >
                <Text className="text-green-400">${order.price}</Text>
                <Text className="text-white">{order.amount}</Text>
                <Text className="text-white">{order.total}</Text>
              </View>
            ))}
          </ScrollView>

          <Text className="text-red-400 text-base mb-1">Sell Orders (Asks)</Text>
          <ScrollView className="bg-gray-800 rounded-lg p-2">
            {initialSellOrders.map((order, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center p-2 bg-gray-900 rounded-lg mt-2"
              >
                <Text className="text-red-400">${order.price}</Text>
                <Text className="text-white">{order.amount}</Text>
                <Text className="text-white">{order.total}</Text>
              </View>
            ))}
          </ScrollView>
        </View> */}

        {/* Token Selector Modal */}
        <Modalize ref={modalizeRef}>
          <View className="p-4">
            <Text className="text-lg font-bold mb-4">Select a Token</Text>
            {availableTokens.map((token) => (
              <TouchableOpacity
                key={token.symbol}
                onPress={() => handleTokenChange(token.symbol)}
                className="p-2 mb-2 bg-gray-800 rounded-lg"
              >
                <Text className="text-white">{token.name} ({token.symbol})</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modalize>
      </View>
    </>
  );
}
