import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function TabsLayout() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2a9d8f",
        tabBarInactiveTintColor: "#555",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#ddd",
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="letters"
        options={{
          title: "Test",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
