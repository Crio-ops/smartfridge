import React from "react";
import { View, Image, Text, TextInput, StyleSheet } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import Colors from "../../../styles/colors/colors.js";
import useScannedProductController from "./scannedProductController.js";
import RegularButtonComponent from "../../../components/elements/button/regularButtonComponent.js";

const ScannedProduct = ({
  brand,
  image,
  name,
  categories,
  quantity,
  unit,
}) => {
  const { isSlicedProduct, setIsSlicedProduct } = useScannedProductController();
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
        <View style={styles.textContainer}>
          <Text style={styles.text}>{name}</Text>
          {/* <Text style={styles.text}>Marque:</Text> */}
          <Text style={styles.text}>{brand}</Text>
          {/* <Text style={styles.text}>Quantité:</Text> */}
          <View style={styles.quantityContainer}>
            <Text style={[styles.text, { fontStyle: "italic" }]}>{quantity}</Text>
            <Text style={[styles.text, { fontStyle: "italic" }]}>{unit}</Text>
          </View>
          <RegularButtonComponent style={styles.text} title='Produit incomplet ?'/>
          

        </View>
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
  quantityContainer: {
    flexDirection: "row",
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

export default ScannedProduct;