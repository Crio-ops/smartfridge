import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import RegularButtonComponent from "../../components/elements/button/regularButtonComponent.js";
import { useAuth } from "../../components/context/UserAuth.js";
import GradientBackground from "../../styles/components/GradientBackground.js";
import WarningMessageComponent from "../../components/elements/message/warningMessageComponent.js";
import ErrorMessageComponent from "../../components/elements/message/errorMessageComponent.js";
import Colors from '../../styles/colors/colors.js'

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
      const LOCAL_URL = "http://192.168.1.56:3001/routes/users/create";
      console.log(jsonRequest);
      try {
        fetch(LOCAL_URL, {
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
    } else {
      setFormCompletionErrorDisplay(true);
    }
  }

  useEffect(() => {
    // callback when password & repeatedPassword TextInput are checked , return true if OK == Password ready to be send
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
      setCheckPasswordLenghtIsSecure(false); 
    } else {
      setCheckPasswordLenghtIsSecure(true); 
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
          <WarningMessageComponent
            message={"caractères spéciaux requis"}
          />
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
          <ErrorMessageComponent
            style={styles.error}
            message={"Veuillez régler les erreurs avant l'envoi du formulaire"}
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
  button:{
    fontSize:16,
    textAlign:'center',
    marginVertical:5,
  },
  buttonBox: {
    marginTop:5,
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
    color:Colors.white,
    elevation: 10,
  },
});
