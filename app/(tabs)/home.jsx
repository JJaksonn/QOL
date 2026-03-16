import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

//tips and quotes will eventually be pulled from a DB in supabase. but eventually might be in a while...
const tips = [
  { fact: "Arabic is written right to left and has 28 letters.", emoji: "📖" },
  {
    fact: "Hebrew and Arabic share Semitic roots — many words are surprisingly similar.",
    emoji: "🔤",
  },
  {
    fact: "The Arabic letter ع (Ayin) has no equivalent sound in English.",
    emoji: "🗣️",
  },
  {
    fact: "Hebrew is one of the few languages successfully revived as a spoken tongue.",
    emoji: "✨",
  },
  {
    fact: "Both Arabic and Hebrew use a consonantal alphabet — vowels are often implied.",
    emoji: "🔡",
  },
  {
    fact: "The word 'Shalom' in Hebrew and 'Salaam' in Arabic both mean peace.",
    emoji: "🕊️",
  },
  {
    fact: "Arabic has a dual form — a special grammatical form just for pairs of things.",
    emoji: "👥",
  },
];

const quotes = [
  "A different language is a different vision of life.",
  "To learn a language is to have one more window from which to look at the world.",
  "Language is the road map of a culture.",
  "The limits of my language mean the limits of my world.",
  "One language sets you in a corridor for life. Two languages open every door along the way.",
];

const getDailyIndex = (length) => {
  const day = new Date().getDate();
  return day % length;
};

export default function Home() {
  const { session } = useAuth();
  const displayName = session?.user?.user_metadata?.displayName || "there";
  const tip = tips[getDailyIndex(tips.length)];
  const quote = quotes[getDailyIndex(quotes.length)];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {/* greeting */}
      <View style={styles.greetingCard}>
        <Text style={styles.greeting}>{getGreeting()},</Text>
        <Text style={styles.name}>{displayName} 👋</Text>
        <Text style={styles.greetingSubtitle}>Ready to practice today?</Text>
      </View>

      {/* quote */}
      <View style={styles.quoteCard}>
        <MaterialCommunityIcons
          name="format-quote-open"
          size={28}
          color="#4A90D9"
          style={styles.quoteIcon}
        />
        <Text style={styles.quoteText}>{quote}</Text>
      </View>

      {/* daily tip */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bulb-outline" size={18} color="#FF8C00" />
          <Text style={styles.sectionTitle}>Did you know?</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipEmoji}>{tip.emoji}</Text>
          <Text style={styles.tipText}>{tip.fact}</Text>
        </View>
      </View>

      {/* stats */}
      {/* currently empty but I stillwanted to create a feel of a professional app */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="stats-chart-outline" size={18} color="#2A9D8F" />
          <Text style={styles.sectionTitle}>Your Progress</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>—</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statValue}>—</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🎯</Text>
            <Text style={styles.statValue}>—</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: "#F5F0E8",
    padding: 24,
    paddingTop: 48,
    gap: 20,
  },
  greetingCard: {
    backgroundColor: "#0F1729",
    borderRadius: 20,
    padding: 24,
  },
  greeting: {
    fontSize: 16,
    color: "#8A9BB8",
    fontWeight: "500",
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 2,
    marginBottom: 8,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: "#8A9BB8",
  },
  quoteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#4A90D9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  quoteIcon: {
    marginBottom: 8,
  },
  quoteText: {
    fontSize: 15,
    color: "#2C2C2C",
    fontStyle: "italic",
    lineHeight: 22,
  },
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F1729",
  },
  tipCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  tipEmoji: {
    fontSize: 28,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#444",
    lineHeight: 21,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  statEmoji: {
    fontSize: 22,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F1729",
  },
  statLabel: {
    fontSize: 11,
    color: "#888",
    fontWeight: "500",
  },
});
