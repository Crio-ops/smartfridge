import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Colors from "../../../styles/colors/colors.js";
import useScannedProductController from "./scannedProductController.js";
import RegularButtonComponent from "../../../components/elements/button/regularButtonComponent.js";
import globalStyleSheet from "../../../styles/components/globalStyleSheet.js";
import { fetchCategories } from "../../../services/productServices/selectProductCategories.js";

const ScannedProduct = ({
  brand,
  image,
  name,
  categories,
  quantity,
  quantity_unit,
  updateCategory,
  saveProductInKitchen,
}) => {
  const { isSlicedProduct, setIsSlicedProduct } = useScannedProductController();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [familiesAndCategories, setFamiliesAndCategories] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const categoriesData = await fetchCategories();
          setFamiliesAndCategories(categoriesData);

        } catch (error) {
 
        }
      };
      fetchData();
    }, []);
  

  const renderCategorySelector = () => {

    useEffect(() => {
      if (categories.match === true) {

        const categoriesText = categories.categories.map((category) => category.category_name_fr).join(", ");
        setSelectedCategory(categoriesText);
        updateCategory = selectedCategory
      }
    }, [categories.match, categories.categories]);


    if (categories.match) {
      // No RNPicker for family if there is a match
      return (
        <>
         <View style={styles.rowsContainer}>
          <Text style={styles.text}>Catégories :</Text> 
          <Text style={styles.text}>{selectedCategory}</Text>
          </View>
          <RegularButtonComponent
             onPress={() => saveProductInKitchen(selectedCategory)} 
            title="Ajouter en cuisine"
            style={styles.button}
          />
        </>
      );
    } else {
      // RNPicker for family and categories if there is no match
      return (
        <>
          <Text>Sélectionner une famille de produit: </Text>
          <RNPickerSelect
            placeholder={{ label: "Select a family", value: null }}
            items={familiesAndCategories.map((item) => ({
              label: item.products_family.name_fr,
              value: item.id_family,
            }))}
            onValueChange={(value) => setSelectedFamily(value)}
          />
          <Text style={styles.text}>Catégorie :</Text>
          <RNPickerSelect
            value={selectedCategory}
            onValueChange={(value, index) => {
              setSelectedCategory(value);
              updateCategory(value);
            }}
            items={categories.categories.map((category, index) => ({
              label: category,
              value: category,
              key: index,
            }))}
          />
          <RegularButtonComponent
            onPress={() => saveProductInKitchen(selectedCategory, selectedFamily)} 
            title="Ajouter en cuisine"
            style={styles.button}
          />
        </>
      );
    }
  };

  return (
    <View>
      <View style={styles.productInfo}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.tinyLogo}
            source={
              image
                ? { uri: image }
                : require("../../../../assets/notFound.png")
            }
          />
        </View>
        <View>
          <Text
            style={[
              globalStyleSheet.title,
              { fontSize: 25, textAlign: "center" },
            ]}
          >
            {name}
          </Text>
          <View style={styles.rowsContainer}>
            <Text style={styles.text}>Marque:</Text>
            <Text style={[styles.text, { textAlign: "right" }]}>{brand}</Text>
          </View>
          <View style={styles.rowsContainer}>
            <Text style={styles.text}>Quantité :</Text>
            <Text style={[styles.text, { textAlign: "right" }]}>
              {quantity}{quantity_unit}
            </Text>
          </View>

          {renderCategorySelector()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productInfo: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  imageContainer: {
    alignItems: "center",
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  rowsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: Colors.darkBlue,
    paddingBottom: 10,
    paddingTop: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    color: Colors.darkBlue,
  },
  textInput: {
    fontSize: 15,
    borderRadius: 4,
    height: 45,
    width: 230,
    paddingVertical: 6,
    paddingHorizontal: 18,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.darkBlue,
    elevation: 10,
    textAlign: "center",
  },
  button: {
    // Add button styling if needed
  },
});

export default ScannedProduct;
