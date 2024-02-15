import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import GradientBackground from "../../styles/components/GradientBackground.js";
import globalStyleSheet from "../../styles/components/globalStyleSheet.js";
import RegularButtonComponent from "../../components/elements/button/regularButtonComponent.js";
import Colors from "../../styles/colors/colors.js";
import createRecipe from "../../services/recipesServices/createRecipe.js";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  fetchCategories,
  fetchAllCategories,
} from "../../services/productServices/selectProductCategories.js";
import Icon from "react-native-vector-icons/FontAwesome"; // Vous devez installer le package correspondant

const CreateRecipes = () => {
  const initialMount = useRef(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientCategory, setIngredientCategory] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [familiesAndCategories, setFamiliesAndCategories] = useState([]);
  const [selectedFamilyCategories, setSelectedFamilyCategories] = useState([]);
  const [mappedCategories, setMappedCategories] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPreparationTime, setSelectedPreparationTime] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const familiesData = await fetchCategories();
        const categoriesData = await fetchAllCategories();
        setFamiliesAndCategories(familiesData);
        setSelectedCategories(categoriesData);
      } catch (error) {}
    };
    fetchData();
  }, []);

  function filterObjectsByCategoryName(array, categoryName) {
    const filteredObjects = array.filter(
      (obj) => obj.products_family.name_fr === categoryName
    );
    return filteredObjects;
  }

  useEffect(() => {
    console.log("Selected Categories changed:", selectedFamilyCategories);
    const result = filterObjectsByCategoryName(
      selectedCategories,
      selectedFamilyCategories
    );
    setMappedCategories(
      result.map((category) => ({
        label: category.category_name_fr,
        value: category?.category_name_fr,
      }))
    );
  }, [selectedFamilyCategories]);

  const handleCreateRecipe = async () => {
    try {
      const recipeData = {
        title: title,
        description: description,
        instructions: instructions,
        prep_time: prepTime,
        cook_time: cookTime,
        total_time: parseInt(prepTime, 10) + parseInt(cookTime, 10),
        servings: servings,
        ingredients: ingredients,
      };
      console.log(recipeData);
      const data = await createRecipe(recipeData);

      console.log("Recipe created:", data);
      //   // Gérer le succès (par exemple, naviguer vers un écran différent)
    } catch (error) {
      console.error("Error creating recipe:", error);
      // Gérer l'erreur
    }
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      name: ingredientName,
      category: ingredientCategory,
      quantity: ingredientQuantity,
    };

    setIngredients([...ingredients, newIngredient]);

    // Réinitialiser les champs
    setIngredientName("");
    setIngredientCategory("");
    setIngredientQuantity("");
    setSelectedFamily(null);
    setSelectedFamilyCategories([]);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };


  
    const showTimePicker = () => {
      setShowPicker(true);
    };
  
    const handleTimeChange = (event, selectedTime) => {
      setShowPicker(false);
  
      if (selectedTime !== undefined) {
        // Handle the selected time as needed
        setSelectedPreparationTime(selectedTime);
      }
    };

  return (
    <View style={styles.container}>
      <GradientBackground />
      <ScrollView>
        <View style={{ alignItems: "baseline" }}>
          <Text style={styles.textStyle}>Titre de la recette</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.textStyle}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.textStyle}>Temps de préparation</Text>
          <RegularButtonComponent onPress={showTimePicker}>
        <Text>Sélectionnez le temps de préparation</Text>
      </RegularButtonComponent>

      {showPicker && (
        <DateTimePicker
          value={selectedPreparationTime}
          mode="time"
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
          {/* <TextInput
            style={styles.input}
            value={prepTime}
            onChangeText={setPrepTime}
            keyboardType="numeric"
          /> */}

          <Text style={styles.textStyle}>Temps de cuisson</Text>

          <TextInput
            style={styles.input}
            value={cookTime}
            onChangeText={setCookTime}
            keyboardType="numeric"
          />

          <Text style={styles.textStyle}>Nombre de personnes</Text>
          <TextInput
            style={styles.input}
            value={servings}
            onChangeText={setServings}
            keyboardType="numeric"
          />
          <View style={styles.rowsContainer}>
            <Text style={styles.textStyle}>Ajouter un ingrédient</Text>
            <RegularButtonComponent title="+" onPress={handleAddIngredient} />
          </View>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.rowsContainer}>
              <Text
                style={styles.textStyle}
              >{`${ingredient.name} ${ingredient.quantity}`}</Text>
              <Icon
                name="times-circle" // Nom de l'icône de croix
                size={30} // Taille de l'icône
                color="red" // Couleur de l'icône
                onPress={() => handleDeleteIngredient(index)}
              />
            </View>
          ))}

          <Text style={styles.textStyle}>Nom des ingrédients:</Text>
          <TextInput
            style={styles.input}
            value={ingredientName}
            onChangeText={setIngredientName}
          />

          <Text style={styles.textStyle}>Famille d'ingrédients:</Text>
          <RNPickerSelect
            placeholder={{ label: "Select a family", value: null }}
            items={familiesAndCategories.map((item) => ({
              label: item.products_family.name_fr,
              value: item.products_family.name_fr,
            }))}
            onValueChange={(value) => {
              setSelectedFamilyCategories(value);
            }}
          />

          <Text style={styles.textStyle}>catégorie d'ingrédient :</Text>
          <RNPickerSelect
            placeholder={{ label: "Select a category", value: null }}
            items={mappedCategories}
            onValueChange={(value) => setIngredientCategory(value)}
          />

          <Text style={styles.textStyle}>Quantité :</Text>
          <TextInput
            style={styles.input}
            value={ingredientQuantity}
            onChangeText={setIngredientQuantity}
          />

          {/* <Text style={styles.textStyle}>Instructions:</Text>
          <TextInput
            style={styles.multilineInput}
            value={instructions}
            multiline={true}
            numberOfLines={4}
            onChangeText={setInstructions}
          /> */}

          

          <RegularButtonComponent
            title="Créer la recette"
            onPress={handleCreateRecipe}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: Colors.darkBlue,
    fontWeight: "800",
    fontSize: 16,
  },
  subtitle: {
    color: Colors.darkBlue,
    fontWeight: "800",
  },
  button: {
    padding: 40,
  },
  rowsContainer: {
    flexDirection: "row",
    marginRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  textStyle: {
    color: Colors.blue,
    fontSize: 20,
    
    marginLeft: 15,
  },
  labelStyle: {
    color: Colors.blue,
    fontSize: 18,
    fontWeight: "bold",
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
    marginBottom: 25,
  },
  multilineInput: {
    fontSize: 18,
    borderRadius: 4,
    height: 120,
    width: "95%",
    backgroundColor: Colors.blue,
    color: Colors.white,
    elevation: 10,
    marginBottom: 25,
  },
});

export default CreateRecipes;
