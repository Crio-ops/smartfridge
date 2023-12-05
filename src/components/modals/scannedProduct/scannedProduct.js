import React from "react";
import { View, Image, Text, TextInput, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Colors from "../../../styles/colors/colors.js";
import useScannedProductController from "./scannedProductController.js";
import RegularButtonComponent from "../../../components/elements/button/regularButtonComponent.js";
import globalStyleSheet from "../../../styles/components/globalStyleSheet.js";
const ScannedProduct = ({ brand, image, name, categories, quantity, unit }) => {
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
            <Text style={styles.text}>Quantité:</Text>
            <Text style={[styles.text, { textAlign: "right" }]}>
              {quantity}
              {unit}
            </Text>
          </View>
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
});

export default ScannedProduct;
