import React, { useState } from "react";
import { View, Image, Text, TextInput, StyleSheet } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import Colors from "../styles/colors/colors.js";
const ProductInfoComponent = ({
  productBrand,
  productImage,
  productName,
  productCategories,
  productQuantity,
}) => {
  const [isSlicedProduct, setIsSlicedProduct] = useState(false);
  return (
    <View>
      <View style={styles.productInfo}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.tinyLogo}
            source={
              productImage
                ? { uri: productImage }
                : require("../../assets/notFound.png")
            }
          />
        </View>
        <View style={styles.textContainer}>
          <TextInput style={styles.textInput}>{productName}</TextInput>
          <Text style={styles.text}>Marque:</Text>
          <TextInput style={styles.textInput}>{productBrand}</TextInput>
          <Text style={styles.text}>Quantité:</Text>
          <TextInput style={styles.textInput}>{productQuantity}</TextInput>
          <Text style={styles.text}>produit en tranche ?</Text><CheckBox
          value={isSlicedProduct}
          onValueChange={setIsSlicedProduct}
          />
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.text}>{productCategories}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productInfo: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageContainer: {
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.primary,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  categoryContainer: {
    margin: 10,
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
    borderBottomWidth:1,
    borderColor: Colors.darkBlue,
    elevation: 10,
    textAlign: "center",
  },
});

export default ProductInfoComponent;
