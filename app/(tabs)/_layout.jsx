import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const isLearnActive = ["/learn", "/lessons", "/games", "/letters"].some((p) =>
    pathname.startsWith(p),
  );
  const isSocialActive = ["/social", "/profile"].some((p) =>
    pathname.startsWith(p),
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FF8C00",
          tabBarInactiveTintColor: "#8A9BB8",
          tabBarStyle: [
            styles.tabBar,
            {
              height: 58 + (insets.bottom > 0 ? insets.bottom : 8),
              paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
            },
          ],
          tabBarLabelStyle: styles.tabLabel,
          tabBarBackground: () => <View style={styles.tabBarBackground} />,
        }}
      >
        {/* Visible nav items */}

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
            tabBarIcon: ({ color, size, focused }) => {
              const active = focused || isLearnActive;
              return (
                <View style={active ? styles.activeIconWrapper : null}>
                  <MaterialCommunityIcons
                    name="book-open-outline"
                    color={active ? "#FF8C00" : "#8A9BB8"}
                    size={size}
                  />
                </View>
              );
            },
            tabBarLabelStyle: isLearnActive
              ? { ...styles.tabLabel, color: "#FF8C00" }
              : styles.tabLabel,
          }}
        />

        <Tabs.Screen
          name="social"
          options={{
            title: "Social",
            tabBarIcon: ({ color, size, focused }) => {
              const active = focused || isSocialActive;
              return (
                <View style={active ? styles.activeIconWrapper : null}>
                  <Ionicons
                    name="people-outline"
                    color={active ? "#FF8C00" : "#8A9BB8"}
                    size={size}
                  />
                </View>
              );
            },
            tabBarLabelStyle: isSocialActive
              ? { ...styles.tabLabel, color: "#FF8C00" }
              : styles.tabLabel,
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

        {/* Hidden — children of Learn tab */}
        <Tabs.Screen name="games" options={{ href: null }} />
        <Tabs.Screen name="letters" options={{ href: null }} />
        <Tabs.Screen name="lessons" options={{ href: null }} />

        {/* Hidden — children of Social tab */}
        <Tabs.Screen name="profile" options={{ href: null }} />

        {/* Hidden — misc */}
        <Tabs.Screen name="index" options={{ href: null }} />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#0F1729",
    borderTopWidth: 0,
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
  activeIconWrapper: {
    backgroundColor: "rgba(255, 140, 0, 0.15)",
    borderRadius: 10,
    padding: 4,
  },
});
