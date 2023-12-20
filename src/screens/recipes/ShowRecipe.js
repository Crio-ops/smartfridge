import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import GradientBackground from "../../styles/components/GradientBackground.js";
import globalStyleSheet from "../../styles/components/globalStyleSheet.js";
import { useAuth } from "../../components/context/UserAuth.js";
import Colors from "../../styles/colors/colors.js";
import fetchUserKitchenData from "../../services/productServices/fetchUserKitchenData";
const ShowRecipe = ({ navigation, route }) => {
  const { item } = route.params;
  const { kitchen, user, token } = useAuth();
  const [matching, setMatching] = useState([]);
  let match = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        match = await matchingProduct(item, kitchen);
        // console.log('littleMatch', match[0].littleMatch[0]?.kitchenItem);
        // console.log('LE MATCH',match[0].littleMatch[1])
        setMatching(match);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [item, kitchen]);
  useEffect(() => {
    //  console.log('qd',match)
  }, [matching]);

  const matchingProduct = async (recipe, kitchen) => {
    let littleMatch = [];
    let preciseMatch = [];
    let match = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const category = recipe.ingredients[i].category;
      const name = recipe.ingredients[i].name;
      for (let j = 0; j < kitchen.kitchenData.length; j++) {
        const categoryItem = kitchen.kitchenData[j].category;
        const nameItem = kitchen.kitchenData[j].name;
        if (categoryItem === category || categoryItem === name) {
          if (nameItem === name) {
            preciseMatch.push({
              recipeIngredient: recipe.ingredients[i],
              kitchenItem: kitchen.kitchenData[j],
            });
          }
          littleMatch.push({
            recipeIngredient: recipe.ingredients[i],
            kitchenItem: kitchen.kitchenData[j],
          });
        }
      }
    }
    match.push({
      littleMatch: littleMatch,
      preciseMatch: preciseMatch,
    });
    return match;
  };

  return (
    <View style={globalStyleSheet.container}>
      <GradientBackground />
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{item.title}</Text>
      <Text style={styles.textStyle}>{item.description}</Text>
      <Text style={styles.labelStyle}>Temps de cuisson : </Text>
      <Text style={styles.textStyle}>{item.cook_time} minutes</Text>
      <Text style={styles.labelStyle}>Temps de préparation : </Text>
      <Text style={styles.textStyle}>{item.prep_time} minutes</Text>
      <Text style={styles.labelStyle}>Nombre de personnes : </Text>
      <Text style={styles.textStyle}>{item.servings}</Text>
      <Text style={styles.labelStyle}>Préparation : </Text>
      <Text style={styles.textStyle}>{item.instructions}</Text>
      <Text style={styles.labelStyle}>Ingredients :</Text>
      {item.ingredients.map((ingredient, index) => (
        <Text style={styles.textStyle} key={index}>
          {ingredient.quantity} {ingredient.name}
        </Text>
      ))}

      <Text style={styles.labelStyle}>
        Ingrédients disponibles dans votre cuisine : 
      </Text>
      {matching.map((matchItem, index) => (
        <View key={index}>
          {matchItem.littleMatch.map((ingredientMatch, ingredientIndex) => (
            <View key={ingredientIndex}>
              <View style = {styles.rowsContainer}>
              <Image
                style={styles.tinyLogo}
                source={
                  ingredientMatch.kitchenItem.image
                    ? { uri: ingredientMatch.kitchenItem.image }
                    : require("../../../assets/notFound.png")
                }
              />
                <Text style={styles.textStyle}>
                {ingredientMatch.kitchenItem.name}
              </Text>
              <Text style={styles.textStyle}>
                {ingredientMatch.kitchenItem.quantity}{ingredientMatch.kitchenItem.quantity_unit}
              </Text>
         
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
    marginVertical: 1,
  },
  textStyle: {
    color: Colors.darkBlue,
    fontSize: 18,
    marginLeft:15,
  },
  labelStyle: {
    color: Colors.darkBlue,
    fontSize: 18,
  fontWeight:'bold'
  },
  rowsContainer: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: Colors.darkBlue,
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default ShowRecipe;
