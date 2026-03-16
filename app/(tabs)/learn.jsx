import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const cards = [
  {
    title: "Language Lessons",
    subtitle: "Grammar, vocabulary & more",
    route: "/(tabs)/lessons",
    icon: <MaterialCommunityIcons name="translate" size={28} color="#4A90D9" />,
    iconBg: "#EBF3FB",
    pattern: ["א", "ب", "ב", "ا", "ג", "ت", "ד", "ث"],
  },
  {
    title: "Game Hub",
    subtitle: "Learn through play",
    route: "/(tabs)/games",
    icon: (
      <MaterialCommunityIcons
        name="controller-classic-outline"
        size={28}
        color="#FF8C00"
      />
    ),
    iconBg: "rgba(255,140,0,0.12)",
    pattern: ["🎮", "⭐", "🎯", "🏆", "🎮", "⭐", "🎯", "🏆"],
  },
  {
    title: "Cultural Lessons",
    subtitle: "Traditions, history & society",
    route: "/(tabs)/culturalLessons",
    icon: <MaterialCommunityIcons name="earth" size={28} color="#2A9D8F" />,
    iconBg: "rgba(42,157,143,0.12)",
    pattern: ["🕌", "✡️", "🌙", "⭐", "🕍", "🌍", "🕌", "✡️"],
  },
];

export default function LearnHub() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.heading}>Learning Hub</Text>
      <Text style={styles.subheading}>What would you like to explore?</Text>
      {cards.map((card) => (
        <Pressable
          key={card.route}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => router.push(card.route)}
        >
          <View style={styles.patternArea}>
            {card.pattern.map((char, i) => (
              <Text
                key={i}
                style={[styles.patternChar, { opacity: 0.08 + (i % 3) * 0.04 }]}
              >
                {char}
              </Text>
            ))}
            <View style={[styles.iconBox, { backgroundColor: card.iconBg }]}>
              {card.icon}
            </View>
          </View>

          <View style={styles.labelStrip}>
            <View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: "#F5F0E8",
    padding: 24,
    paddingTop: 48,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F1729",
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: "#888",
    marginBottom: 28,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  patternArea: {
    height: 130,
    backgroundColor: "#D8D8D8",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    padding: 12,
    position: "relative",
  },
  patternChar: {
    fontSize: 32,
    color: "#333",
    margin: 6,
  },
  iconBox: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  labelStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F1729",
    lineHeight: 22,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
});
