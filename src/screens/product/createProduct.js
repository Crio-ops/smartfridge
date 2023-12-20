import { API_URL } from "@env";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity, 
  ScrollView,
  StyleSheet,
} from "react-native";
import Colors from "../../styles/colors/colors.js";
import ImagePicker from "react-native-image-crop-picker";
import RNFS from "react-native-fs";
import RNPickerSelect from "react-native-picker-select";
import GradientBackground from "../../styles/components/GradientBackground";
import globalStyleSheet from "../../styles/components/globalStyleSheet.js";

const CreateProduct = ({ onProductSubmit, route, navigation }) => {
  const { barcode, newProduct } = route.params;
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageData, setImageData] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [categories, setCategories] = useState("");
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [familiesAndCategories, setFamiliesAndCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(""); 
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  useEffect(() => {
    // Mettre à jour l'état du formulaire avec les données du produit
    if (newProduct) {
      setBrand(newProduct.brand || "");
      setName(newProduct.name || "");
      setQuantityUnit(newProduct.quantity_unit || "");
      setQuantity(newProduct.quantity || "");
      // setKeywords(newProduct.keywords ? newProduct.keywords.join(", ") : "");
      setCategories(
        newProduct.categories ? newProduct.categories : ""
      );
      if (newProduct.image) {
        setImageData({ path: newProduct.image });
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URL+"/product/select_products_categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const uniqueFamiliesAndCategories = Array.from(
          new Set(data.map((item) => item.id_family))
        ).map((familyId) => {
          return data.find((item) => item.id_family === familyId);
        });
        setFamiliesAndCategories(uniqueFamiliesAndCategories);
      } catch (error) {
        console.error("Erreur lors de la requête fetch :", error);
      }
    };

    // Appel de la fonction asynchrone au montage du composant
    fetchCategories();
  }, [newProduct]);

  const handleTakePhoto = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      });

      // Update the state with the taken photo data
      setImageData(image);
    } catch (error) {
      console.log("Error taking photo:", error);
    }
  };

  const convertImageToBase64 = async () => {
    try {
      if (!imageData) {
        return null;
      }

      const imagePath = imageData.path;
      const imageBase64 = await RNFS.readFile(imagePath, "base64");
      return imageBase64;
    } catch (error) {
      console.log("Error converting image to base64:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    const imageBase64 = await convertImageToBase64();

    // Check if an image has been selected
    if (!imageBase64 && !newProduct.image) {
      Alert.alert("Attention", "Prennez une photo du produit");
      return;
    }

    // Create a new product object with form values and image data
    const product = {
      code: barcode,
      brands:brand,
      labels: name,
      quantity : quantity + quantityUnit,
      image: imageBase64,
      categories: selectedCategory
    };

    try {
      const response = await fetch(API_URL+
        "/openfoodfacts_api/create_product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
        navigation.push('Scanner')
        console.log("Product added successfully:", product);
        // You may want to reset the form or navigate to a success screen here
      } else {
        // Failed to add the product
        console.error("Error adding product:", response.statusText);
        Alert.alert("Error", "Failed to add the product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  const handleCategoryChange = (value) => {

    if (value === "other") {
      setShowNewCategoryInput(true);
    } else {
      setShowNewCategoryInput(false);
       const categoryName = familiesAndCategories.find(
          (item) => item.id === value
        );
        setSelectedCategory(categoryName.category_name_fr)
      }
  }

  return (
    <View style={styles.container}>
      <GradientBackground />
    <ScrollView >
      <View >
        <Button title="Take a photo" onPress={handleTakePhoto} />

        {imageData && (
          <View>
            <Text>Votre photo</Text>
            <Image
              source={{ uri: imageData.path }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        )}
        <Text style={globalStyleSheet.title}>code barre du produit</Text>
        <Text>{barcode}</Text>

        <Text style={globalStyleSheet.title}>Marque:</Text>
        <TextInput value={brand} onChangeText={setBrand} />

        <Text style={globalStyleSheet.title}>Nom:</Text>
        <TextInput value={name} onChangeText={setName} />

        <Text style={globalStyleSheet.title}>Quantité:</Text>
        <TextInput value={String(quantity)} onChangeText={setQuantity} />

        <Text>Sélectionner une famille de produit: </Text>
        <RNPickerSelect
          placeholder={{ label: "Select a family", value: null }}
          items={familiesAndCategories.map((item) => ({
            label: item.products_family.name_fr,
            value: item.id_family,
          }))}
          onValueChange={(value) => setSelectedFamily(value)}
        />

        {selectedFamily && (
          <>
            <Text>Sélectionner une catégorie de produit: </Text>
            <RNPickerSelect
              placeholder={{ label: "Select a category", value: null }}
              items={[
                ...familiesAndCategories
                  .filter((item) => item.id_family === selectedFamily)
                  .map((item) => ({
                    label: item.category_name_fr,
                    value: item.id,
                  })),
                { label: "Ajouter une nouvelle catégorie", value: "other" }, // Option for adding a new category
              ]}
              onValueChange={handleCategoryChange}
            />
            {showNewCategoryInput && (
              <TextInput
                placeholder="Entrer la nouvelle catégorie"
                value={selectedCategory}
                onChangeText={(text) => setSelectedCategory(text)}

              />
            )}
          </>
        )}

        <Button style={styles.button} title="Enregistrer" onPress={handleSubmit} />
      </View>
    </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    },
    title :{
      color : Colors.darkBlue,
      fontWeight:"800",
      fontSize:16
    },
  subtitle :{
      color : Colors.darkBlue,
      fontWeight:"800",
    },
    button:{
      padding : 40,
    }
    
})

export default CreateProduct;

