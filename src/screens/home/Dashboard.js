import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/context/UserAuth.js";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

import GradientBackground from "../../styles/components/GradientBackground.js";
import Colors from "../../styles/colors/colors.js";
import IconButton from "../../components/elements/button/IconButton.js";
import RegularButtonComponent from "../../components/elements/button/regularButtonComponent.js";
import fetchUserKitchenData from "../../services/productServices/fetchUserKitchenData";
import updateKitchenName from "../../services/productServices/updateKitchenName";


export default function Dashboard({ navigation }) {
  const [visible, setVisible] = useState(false);
  const { user, setKitchen, kitchen, token } = useAuth();
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const [noKitchenNameYet, setNoKitchenNameYet] = useState(false);
  const [kitchenName, setKitchenName] = useState();

  
  useEffect(() => {
    const fetchData = async () => {
      const kitchenData = await fetchUserKitchenData(user, token);
      if (kitchenData) {
        if (kitchenData.kitchen_name === "") {
          setNoKitchenNameYet(true);
          setKitchen(kitchenData);
        } else {
          setKitchen(kitchenData);
          setKitchenName(kitchenData.kitchen_name);
          setNoKitchenNameYet(false);
        }
      }
    };

    fetchData();
  }, [user, token]);

  const updateKitchenName = async (kitchenName) => {
    const updatedKitchen = await updateKitchenName(kitchenName, user.user_id, token);

    if (updatedKitchen) {
      console.log(updatedKitchen);
      setKitchen(updatedKitchen);
      setKitchenName(updatedKitchen.kitchen_name);
      setNoKitchenNameYet(false);
    }
  };


  if (noKitchenNameYet) {
    return (
      <View style={styles.container}>
        <GradientBackground />
        <View style={styles.topContainer}>
          <Text>user : {user.mail_address}</Text>
          <Text>Bienvenue {user.username} ! </Text>
          <Text>
            Avant toute chose, il faut nommer votre première cuisine !
          </Text>
          <TextInput
            style={styles.input}
            selectionColor={Colors.white}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(newKitchenName) => setKitchenName(kitchenName)}
          />
          <RegularButtonComponent
            title={"valider"}
            style={styles.buttonReg}
            onPress={() => updateKitchenName(kitchenName)}
          ></RegularButtonComponent>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <GradientBackground />
      <View style={styles.topContainer}>
        <Text style={{fontSize:18, textAlign:'center', marginTop:30}}>Bonjour {user.username} ! </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Menu
          style={styles.menuContainer}
          visible={visible}
          anchor={
            <View style={styles.menu}>
              {/* Displayed by the AddButton bellow. Anchor doesn't work very well
              which is why we've separated button and menu This view just allows
              you to adjust the menu great with the button. */}
            </View>
          }
          onRequestClose={hideMenu}
        >
          <MenuItem
            style={styles.menuItem}
            onPress={() => {
              setVisible(false);
              navigation.push("Scanner");
            }}
          >
            <Text style={[styles.menuItemText]}>Scanner un produit</Text>
          </MenuItem>
          <MenuItem
            style={styles.menuItem}
            onPress={() => {
              setVisible(false);
              navigation.push("ShowRecipe");
            }}
          >
            <Text style={[styles.menuItemText]}>Créer un produit</Text>
          </MenuItem>
        </Menu>
      </View>
      <View style={styles.button}>
        <IconButton
          onPress={showMenu}
          source={require("../../../assets/plus.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
  },
  topContainer: {
    flex: 8,
  },
  bottomContainer: {
    flex: 1,
    alignSelf: "flex-end",
    marginRight: "19%",
    marginBottom: "3%",
  },
  menu: {
    height: 50,
    width: 50,
    marginRight: "5%",
  },
  menuContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    borderWidth: 2,
  },
  menuItemText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "800",
  },
  button: {
    marginRight: "5%",
    marginBottom: "5%",
    alignSelf: "flex-end",
    zIndex: 1,
  },
  buttonReg: {
    fontSize: 16,
    marginVertical: 5,
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