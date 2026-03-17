import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function LessonNode({ title, route, side = "left" }) {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.node,
        side === "left" && styles.nodeLeft,
        side === "center" && styles.nodeCenter,
        side === "right" && styles.nodeRight,
        pressed && styles.nodePressed,
      ]}
      onPress={() => router.push(route)}
    >
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  node: {
    backgroundColor: "#2A9D8F",
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 20,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    borderBottomWidth: 5,
    borderBottomColor: "#1B7A6E",
    borderRightWidth: 2,
    borderRightColor: "#1B7A6E",
    shadowColor: "#1B7A6E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  nodeLeft: {
    alignSelf: "flex-start",
    marginLeft: 24,
  },
  nodeCenter: {
    alignSelf: "center",
  },
  nodeRight: {
    alignSelf: "flex-end",
    marginRight: 24,
  },
  nodePressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  label: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
});
