import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import CustomButton from "../components/custom_elements/customButton.js";
import AuthProvider ,{ useAuth } from "../components/context/UserAuth.js";

import React, { useState } from "react";

// //localization
// import * as Localization from 'expo-localization';
// import i18n from 'i18n-js';
// import { fr, en, nl, de } from '../assets/i18n/supportedLanguages';

// i18n.fallbacks = true;
// i18n.translations = { fr, en, nl, de };
// i18n.locale = Localization.locale;
// //

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {user, token ,setToken, login, logout} = useAuth();

  function getLogin(username, password) {
    let person = {
      username: username,
      password: password,
    };
    //créer un objet requete pour l'envoie vers l'Api, attribut type permet de dispatch lors de l'arrivée à l'Api, data [] contient les données du user
  
    let jsonRequest = JSON.stringify(person);

    console.log(jsonRequest);
    try {
      fetch("http://192.168.1.56:3000/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: jsonRequest,
      })
        .then((response) => response.json())
        .then((json) => {
          const jwtToken = json.token
         login(jwtToken);
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 150,
          height: 150,
        }}
        source={require("../assets/chefsmate.png")}
      />
      <Text style={styles.title}>S'identifier</Text>
      {/* <Text style={styles.title}>{i18n.t('welcome')}</Text> */}
      <Text style={styles.label}>Nom de compte</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        onChangeText={(newUsername) => setUsername(newUsername)}
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        onChangeText={(newPassword) => setPassword(newPassword)}
        secureTextEntry={true}
      />

      <CustomButton
        title={"Se connecter"}
        style={styles.buttonStyle}
        onPress={() => getLogin(username, password)}
      ></CustomButton>
      
      <CustomButton
        title={"Créer un compte"}
        style={styles.buttonStyle}
        onPress={() => navigation.push("CreateAccount")}
      ></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6C89A7",
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
  title: {
    fontSize: 36,
    color: "#fff",
    textAlign: "center",
    marginTop : 10,
  },
  label: {
    fontSize: 18,
    color: "#fff",
    marginTop: 20,
    marginBottom: 5,
    
  },
  buttonStyle: {
    fontSize: 18,
    borderColor: "white",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  input: {
    fontSize: 16,
    borderRadius: 4,
    height: 45,
    width: 200,
    paddingVertical: 6,
    paddingHorizontal: 18,
    backgroundColor: "#D9D9D9",
    elevation : 10
  },
});
