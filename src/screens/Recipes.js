import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import GradientBackground from "../styles/components/GradientBackground";

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <GradientBackground />
      <Text>Recipes screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C89A7",
    textAlign: "center",
  },
});
