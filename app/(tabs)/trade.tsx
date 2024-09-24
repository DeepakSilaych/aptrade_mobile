import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Picker } from "react-native";

// Define Trade Type for Orders
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

// Initial Buy Orders (Bids)
const initialBuyOrders: Trade[] = [
  { price: 63193.50, amount: 1.234, total: 78025.00 },
  { price: 63193.40, amount: 0.567, total: 35850.60 },
  { price: 63193.30, amount: 0.200, total: 12638.66 },
  { price: 63193.10, amount: 0.354, total: 22396.20 },
];

// Initial Sell Orders (Asks)
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

  // Handle token change
  const handleTokenChange = (tokenSymbol: string) => {
    const token = availableTokens.find(t => t.symbol === tokenSymbol);
    if (token) {
      setSelectedToken(token.symbol);
      setPrice(token.price.toString());
      setTotal((token.price * parseFloat(amount)).toFixed(2));
    }
  };

  // Handle amount change
  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    setTotal((parseFloat(price) * parseFloat(newAmount)).toFixed(2));
  };

  // Handle price change (if allowed)
  const handlePriceChange = (newPrice: string) => {
    setPrice(newPrice);
    setTotal((parseFloat(newPrice) * parseFloat(amount)).toFixed(2));
  };

  const handleBuy = () => {
    console.log(`Buying ${amount} ${selectedToken} at $${price}`);
  };

  return (
    <>
      <Stack.Screen />
      <View className="flex-1 bg-slate-900 p-4">
        <View className="mt-4 flex-row justify-between items-center">
          <Text className="text-white text-xl font-bold">{selectedToken}/USDT</Text>
        </View>
        <Text className="text-gray-400 text-sm mb-4">Current Price: ${price}</Text>

        {/* Token Picker */}
        <View className="flex-row items-center mb-4">
          <Text className="text-white text-lg mr-2">Select Token:</Text>
          <Picker
            selectedValue={selectedToken}
            style={{ height: 50, width: 150, color: "white" }}
            onValueChange={(itemValue) => handleTokenChange(itemValue)}
            className="bg-gray-800 p-2 rounded-lg"
          >
            {availableTokens.map((token) => (
              <Picker.Item key={token.symbol} label={token.name} value={token.symbol} />
            ))}
          </Picker>
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

        {/* Buy Button */}
        <TouchableOpacity
          onPress={handleBuy}
          className="p-4 bg-yellow-500 rounded-full mt-4"
        >
          <Text className="text-center text-black font-semibold">Buy {selectedToken}</Text>
        </TouchableOpacity>

        {/* Order Book */}
        <View className="mt-6">
          <Text className="text-white text-lg font-semibold mb-2">Order Book</Text>

          {/* Buy Orders (Bids) */}
          <Text className="text-green-400 text-base mb-1">Buy Orders (Bids)</Text>
          <ScrollView className="bg-gray-800 rounded-lg p-2 mb-4">
            {initialBuyOrders.map((order, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center p-2 bg-gray-900 rounded-lg mt-2"
              >
                <Text className="text-green-400">${order.price.toFixed(2)}</Text>
                <Text className="text-gray-400">{order.amount.toFixed(5)} {selectedToken}</Text>
                <Text className="text-green-400">${order.total.toFixed(2)}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Sell Orders (Asks) */}
          <Text className="text-red-400 text-base mb-1">Sell Orders (Asks)</Text>
          <ScrollView className="bg-gray-800 rounded-lg p-2">
            {initialSellOrders.map((order, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center p-2 bg-gray-900 rounded-lg mt-2"
              >
                <Text className="text-red-400">${order.price.toFixed(2)}</Text>
                <Text className="text-gray-400">{order.amount.toFixed(5)} {selectedToken}</Text>
                <Text className="text-red-400">${order.total.toFixed(2)}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
