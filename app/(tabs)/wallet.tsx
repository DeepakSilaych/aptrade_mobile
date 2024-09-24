// Home.tsx
import { Stack } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useState } from "react";
import { FaSync, FaStar, FaRegStar } from "react-icons/fa"; // Icons for refresh and favorite

// Define the cryptocurrency type
interface Crypto {
  symbol: string;
  name: string;
  balance: number;
  logo?: string;
  favorite?: boolean;
}

const initialCryptocurrencies: Crypto[] = [
  { symbol: "BNB", name: "Binance Coin", balance: 0, logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png", favorite: false },
  { symbol: "BTC", name: "Bitcoin", balance: 0, logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", favorite: true },
  { symbol: "ETH", name: "Ethereum", balance: 0, logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png", favorite: false },
  { symbol: "PEPE", name: "Pepe", balance: 0, logo: "https://cryptologos.cc/logos/pepe-coin-pepe-logo.png", favorite: false },
  { symbol: "SOL", name: "Solana", balance: 0, logo: "https://cryptologos.cc/logos/solana-sol-logo.png", favorite: false },
  { symbol: "NEIRO", name: "First Neiro On Ethereum", balance: 0, logo: "https://cryptologos.cc/logos/first-neiro-on-ethereum-neiro-logo.png", favorite: false },
];

export default function Home() {
  const [cryptocurrencies, setCryptocurrencies] = useState<Crypto[]>(initialCryptocurrencies);
  const [filterBy, setFilterBy] = useState<string>('All'); // Add filter state

  // Toggle favorite status
  const toggleFavorite = (symbol: string) => {
    setCryptocurrencies(prevCryptos =>
      prevCryptos.map(crypto => 
        crypto.symbol === symbol ? { ...crypto, favorite: !crypto.favorite } : crypto
      )
    );
  };

  // Handle sorting and filtering
  const filteredCryptocurrencies = cryptocurrencies.filter((crypto) => {
    if (filterBy === 'Favorites') {
      return crypto.favorite;
    }
    return true; // Show all if filter is 'All'
  });

  // Simulate balance refresh
  const refreshBalances = () => {
    // Simulating an API refresh for balance (mocked)
    const updatedBalances = cryptocurrencies.map(crypto => ({
      ...crypto,
      balance: Math.random() * 1000 // Random balance for demo purposes
    }));
    setCryptocurrencies(updatedBalances);
  };

  return (
    <>
      <Stack.Screen />
      <View className="flex-1 bg-slate-900 p-4">
        <View className="mt-4 flex-row justify-between items-center">
          <Text className="text-white text-xl font-bold">Total Balance: $0.00 USD</Text>
          <TouchableOpacity onPress={refreshBalances} className="p-2 bg-yellow-500 rounded-full">
            <FaSync color="black" />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-400 text-sm mb-4">Today's PNL: +$0.00</Text>

        {/* Action buttons */}
        <View className="flex-row justify-between mt-6">
          <ActionButton title="Deposit" />
          <ActionButton title="Withdraw" />
          <ActionButton title="Transfer" />
        </View>

        {/* Balances List */}
        <ScrollView className="mt-4">
          <View className="flex-row justify-between items-center rounded-lg p-2">
            <Text className="text-white text-lg font-semibold">Balances</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity onPress={() => setFilterBy('All')} className="px-4 py-2 bg-gray-700 rounded-lg">
                <Text className={`text-center ${filterBy === 'All' ? 'text-white' : 'text-gray-400'}`}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterBy('Favorites')} className="px-4 py-2 bg-gray-700 rounded-lg">
                <Text className={`text-center ${filterBy === 'Favorites' ? 'text-white' : 'text-gray-400'}`}>Favorites</Text>
              </TouchableOpacity>
            </View>
          </View>
          {filteredCryptocurrencies.map((crypto) => (
            <View key={crypto.symbol} className="flex-row justify-between items-center mt-3 bg-gray-800 rounded-lg p-2">
              <View className="flex-row items-center">
                <Image source={{ uri: crypto.logo }} className="w-5 h-5 rounded-full mr-2" />
                <View className="flex-col">
                  <Text className="text-white mr-2">{crypto.symbol}</Text>
                  <Text className="text-gray-400">{crypto.name}</Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <Text className="text-white">${crypto.balance.toFixed(2)}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(crypto.symbol)} className="ml-2">
                  {crypto.favorite ? <FaStar color="yellow" /> : <FaRegStar color="gray" />}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const ActionButton = ({ title }: { title: string }) => (
  <TouchableOpacity className="flex-1 mx-1 p-3 bg-yellow-500 rounded-lg shadow-lg">
    <Text className="text-center text-black font-semibold">{title}</Text>
  </TouchableOpacity>
);
