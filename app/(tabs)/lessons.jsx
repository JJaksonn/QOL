import { Pressable, Text, View } from "react-native";
export default function Lessons() {
  return (
    <View>
      <Text>Temp screen</Text>
      <Pressable onPress={() => router.push("/letters")}>
        <Text>Go to Letters</Text>
      </Pressable>
    </View>
  );
}
