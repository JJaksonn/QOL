import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import LessonNode from "../../components/LessonNode";

// Will one day be replaced by data from the DB or some other presaved plan, but until that day...
const lessons = [
  { id: "1", title: "Vocab\nReview", route: "/(tabs)/lessons/vocabReview" },
  { id: "2", title: "Grammar\nReview", route: "/(tabs)/lessons/grammarReview" },
  { id: "3", title: "Listening\nComp", route: "/(tabs)/lessons/listeningComp" },
  { id: "4", title: "Reading\nComp", route: "/(tabs)/lessons/readingComp" },
  { id: "5", title: "Writing\nSkills", route: "/(tabs)/lessons/writingSkills" },
  {
    id: "6",
    title: "Idioms and\nSlangs",
    route: "/(tabs)/lessons/idiomsSlangs",
  },
  {
    id: "7",
    title: "Advanced\nLessons",
    route: "/(tabs)/lessons/advancedLessons",
  },
  { id: "8", title: "Test", route: "/(tabs)/lessons/test" },
];

const getSide = (index) => {
  const pattern = ["left", "center", "right", "center"];
  return pattern[index % pattern.length];
};

const renderItem = ({ item, index }) => (
  <View style={styles.nodeRow}>
    {index > 0 && <View style={styles.connector} />}
    <LessonNode title={item.title} route={item.route} side={getSide(index)} />
  </View>
);

const ListHeader = () => (
  <View style={styles.header}>
    <Text style={styles.heading}>Language Lessons</Text>
    <Text style={styles.subheading}>Follow the path to fluency</Text>
  </View>
);

const ListFooter = () => (
  <View style={styles.finishRow}>
    <Ionicons name="flag" size={32} color="#2A9D8F" />
    <Text style={styles.finishText}>Complete!</Text>
  </View>
);

export default function LanguageLessons() {
  return (
    <View style={styles.page}>
      <View style={styles.dashedLine} />
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F5F0E8",
    position: "relative",
  },
  dashedLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: 2,
    borderLeftWidth: 2,
    borderLeftColor: "#C8C0B0",
    borderStyle: "dashed",
    zIndex: 0,
  },
  listContent: {
    paddingTop: 48,
    paddingBottom: 48,
    zIndex: 1,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 8,
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
    marginBottom: 8,
  },
  nodeRow: {
    alignItems: "stretch",
  },
  connector: {
    alignSelf: "center",
    width: 2,
    height: 12,
    backgroundColor: "#C8C0B0",
  },
  finishRow: {
    alignItems: "center",
    marginTop: 24,
    gap: 6,
  },
  finishText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2A9D8F",
  },
});
