import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DraggableLetter from "../../components/letter";

const MAX_MISTAKE = 3;

const hebrewLetters = {
  1: "א",
  2: "ב",
  3: "ג",
  4: "ד",
  5: "ו",
  6: "ז",
  7: "מ",
  8: "נ",
  9: "פ",
  10: "ש",
};

const arabicLetters = {
  1: "ا",
  2: "ب",
  3: "ج",
  4: "د",
  5: "و",
  6: "ز",
  7: "م",
  8: "ن",
  9: "ف",
  10: "ش",
};

const generateLetters = (width, boardHeight) => {
  const result = [];
  const placed = [];
  const LETTER_SIZE = 56;
  const MIN_DIST = 70;
  const PADDING = 10;

  for (let i = 1; i <= 10; i++) {
    for (const lang of ["hebrew", "arabic"]) {
      let x,
        y,
        attempts = 0,
        overlaps = true;
      while (overlaps && attempts < 100) {
        x = PADDING + Math.random() * (width - LETTER_SIZE - PADDING * 2);
        y = PADDING + Math.random() * (boardHeight - LETTER_SIZE - PADDING * 2);
        overlaps = placed.some(
          (p) => Math.abs(p.x - x) < MIN_DIST && Math.abs(p.y - y) < MIN_DIST,
        );
        attempts++;
      }
      placed.push({ x, y });
      result.push({
        id: i,
        language: lang,
        letter: lang === "hebrew" ? hebrewLetters[i] : arabicLetters[i],
        x,
        y,
      });
    }
  }
  return result;
};

