import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import GradientBackground from "../styles/components/GradientBackground";
import Colors from "../styles/colors/colors.js";
import PlusButton from "../components/elements/button/plusButton.js";
export default function Dashboard({ navigation }) {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <View style={styles.container}>
      <GradientBackground />
      <View style={styles.topContainer}></View>
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
          <MenuItem style={styles.menuItem} onPress={hideMenu}>
            <Text style={[styles.menuItemText]}>Créer un produit</Text>
          </MenuItem>
        </Menu>
      </View>
      <View style={styles.button}>
      <PlusButton 
      onPress={showMenu}
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
    alignSelf:"flex-end",
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
    borderWidth:2,
  },
  menuItemText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "800",
  },
  button:{
    marginRight: "5%",
    marginBottom: "5%",
    alignSelf:'flex-end',
    zIndex:1,
  }
});
