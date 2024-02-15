import { API_URL } from '@env';
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import AuthProvider, { useAuth } from "../../components/context/UserAuth.js";
import React, { useState } from "react";
import Colors from "../../styles/colors/colors.js";
import RegularButtonComponent from "../../components/elements/button/regularButtonComponent.js";
import GradientBackground from "../../styles/components/GradientBackground.js";
import SuccessMessageComponent from "../../components/elements/message/successMessageComponent.js";

// //localization
// import * as Localization from 'expo-localization';
// import i18n from 'i18n-js';
// import { fr, en, nl, de } from '../assets/i18n/supportedLanguages';

// i18n.fallbacks = true;
// i18n.translations = { fr, en, nl, de };
// i18n.locale = Localization.locale;
// //

export default function Login({ navigation, route }) {
  let success = false
   success = route.params
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const { user, setUser, token, setToken, login, logout } = useAuth();



  function getLogin(username, password) {
    let person = {
      username: username,
      password: password,
    };

    let jsonRequest = JSON.stringify(person);

    try {
      fetch(API_URL +  "/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: jsonRequest,
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 500) {
            setServerError(true);
            setLoginError(false);
            throw new Error("internal error" + response.status);
          } else {
            setLoginError(true);
            setServerError(false);
            throw new Error("login error" + response.status);
          }
        })
        .then((json) => {
          console.log(json.request.user)
          setUser(json.request.user)
          const jwtToken = json.request.token;
          login(jwtToken);
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <GradientBackground />
      <Image
        style={{
          width: 150,
          height: 150,
        }}
        source={require("../../../assets/hat.png")}
      />
      <Text style={styles.title}>S'identifier</Text>
      {success && (
        <SuccessMessageComponent
          message={"Compte créé avec succès"}
        ></SuccessMessageComponent>
      )}
      <Text style={styles.label}>Nom de compte</Text>
      <TextInput
        style={styles.input}
        selectionColor={Colors.white}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        onChangeText={(newUsername) => setUsername(newUsername)}
      />
      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        selectionColor={Colors.white}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        onChangeText={(newPassword) => setPassword(newPassword)}
        secureTextEntry={true}
      />
      {loginError && (
        <WarningMessageComponent
          message={" Erreur dans le nom de compte ou le mot de passe."}
        ></WarningMessageComponent>
      )}
      {serverError && (
        <WarningMessageComponent
          message={" Erreur interne, veuillez réessayer plus tard."}
        ></WarningMessageComponent>
      )}
      <View style={styles.buttonBox}>
        <RegularButtonComponent
          title={"Se connecter"}
          style={styles.button}
          onPress={() => getLogin(username, password)}
        ></RegularButtonComponent>
      </View>
      <View style={styles.buttonBox}>
        <RegularButtonComponent
          title={"Créer un compte"}
          style={styles.button}
          onPress={() => navigation.push("CreateAccount")}
        ></RegularButtonComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: Colors.darkBlue,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.darkBlue,
    textAlign: "center",
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    color: Colors.greyBlue,
    marginTop: 20,
    marginBottom: 5,
  },
  button:{
    fontSize:16,
    marginVertical:5,
  },
  buttonBox: {
    marginTop:5,
  },
  input: {
    fontSize: 18,
    borderRadius: 4,
    height: 45,
    width: 230,
    paddingVertical: 6,
    paddingHorizontal: 18,
    backgroundColor: Colors.blue,
    color: Colors.white,
    elevation: 10,
    textAlign: "center",
  },
});
