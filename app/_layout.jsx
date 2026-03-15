import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeAreaView>
    </AuthProvider>
  );
}
