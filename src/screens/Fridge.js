import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import GradientBackground from "../styles/components/GradientBackground.js";
import FridgeComponents from "../components/FridgeComponents.js";
import Colors from "../styles/colors/colors.js"
export default function Fridge({ navigation }) {
  const fridgeFoodObj = [
    { id: 0, name: "jambon" },
    { id: 1, name: "orange" },
    { name: "boisson", id: 2 },
    { name: "legumes", id: 3 },
  ];

  return (
    <View style={styles.container}>
      <GradientBackground />
      <FridgeComponents label="frigo" items={fridgeFoodObj} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
  },
});
