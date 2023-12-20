import { API_URL } from '@env';

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, RefreshControl, TouchableOpacity  } from "react-native";
import RecipeList from "../../components/RecipeList.js"; 
import { fetchRecipes } from "../../services/recipesServices/fetchRecipes.js";
import GradientBackground from "../../styles/components/GradientBackground.js";
import IconButton from "../../components/elements/button/IconButton.js";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import Colors from "../../styles/colors/colors.js";
const Recipes = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const fetchData = async () => {
    try {
      const data = await fetchRecipes();
      setRecipes(data);
    } catch (error) {
      console.error('Error setting recipes:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <GradientBackground />
      <View style={styles.topContainer}>
      <Text style={styles.header}>Liste de Recettes</Text>
      <RecipeList recipes={recipes}
      fetchRecipes={fetchRecipes}
      navigation={navigation}
      />
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
              navigation.push("CreateRecipes");
            }}
          >
            <Text style={[styles.menuItemText]}>Créer une recette</Text>
          </MenuItem>
          <MenuItem style={styles.menuItem} onPress={hideMenu}>
            <Text style={[styles.menuItemText]}> -- </Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
  button: {
    marginRight: "5%",
    marginBottom: "5%",
    alignSelf: "flex-end",
    zIndex: 1,
  },
});

export default Recipes;
