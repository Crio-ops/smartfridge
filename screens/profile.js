import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AuthProvider, { useAuth } from "../components/context/UserAuth.js";
import CustomButton from "../components/custom_elements/customButton.js";


export default function Profile({ navigation }) {
  const {user, token, login, logout} = useAuth();


  return (
    <View style={styles.container}>
        <Text>Profile screen</Text>
        <CustomButton
        title={"Se déconnecter"}
        style={styles.buttonStyle}
        onPress={() => logout()}
      ></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C89A7",
    textAlign: "center",
  },
  buttonStyle: {
    fontSize: 18,
    borderColor: "white",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
});