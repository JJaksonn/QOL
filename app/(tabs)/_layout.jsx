import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
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
        tabBarActiveTintColor: "#FF8C00",
        tabBarInactiveTintColor: "#8A9BB8",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarBackground: () => <View style={styles.tabBarBackground} />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.activeIconWrapper : null}>
              <Ionicons name="home-outline" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.activeIconWrapper : null}>
              <MaterialCommunityIcons
                name="book-open-outline"
                color={color}
                size={size}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: "Social",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.activeIconWrapper : null}>
              <Ionicons name="people-outline" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About Us",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.activeIconWrapper : null}>
              <Ionicons
                name="information-circle-outline"
                color={color}
                size={size}
              />
            </View>
          ),
        }}
      />

      {/* hidden from navbar but still registered as a tab route */}
      <Tabs.Screen
        name="letters"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="index" //no point in keeping this, no point in deleting
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#0F1729",
    borderTopWidth: 0,
    height: 65,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: "#0F1729",
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  tabItem: {
    paddingVertical: 4,
  },
  activeIconWrapper: {
    backgroundColor: "rgba(255, 140, 0, 0.15)",
    borderRadius: 10,
    padding: 4,
  },
});
