import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const teamMembers = [
  {
    name: "Ghena",
    role: "Product Manager",
    emoji: "🤝",
  },
  {
    name: "Chris",
    role: "User Experience Lead",
    emoji: "🔍",
  },
  {
    name: "Rayan",
    role: "Design & UI Lead",
    emoji: "🎨",
  },
  {
    name: "Yoav",
    role: "Lead Developer",
    emoji: "👾",
  },
  {
    name: "Guy",
    role: "Lead Developer",
    emoji: "👾",
  },
];

const values = [
  {
    emoji: "🌍",
    title: "Connection First",
    body: "We believe language learning is most powerful when it brings real people together.",
  },
  {
    emoji: "🎮",
    title: "Learning Through Play",
    body: "Games and challenges make the process enjoyable, not a chore.",
  },
  {
    emoji: "🕊️",
    title: "Bridging Cultures",
    body: "Arabic and Hebrew share deep roots. We think that's worth celebrating.",
  },
];

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      {/* hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>🌐</Text>
        <Text style={styles.heroTitle}>About Us</Text>
        <Text style={styles.heroSubtitle}>
          We're five students in the MEET program who believe that language is
          one of the most human things there is, and that learning one should
          feel that way too.
        </Text>
      </View>

      {/* mission */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Why We Built This</Text>
        <Text style={styles.cardBody}>
          This app started as a demo project, but the idea behind it is genuine.
          Arabic and Hebrew are two of the world's oldest languages, spoken by
          millions of people who live side by side. We wanted to build something
          that makes it a little easier, and a little more fun, to understand
          each other.
        </Text>
        <Text style={styles.cardBody}>
          By matching learners with native speakers and wrapping lessons in
          games and conversation, we hope learning feels less like studying and
          more like making a friend.
        </Text>
      </View>

      {/* values */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What We Believe</Text>
        {values.map((v, i) => (
          <View key={i} style={styles.valueRow}>
            <Text style={styles.valueEmoji}>{v.emoji}</Text>
            <View style={styles.valueText}>
              <Text style={styles.valueTitle}>{v.title}</Text>
              <Text style={styles.valueBody}>{v.body}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* team */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>The Team</Text>
        {teamMembers.map((member, i) => (
          <View key={i} style={styles.teamCard}>
            <Text style={styles.teamEmoji}>{member.emoji}</Text>
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{member.name}</Text>
              <Text style={styles.teamRole}>{member.role}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* footer note */}
      <View style={styles.footer}>
        <Ionicons name="heart" size={16} color="#E8845A" />
        <Text style={styles.footerText}>
          Built with care as a mockup startup.
        </Text>
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
    gap: 24,
  },
  hero: {
    alignItems: "center",
    paddingVertical: 8,
  },
  heroEmoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F1729",
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 23,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F1729",
  },
  cardBody: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F1729",
  },
  valueRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    gap: 14,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  valueEmoji: {
    fontSize: 26,
    marginTop: 2,
  },
  valueText: {
    flex: 1,
    gap: 4,
  },
  valueTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F1729",
  },
  valueBody: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
  teamRow: {
    flexDirection: "row",
    gap: 12,
  },
  teamCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  teamEmoji: {
    fontSize: 32,
  },
  teamName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F1729",
  },
  teamRole: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    lineHeight: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingBottom: 8,
  },
  footerText: {
    fontSize: 13,
    color: "#888",
  },
  teamCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  teamEmoji: {
    fontSize: 32,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F1729",
  },
  teamRole: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
});
