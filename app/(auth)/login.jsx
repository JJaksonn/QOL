import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const { error: authError } = await login(email, password);
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    router.replace("/");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError(null);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError(null);
          }}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Signing in..." : "Login"}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.push("/register")}>
          <Text style={styles.registerLink}>
            Don't have an account?{" "}
            <Text style={styles.registerLinkBold}>Register</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: "#F5F0E8",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#F5F0E8",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#2C2C2C",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0D8CC",
  },
  error: {
    color: "#D64045",
    fontSize: 13,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  button: {
    backgroundColor: "#4A90D9",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  buttonPressed: {
    backgroundColor: "#357ABD",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  registerLink: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
  },
  registerLinkBold: {
    color: "#4A90D9",
    fontWeight: "600",
  },
});
