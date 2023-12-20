import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import Colors from "../../styles/colors/colors.js";
import RegularButtonComponent from "../../components/elements/button/regularButtonComponent.js";

const ProductQuantitySlider = ({ quantity, quantity_unit, product_id,onClose, onUpdate, onDelete  }) => {
  const [quantityCounter, setQuantityCounter] = useState(quantity); // Initial quantity
  const [maxValue, setMaxValue] = useState(quantity);

  useEffect(() => {
    setMaxValue(quantity);
  }, [quantity]);

  const handleQuantityChange = (value) => {
    setQuantityCounter(value);
  };

  const updateQuantityProduct = async () => {
console.log(quantityCounter)
    try {
      const response = await fetch(
        "http://192.168.1.177:3001/routes/product/update_product_quantity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: product_id,
            quantity: quantityCounter,
          }),
        }
      );

      if (response.ok) {
        console.log("Quantity updated successfully on the server");
        onClose();
        onUpdate(); 
      } else {
        console.error("Failed to update quantity on the server");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(`http://192.168.1.177:3001/routes/product/delete_product/${product_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Product deleted successfully");
        onDelete(); // Appeler la fonction onDelete ici
        onClose(); // Appeler la fonction onClose ici
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Quantité: {quantityCounter}
        {quantity_unit}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={maxValue} // Use maxValue as the maximum value for the slider
        step={1}
        value={quantityCounter}
        onValueChange={handleQuantityChange}
      />
      <RegularButtonComponent
        style={styles.button}
        onPress={updateQuantityProduct}
        title="Appliquer"
      />
        <RegularButtonComponent
        style={styles.button}
        onPress={deleteProduct}
        title="Supprimer"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  slider: {
    width: "80%",
    marginVertical: 16,
  },
  title: {
    color: Colors.darkBlue,
    fontWeight: "800",
    fontSize: 16,
  },
  subtitle: {
    color: Colors.darkBlue,
    fontWeight: "800",
    fontSize: 14, // Ajustez la taille de police selon vos préférences
  },
});

export default ProductQuantitySlider;
