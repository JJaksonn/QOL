import { ScrollView, StyleSheet } from "react-native";

export default function RegisterPage() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      {/* Register form goes here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
  },
});
