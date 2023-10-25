import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Settings({ navigation }) {



  return (
    <View style={styles.container}>
        <Text>Settings screen</Text>
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