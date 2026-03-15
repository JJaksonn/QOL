import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
