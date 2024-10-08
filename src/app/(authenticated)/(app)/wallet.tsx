import { useState } from "react";
import { Image, ScrollView, StyleSheet,Text, TouchableOpacity, View } from "react-native";

import { Layout } from "@/components/layout";

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

export default function WalletScreen() {
  const [cryptocurrencies, setCryptocurrencies] = useState<Crypto[]>(initialCryptocurrencies);
  const [filterBy, setFilterBy] = useState<string>('All'); // Add filter state
  const toggleFavorite = (symbol: string) => {
    setCryptocurrencies(prevCryptos =>
      prevCryptos.map(crypto => crypto.symbol === symbol ? { ...crypto, favorite: !crypto.favorite } : crypto)
    );
  };
  const filteredCryptocurrencies = cryptocurrencies.filter((crypto) => {
    if (filterBy === 'Favorites') {
      return crypto.favorite;
    }
    return true;
  });
  const refreshBalances = () => {
    const updatedBalances = cryptocurrencies.map(crypto => ({
      ...crypto,
      balance: Math.random() * 1000 // Random balance for demo purposes
    }));
    setCryptocurrencies(updatedBalances);
  };
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.totalBalanceText}>Total Balance: $0.00 USD</Text>
          <TouchableOpacity onPress={refreshBalances} style={styles.refreshButton}>
            {/* <FaSync color="black" /> */}
          </TouchableOpacity>
        </View>
        <Text style={styles.pnlText}>Today's PNL: +$0.00</Text>
        <View style={styles.actionButtonsContainer}>
          <ActionButton title="Deposit" />
          <ActionButton title="Withdraw" />
          <ActionButton title="Transfer" />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.balancesHeader}>
            <Text style={styles.balancesText}>Balances</Text>
            <View style={styles.filterButtonsContainer}>
              <TouchableOpacity onPress={() => setFilterBy('All')} style={styles.filterButton}>
                <Text style={[styles.filterButtonText, filterBy === 'All' ? styles.filterButtonTextActive : styles.filterButtonTextInactive]}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterBy('Favorites')} style={styles.filterButton}>
                <Text style={[styles.filterButtonText, filterBy === 'Favorites' ? styles.filterButtonTextActive : styles.filterButtonTextInactive]}>Favorites</Text>
              </TouchableOpacity>
            </View>
          </View>
          {filteredCryptocurrencies.map((crypto) => (
            <View key={crypto.symbol} style={styles.cryptoContainer}>
              <View style={styles.cryptoInfo}>
                <Image source={{ uri: crypto.logo }} style={styles.cryptoLogo} />
                <View style={styles.cryptoTextContainer}>
                  <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
                  <Text style={styles.cryptoName}>{crypto.name}</Text>
                </View>
              </View>
              <View style={styles.cryptoBalanceContainer}>
                <Text style={styles.cryptoBalance}>${crypto.balance.toFixed(2)}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(crypto.symbol)} style={styles.favoriteButton}>
                  {/* {crypto.favorite ? <FaStar color="yellow" /> : <FaRegStar color="gray" />} */}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Layout>
  )
}

const ActionButton = ({ title }: { title: string }) => (
  <TouchableOpacity style={styles.actionButton}>
    <Text style={styles.actionButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalBalanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  refreshButton: {
    borderRadius: 9999,
    backgroundColor: '#facc15',
    padding: 8,
  },
  pnlText: {
    marginBottom: 16,
    fontSize: 14,
    color: '#94a3b8',
  },
  actionButtonsContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollView: {
    marginTop: 16,
  },
  balancesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 8,
  },
  balancesText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    borderRadius: 8,
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButtonText: {
    textAlign: 'center',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  filterButtonTextInactive: {
    color: '#94a3b8',
  },
  cryptoContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: '#1f2937',
    padding: 8,
  },
  cryptoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoLogo: {
    marginRight: 8,
    height: 20,
    width: 20,
    borderRadius: 9999,
  },
  cryptoTextContainer: {
    flexDirection: 'column',
  },
  cryptoSymbol: {
    marginRight: 8,
    color: 'white',
  },
  cryptoName: {
    color: '#94a3b8',
  },
  cryptoBalanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoBalance: {
    color: 'white',
  },
  favoriteButton: {
    marginLeft: 8,
  },
  actionButton: {
    marginHorizontal: 4,
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#facc15',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'black',
  },
});