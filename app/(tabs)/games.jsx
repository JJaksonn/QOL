import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

//Letter Matching Preview
const LetterMatchingPreview = () => (
  <View style={preview.lmContainer}>
    {[
      { letter: "א", color: "#4A90D9" },
      { letter: "ب", color: "#E8845A" },
      { letter: "ב", color: "#4A90D9" },
      { letter: "ا", color: "#E8845A" },
      { letter: "ג", color: "#4A90D9" },
      { letter: "ت", color: "#E8845A" },
    ].map((item, i) => (
      <View
        key={i}
        style={[
          preview.lmTile,
          { backgroundColor: item.color, top: i % 2 === 0 ? 0 : 18 },
        ]}
      >
        <Text style={preview.lmLetter}>{item.letter}</Text>
      </View>
    ))}
  </View>
);

//Word Games Preview
const WordGamesPreview = () => {
  const tiles = ["ש", "ל", "?", "ו", "ם"];
  return (
    <View style={preview.wgContainer}>
      <View style={{ flexDirection: "row" }}>
        {tiles.map((char, i) => (
          <View
            key={i}
            style={[preview.wgTile, char === "?" && preview.wgTileBlank]}
          >
            <Text
              style={[preview.wgLetter, char === "?" && preview.wgLetterBlank]}
            >
              {char}
            </Text>
          </View>
        ))}
      </View>
      <Text style={preview.wgHintText}>Fill in the missing letter</Text>
    </View>
  );
};

//Memory Game Preview
const MemoryGamePreview = () => {
  const cards = [
    { flipped: true, matched: true, letter: "א" },
    { flipped: false, matched: false, letter: "" },
    { flipped: false, matched: false, letter: "" },
    { flipped: true, matched: true, letter: "א" },
    { flipped: false, matched: false, letter: "" },
    { flipped: false, matched: false, letter: "" },
  ];
  return (
    <View style={preview.mgGrid}>
      {cards.map((card, i) => (
        <View
          key={i}
          style={[
            preview.mgCard,
            card.flipped && card.matched && preview.mgCardMatched,
            !card.flipped && preview.mgCardHidden,
          ]}
        >
          {card.flipped ? (
            <Text style={preview.mgLetter}>{card.letter}</Text>
          ) : (
            <MaterialCommunityIcons name="help" size={16} color="#8A9BB8" />
          )}
        </View>
      ))}
    </View>
  );
};

const games = [
  {
    title: "Letter Matching",
    subtitle: "Match Hebrew & Arabic equivalents",
    route: "/(tabs)/letters",
    preview: <LetterMatchingPreview />,
    accent: "#4A90D9",
  },
  {
    title: "Word Games",
    subtitle: "Build your vocabulary",
    route: "/(tabs)/wordGames",
    preview: <WordGamesPreview />,
    accent: "#2A9D8F",
  },
  {
    title: "Memory Game",
    subtitle: "Train your memory with pairs",
    route: "/(tabs)/memoryGame",
    preview: <MemoryGamePreview />,
    accent: "#FF8C00",
  },
];

export default function GameHub() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.heading}>Game Hub</Text>
      <Text style={styles.subheading}>Learn through play</Text>

      {games.map((game) => (
        <Pressable
          key={game.route}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => router.push(game.route)}
        >
          <View
            style={[styles.previewArea, { borderBottomColor: game.accent }]}
          >
            {game.preview}
          </View>

          <View style={styles.labelStrip}>
            <View
              style={[styles.accentBar, { backgroundColor: game.accent }]}
            />
            <View style={styles.labelText}>
              <Text style={styles.cardTitle}>{game.title}</Text>
              <Text style={styles.cardSubtitle}>{game.subtitle}</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color="#aaa"
            />
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
  previewArea: {
    height: 120,
    backgroundColor: "#F0EDE8",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
  },
  labelStrip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  accentBar: {
    width: 4,
    height: 36,
    borderRadius: 2,
    marginRight: 12,
  },
  labelText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F1729",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
});

const preview = StyleSheet.create({
  lmContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingHorizontal: 16,
  },
  lmTile: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  lmLetter: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
  },

  wgContainer: {
    alignItems: "center",
    gap: 6,
  },
  wgTile: {
    width: 38,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#4A90D9",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },
  wgTileBlank: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#4A90D9",
    borderStyle: "dashed",
  },
  wgLetter: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  wgLetterBlank: {
    color: "#4A90D9",
  },
  wgHint: {
    position: "absolute",
    bottom: -18,
  },
  wgHintText: {
    fontSize: 10,
    color: "#aaa",
  },
  wgRow: {
    flexDirection: "row",
  },

  mgGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 156,
    gap: 6,
  },
  mgCard: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  mgCardHidden: {
    backgroundColor: "#0F1729",
  },
  mgCardMatched: {
    backgroundColor: "#2A9D8F",
  },
  mgLetter: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
  },
});
