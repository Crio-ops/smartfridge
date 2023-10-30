import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../components/custom_elements/customButton.js";
import AuthProvider, { useAuth } from "../components/context/UserAuth.js";

export default function CreateAccount() {
  const { user, token, setToken, login, logout } = useAuth();
  const [checkPasswordIsSecure, setCheckPasswordIsSecure] = useState(false);
  const [checkSamePassword, setCheckSamePassword] = useState(false);
  const [checkPasswordLenghtIsSecure, setCheckPasswordLenghtIsSecure] =
    useState(true);
  const [checkPasswordCharIsSecure, setCheckPasswordCharIsSecure] =
    useState(true);
  const [account_name, setAccount_Name] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail_address, setMail_Address] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState(false);
  const [formCompletionErrorDisplay, setFormCompletionErrorDisplay] =
    useState(false);

  function create_account() {
    if (checkPasswordIsSecure) {
      let person = {
        account_name: account_name,
        password: password,
        mail_address: mail_address,
        firstname: firstname,
        lastname: lastname,
      };

      let jsonRequest = JSON.stringify(person);

      console.log(jsonRequest);
      try {
        fetch("http://192.168.1.56:3000/api/users/create", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: jsonRequest,
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.request.state.error === true) {
              console.log(json);
              setError(json.state.error);
            } else {
              const jwtToken = json.request.token;
              login(jwtToken);
            }
          });
      } catch (error) {
        console.error(error);
      }
    }else{
      setFormCompletionErrorDisplay(true)
    }
  }

  useEffect(() => {
    // callback when password & repeatedPassword TextInput are checked , return true if OK == Password ready to be send
    if (
      checkPasswordLenghtIsSecure === false &&
      checkPasswordCharIsSecure === false &&
      checkSamePassword === false
    ) {
      setCheckPasswordIsSecure(true)
    } else {
      setCheckPasswordIsSecure(false)
    }
  }, [
    checkPasswordLenghtIsSecure,
    checkPasswordCharIsSecure,
    checkSamePassword,
  ]);

  //check if password && repeated password recieves same string

  useEffect(() => {
    if (repeatedPassword != password) {
      setCheckSamePassword(true);
    } else {
      setCheckSamePassword(false);
    }
  }, [repeatedPassword, password]);

  useEffect(() => {
    //check if the password string is secure (length > 8 && use of specials characters)
    // const handleCheckPasswordLengthIsSecure = () => {
    if (password.length >= 8) {
      setCheckPasswordLenghtIsSecure(false); // Longueur suffisante, arrière-plan normal
    } else {
      setCheckPasswordLenghtIsSecure(true); // Longueur insuffisante, arrière-plan différent
    }

    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const containsSpecialCharacter = specialCharacterRegex.test(password);
    if (containsSpecialCharacter === true) {
      setCheckPasswordCharIsSecure(false);
    } else {
      setCheckPasswordCharIsSecure(true);
    }
    // };
  }, [password]);
  //check if the password string is secure (use of specials characters)

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingTop: 100,
        }}
      >
        <Text style={styles.title}>Créer un compte</Text>

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Créer votre identifiant"
          placeholderTextColor={"#9B9B92"}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(account_name) => setAccount_Name(account_name)}
        />
      
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Nom"
          placeholderTextColor={"#9B9B92"}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(firstname) => setLastname(firstname)}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Prénom"
          placeholderTextColor={"#9B9B92"}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(lastname) => setFirstname(lastname)}
        />

        <TextInput
          style={styles.input}
          inputMode="email"
          underlineColorAndroid="transparent"
          placeholder="Adresse e-mail"
          placeholderTextColor={"#9B9B92"}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(mail_address) => setMail_Address(mail_address)}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Nouveau mot de passe"
          placeholderTextColor={"#9B9B92"}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />

        {checkPasswordLenghtIsSecure && (
          <Text style={styles.warning}>8 caractères minimum requis</Text>
        )}
        {checkPasswordCharIsSecure && (
          <Text style={styles.warning}>Utilisez des caractères spéciaux</Text>
        )}

        <TextInput
          style={[
            styles.input,
            { backgroundColor: checkSamePassword ? "#C85F5F" : "#D9D9D9" },
          ]}
          underlineColorAndroid="transparent"
          placeholder="Répétez votre mot de passe"
          placeholderTextColor={"#9B9B92"}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(repeatedPassword) =>
            setRepeatedPassword(repeatedPassword)
          }
          secureTextEntry={true}
        />
          {error && (
          <Text style={styles.error}>L'identifiant et/ou l'adresse e-mail sont déjà pris</Text>
        )}
        {formCompletionErrorDisplay && (
          <Text style={styles.error}>
            Veuillez régler les erreurs avant l'envoi du formulaire
          </Text>
        )}
        <CustomButton
          title={"Valider"}
          style={styles.buttonStyle}
          onPress={() => create_account()}
        />
      </ScrollView>
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
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonStyle: {
    fontSize: 18,
    borderRadius: 4,
    paddingVertical: 15,
    textAlign: "center",
  },
  input: {
    fontSize: 18,
    borderRadius: 4,
    height: 60,
    width: 260,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginVertical: 5,
    backgroundColor: "#D9D9D9",
    elevation: 10,
  },
  error: {
    fontSize: 15,
    borderRadius: 4,
    width: 260,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginVertical: 5,
    backgroundColor: "red",
    elevation: 10,
  },
  warning: {
    fontSize: 15,
    borderRadius: 4,
    height: 30,
    width: 260,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginVertical: 5,
    backgroundColor: "orange",
    elevation: 10,
  },
});
