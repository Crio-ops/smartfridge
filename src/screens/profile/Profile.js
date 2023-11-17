import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AuthProvider, { useAuth } from "../../components/context/UserAuth.js";
import RegularButtonComponent from "../../components/elements/button/regularButtonComponent.js";
import { LinearGradient } from "expo-linear-gradient";
import GradientBackground from '../../styles/components/GradientBackground.js'; 
import Colors from "../../styles/colors/colors.js";

export default function Profile({ navigation }) {
  const {user, token, login, logout} = useAuth();


  return (
    <View style={styles.container}>
     <GradientBackground />
        <Text>Profile screen</Text>
        <RegularButtonComponent
        title={"Se déconnecter"}
        style={styles.buttonStyle}
        onPress={() => logout()}
      ></RegularButtonComponent>
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