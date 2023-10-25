import { StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/custom_elements/customButton.js";
import AuthProvider ,{ useAuth } from "../components/context/UserAuth.js";


export default function CreateAccount(){
  const {user, token ,setToken, login, logout} = useAuth();
  const [checkPassword, setCheckPassword] = useState(false);
  const [account_name, setAccount_Name] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail_address, setMail_Address] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError]= useState(false)

  function create_account() {
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
          if(json.error != ""){
            console.log(json)
            erreur = json.error
          }else{
            const jwtToken = json.token
            login(jwtToken);
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  //check if double cheking password recieves same string
  const handleCheckPassword = () => {
    if (repeatedPassword != password) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };


    return (
      <View style={styles.container}>
      <ScrollView contentContainerStyle ={{paddingLeft : 50, paddingRight: 50, paddingTop: 100}}>
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
      {error && <Text style = {styles.error}>Cet identifiant est déjà pris</Text>}
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

      <TextInput
        style={[
          styles.input,
          { backgroundColor: checkPassword ? "#C85F5F" : "#D9D9D9" },
        ]}
        underlineColorAndroid="transparent"
        placeholder="Répétez votre mot de passe"
        placeholderTextColor={"#9B9B92"}
        textAlign="center"
        autoCapitalize="none"
        onChangeText={(repeatedPassword) => setRepeatedPassword(repeatedPassword)}
        onKeyPress={handleCheckPassword}
        secureTextEntry={true}
      />
      
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
      marginBottom : 30,
    },
    buttonStyle: {
      fontSize: 18,
      borderRadius: 4,
      paddingVertical: 15,
      textAlign: 'center'
    },
    input: {
      fontSize: 18,
      borderRadius: 4,
      height: 60,
      width: 260,
      paddingVertical: 6,
      paddingHorizontal: 18,
      marginVertical : 5,
      backgroundColor: "#D9D9D9",
      elevation : 10
    },
    error : {
      fontSize: 15,
      borderRadius: 4,
      height: 30,
      width: 260,
      paddingVertical: 6,
      paddingHorizontal: 18,
      marginVertical : 5,
      backgroundColor: "red",
      elevation : 10
    }
  });