export default function Letters() {
  const { width } = useWindowDimensions();
  const [letters, setLetters] = useState([]);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [boardHeight, setBoardHeight] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const letterPositions = useRef({});
  const hasGenerated = useRef(false);
  const letterRefs = useRef({});
  const [tutorialVisible, setTutorialVisible] = useState(false);
  const [lostScreenVisible, setLostScreenVisible] = useState(false);

  useEffect(() => {
    setTutorialVisible(true);
  }, []);

  const onBoardLayout = (e) => {
    const newHeight = e.nativeEvent.layout.height;
    setBoardHeight(newHeight);
    if (!hasGenerated.current && width > 0 && newHeight > 0) {
      hasGenerated.current = true;
      const generated = generateLetters(width, newHeight);
      setLetters(generated);
      setMistakeCount(0);
    }
  };

  const updatePosition = (id, language, layout) => {
    letterPositions.current[`${language}-${id}`] = { ...layout, id, language };
  };

  const resetGame = useRef(null);
  resetGame.current = () => {
    setLostScreenVisible(false);
    setModalVisible(false);
    setLetters([]);
    letterPositions.current = {};
    letterRefs.current = {};
    setMistakeCount(0);
    hasGenerated.current = false;
    setTimeout(() => {
      hasGenerated.current = true;
      const generated = generateLetters(width, boardHeight);
      setLetters(generated);
    }, 100);
  };

  const handleMistake = () => {
    setMistakeCount((prev) => {
      const next = prev + 1;
      if (next >= MAX_MISTAKE) {
        setTimeout(() => {
          setLostScreenVisible(true);
        }, 0);
      }
      return next >= MAX_MISTAKE ? 0 : next;
    });
  };

  const handleCorrect = (matchedId) => {
    setLetters((prev) => {
      const filtered = prev.filter((l) => l.id !== matchedId);
      if (filtered.length === 0) {
        setTimeout(() => setModalVisible(true), 0);
      }
      return filtered;
    });
    delete letterPositions.current[`hebrew-${matchedId}`];
    delete letterPositions.current[`arabic-${matchedId}`];
    delete letterRefs.current[`hebrew-${matchedId}`];
    delete letterRefs.current[`arabic-${matchedId}`];
  };

  const checkOverlap = (releasedId, releasedLanguage, releasedLayout) => {
    const releasedKey = `${releasedLanguage}-${releasedId}`;
    const entries = Object.entries(letterPositions.current).filter(
      ([k, e]) => k !== releasedKey && e.language !== releasedLanguage,
    );

    const unmeasuredKeys = Object.keys(letterRefs.current).filter(
      (k) => !letterPositions.current[k] && !k.startsWith(releasedLanguage),
    );

    const runCheck = (positions) => {
      for (const [otherKey, otherEntry] of positions) {
        const isOverlapping = !(
          releasedLayout.x + releasedLayout.width <= otherEntry.x ||
          releasedLayout.x >= otherEntry.x + otherEntry.width ||
          releasedLayout.y + releasedLayout.height <= otherEntry.y ||
          releasedLayout.y >= otherEntry.y + otherEntry.height
        );

        if (isOverlapping) {
          const otherId = otherEntry.id;
          if (releasedId === otherId) {
            handleCorrect(releasedId);
          } else {
            handleMistake();
          }
          return;
        }
      }
    };

    if (unmeasuredKeys.length === 0) {
      runCheck(entries);
      return;
    }

    let measured = 0;
    const freshEntries = [...entries];
    unmeasuredKeys.forEach((key) => {
      letterRefs.current[key].current?.measure((layout) => {
        const [lang, idStr] = key.split("-");
        const id = Number(idStr);
        const entry = { ...layout, id, language: lang };
        letterPositions.current[key] = entry;
        freshEntries.push([key, entry]);
        measured++;
        if (measured === unmeasuredKeys.length) {
          runCheck(freshEntries);
        }
      });
    });
  };

  const tts = (letter, language) => {
    const lang = language === "hebrew" ? "he-IL" : "ar-SA";
    Speech.speak(letter, { language: lang, rate: 1.0 });
  };

  const livesArray = Array.from({ length: MAX_MISTAKE });

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <View style={styles.header}>
        <Text style={styles.title}>Match the Letters</Text>
        <View style={styles.livesRow}>
          {livesArray.map((_, i) => (
            <Text key={i} style={styles.heart}>
              {i < MAX_MISTAKE - mistakeCount ? "❤️" : "🖤"}
            </Text>
          ))}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitle}>You did it!</Text>
            <Text style={styles.modalSubtitle}>
              All letters matched successfully.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.modalButton,
                pressed && styles.modalButtonPressed,
              ]}
              onPress={() => resetGame.current()}
            >
              <Text style={styles.modalButtonText}>Play Again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={lostScreenVisible}
        onRequestClose={() => setLostScreenVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>💔</Text>
            <Text style={styles.modalTitle}>You lost</Text>
            <Text style={styles.modalSubtitle}>
              You made 3 mistakes. Don't worry, you can try again!
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.modalButton,
                pressed && styles.modalButtonPressed,
              ]}
              onPress={() => resetGame.current()}
            >
              <Text style={styles.modalButtonText}>Play Again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={tutorialVisible}
        onRequestClose={() => setTutorialVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>How To Play:</Text>
            <Text style={styles.modalSubtitle}>
              Drag and drop the letters to their matching pair of the other
              language. Tap on a letter to hear its pronunciation. If you make 3
              mistakes, the game will reset.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.modalButton,
                pressed && styles.modalButtonPressed,
              ]}
              onPress={() => setTutorialVisible(false)}
            >
              <Text style={styles.modalButtonText}>Got It!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.board} onLayout={onBoardLayout}>
        {letters.map((l) => {
          const key = `${l.language}-${l.id}`;
          if (!letterRefs.current[key])
            letterRefs.current[key] = { current: null };
          return (
            <DraggableLetter
              key={key}
              letter={l.letter}
              id={l.id}
              language={l.language}
              onPress={() => tts(l.letter, l.language)}
              initialX={l.x}
              initialY={l.y}
              onRelease={checkOverlap}
              onPositionUpdate={updatePosition}
              letterRef={letterRefs.current[key]}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0D8CC",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C2C2C",
  },
  livesRow: {
    flexDirection: "row",
    gap: 4,
  },
  heart: {
    fontSize: 20,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    backgroundColor: "#EDE8DC",
    borderBottomWidth: 1,
    borderBottomColor: "#E0D8CC",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    letterSpacing: 0.5,
  },
  board: {
    flex: 1,
    backgroundColor: "#F5F0E8",
    overflow: "hidden",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "78%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  modalEmoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: "#4A90D9",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  modalButtonPressed: {
    backgroundColor: "#357ABD",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
