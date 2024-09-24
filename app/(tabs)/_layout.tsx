import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import the icon set

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFD700", // Gold color for the active tab
        tabBarInactiveTintColor: "gray",  // Gray for inactive tabs
        tabBarStyle: { backgroundColor: "#1E293B" }, // Dark tab bar background
        headerStyle: { backgroundColor: "#1E293B" },
        headerTitleStyle: { color: "#FFFFFF", fontWeight: "bold", fontSize: 18 },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Markets Tab */}
      <Tabs.Screen
        name="market"
        options={{
          title: "Markets",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Trades Tab */}
      <Tabs.Screen
        name="trade"
        options={{
          title: "Trades",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Futures Tab */}
      <Tabs.Screen
        name="futures"
        options={{
          title: "Futures",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Wallet Tab */}
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
