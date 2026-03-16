import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeTop} edges={["top"]}>
          <View style={styles.topBorder} />
        </SafeAreaView>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeTop: {
    backgroundColor: "#FFFFFF",
  },
  topBorder: {
    height: 1,
    backgroundColor: "#E0D8CC",
  },
});
