import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AuthProvider, { useAuth } from "../../components/context/UserAuth.js";
import { useState } from "react";
import RegularButtonComponent from "../../components/elements/button/regularButtonComponent.js";
import { Picker } from "@react-native-picker/picker";
import GradientBackground from "../../styles/components/GradientBackground.js";
import Colors from "../../styles/colors/colors.js";

export default function CreateRecipes({ navigation }) {
  const { user, token, login, logout } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={styles.container}>
      <GradientBackground />
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    textAlign: "center",
  },
  buttonStyle: {
    fontSize: 18,
    borderRadius: 4,
    paddingVertical: 15,
    textAlign: "center",
  },
});
