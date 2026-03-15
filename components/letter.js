import React, { useRef } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

const DraggableLetter = ({
  isDraggable = true,
  onPress,
  letter,
  id,
  language,
  onRelease,
  onPositionUpdate,
  initialX = 0,
  initialY = 0,
  letterRef,
}) => {
  const pan = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY }),
  ).current;
  const viewRef = useRef(null);

  if (letterRef) {
    letterRef.current = {
      measure: (callback) => {
        viewRef.current?.measureInWindow((x, y, width, height) => {
          callback({ x, y, width, height });
        });
      },
    };
  }

  const measureAndReport = (callback) => {
    viewRef.current?.measureInWindow((x, y, width, height) => {
      callback({ x, y, width, height });
    });
  };

  const onReleaseRef = useRef(onRelease);
  const onPositionUpdateRef = useRef(onPositionUpdate);
  onReleaseRef.current = onRelease;
  onPositionUpdateRef.current = onPositionUpdate;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        measureAndReport((layout) => {
          onPositionUpdateRef.current(id, language, layout);
          onReleaseRef.current(id, language, layout);
        });
      },
    }),
  ).current;

  const isHebrew = language === "hebrew";

  return (
    <Animated.View
      ref={viewRef}
      style={[
        styles.letter,
        isHebrew ? styles.hebrewLetter : styles.arabicLetter,
        {
          transform: isDraggable
            ? [{ translateX: pan.x }, { translateY: pan.y }]
            : [],
        },
      ]}
      {...(isDraggable ? panResponder.panHandlers : {})}
    >
      <Pressable
        style={styles.pressable}
        onPress={isDraggable ? onPress : undefined}
      >
        <Text style={styles.text}>{letter}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  letter: {
    position: "absolute",
    height: 56,
    width: 56,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  hebrewLetter: {
    backgroundColor: "#4A90D9",
  },
  arabicLetter: {
    backgroundColor: "#E8845A",
  },
  pressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  text: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default DraggableLetter;
