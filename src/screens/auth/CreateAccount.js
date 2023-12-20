import { API_URL } from "@env";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import RegularButtonComponent from "../../components/elements/button/regularButtonComponent.js";
import { useAuth } from "../../components/context/UserAuth.js";
import GradientBackground from "../../styles/components/GradientBackground.js";
import WarningMessageComponent from "../../components/elements/message/warningMessageComponent.js";
import ErrorMessageComponent from "../../components/elements/message/errorMessageComponent.js";
import Colors from "../../styles/colors/colors.js";

export default function CreateAccount({ navigation }) {
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
  const [mailAdresseValidCompletion, setMailAdresseValidCompletion] =
    useState(true);
  const [formCompletionErrorDisplay, setFormCompletionErrorDisplay] =
    useState(false);

  function validateForm() {
    return (
      account_name.trim() !== "" &&
      firstname.trim() !== "" &&
      lastname.trim() !== "" &&
      mail_address.trim() !== "" &&
      password.trim() !== "" &&
      repeatedPassword.trim() !== ""
    );
  }

  function isEmailValid(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Return true if the email matches the regular expression, otherwise false
    const result = emailRegex.test(email);
    if (!result) {
      setMailAdresseValidCompletion(false);
      return false;
    } else {
      setMailAdresseValidCompletion(true);
      return true;
    }
  }

  function create_account() {
    if (checkPasswordIsSecure && validateForm()) {
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
        fetch(API_URL + "/users/create", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: jsonRequest,
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            if (json.request.error) {
              if (json.request.state.error === true) {
                console.log(json);
                setError(json.state.error);
              }
            } else {
              navigation.navigate("Login", { success: true });
            }
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      setFormCompletionErrorDisplay(true);
    }
  }

  useEffect(() => {
    isEmailValid(mail_address);
  }, [mail_address]);

  useEffect(() => {
    if (
      checkPasswordLenghtIsSecure === false &&
      checkPasswordCharIsSecure === false &&
      checkSamePassword === false
    ) {
      setCheckPasswordIsSecure(true);
    } else {
      setCheckPasswordIsSecure(false);
    }
  }, [
    checkPasswordLenghtIsSecure,
    checkPasswordCharIsSecure,
    checkSamePassword,
  ]);

  useEffect(() => {
    if (repeatedPassword !== password) {
      setCheckSamePassword(true);
    } else {
      setCheckSamePassword(false);
    }
  }, [repeatedPassword, password]);

  useEffect(() => {
    if (password.length >= 8) {
      setCheckPasswordLenghtIsSecure(false);
    } else {
      setCheckPasswordLenghtIsSecure(true);
    }

    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const containsSpecialCharacter = specialCharacterRegex.test(password);
    if (containsSpecialCharacter) {
      setCheckPasswordCharIsSecure(false);
    } else {
      setCheckPasswordCharIsSecure(true);
    }
  }, [password]);

  return (
    <View style={styles.container}>
      <GradientBackground />
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
          selectionColor={Colors.white}
          underlineColorAndroid="transparent"
          placeholder="Créer votre identifiant"
          placeholderTextColor={Colors.lightGrey}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(account_name) => setAccount_Name(account_name)}
        />

        <TextInput
          style={styles.input}
          selectionColor={Colors.white}
          underlineColorAndroid="transparent"
          placeholder="Nom"
          placeholderTextColor={Colors.lightGrey}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(firstname) => setLastname(firstname)}
        />

        <TextInput
          style={styles.input}
          selectionColor={Colors.white}
          underlineColorAndroid="transparent"
          placeholder="Prénom"
          placeholderTextColor={Colors.lightGrey}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(lastname) => setFirstname(lastname)}
        />

        <TextInput
          style={styles.input}
          selectionColor={Colors.white}
          inputMode="email"
          underlineColorAndroid="transparent"
          placeholder="Adresse e-mail"
          placeholderTextColor={Colors.lightGrey}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(mail_address) => setMail_Address(mail_address)}
        />
        {!mailAdresseValidCompletion && (
          <WarningMessageComponent
            style={styles.error}
            message={"L'adresse e-mail n'est pas valide"}
          />
        )}
        <TextInput
          style={styles.input}
          selectionColor={Colors.white}
          underlineColorAndroid="transparent"
          placeholder="Nouveau mot de passe"
          placeholderTextColor={Colors.lightGrey}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />

        {checkPasswordLenghtIsSecure && (
          <WarningMessageComponent message={"8 caractères minimum requis"} />
        )}
        {checkPasswordCharIsSecure && (
          <WarningMessageComponent message={"caractères spéciaux requis"} />
        )}

        <TextInput
          style={[
            styles.input,
            { backgroundColor: checkSamePassword ? Colors.error : Colors.blue },
          ]}
          selectionColor={Colors.white}
          underlineColorAndroid="transparent"
          placeholder="Répétez votre mot de passe"
          placeholderTextColor={Colors.lightGrey}
          textAlign="center"
          autoCapitalize="none"
          onChangeText={(repeatedPassword) =>
            setRepeatedPassword(repeatedPassword)
          }
          secureTextEntry={true}
        />
        {error && (
          <ErrorMessageComponent
            message={"L'identifiant et/ou l'adresse e-mail sont déjà pris"}
          />
        )}
        {formCompletionErrorDisplay && (
          <WarningMessageComponent
            style={styles.error}
            message={"Veuillez remplir tous les champs"}
          />
        )}
        <View style={styles.buttonBox}>
          <RegularButtonComponent
            title={"Créer le compte"}
            style={styles.button}
            onPress={() => create_account()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.darkBlue,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
  buttonBox: {
    marginTop: 5,
  },
  input: {
    fontSize: 18,
    borderRadius: 4,
    height: 50,
    width: 230,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginVertical: 5,
    backgroundColor: Colors.blue,
    color: Colors.white,
    elevation: 10,
  },
});
