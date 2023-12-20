import { API_URL } from "@env";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Camera } from "expo-camera";
import RegularButtonComponent from "../../components/elements/button/regularButtonComponent.js";
import Modal from "react-native-modal";
import ScannedProduct from "../../components/modals/scannedProduct/scannedProduct.js";
import globalStyleSheet from "../../styles/components/globalStyleSheet";
import IconButton from "../../components/elements/button/IconButton";
import SuccessMessageComponent from "../../components/elements/message/successMessageComponent.js";
import Colors from "../../styles/colors/colors";
import GradientBackground from "../../styles/components/GradientBackground";
import Product from "../../models/Product";
import { useAuth } from "../../components/context/UserAuth";

export default function Scanner({ navigation }) {
  const { kitchen, token, logout } = useAuth();
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [product, setProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isProductExist, setIsProductExist] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [success, setSuccess] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (!permission) {
    return (
      <View style={globalStyleSheet.container}>
        <GradientBackground />
        <Text style={{ textAlign: "center" }}>
          We need your permission to access the camera
        </Text>
        <RegularButtonComponent
          onPress={requestPermission}
          title="Grant Permission"
        />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={globalStyleSheet.container}>
        <GradientBackground />
        <Text style={{ textAlign: "center" }}>
          Camera permission is not granted. Please enable it in your device
          settings.
        </Text>
        <RegularButtonComponent
          onPress={requestPermission}
          title="Grant Permission"
        />
      </View>
    );
  }

  const buildProduct = (json, barCodeScanned) => {
    const {
      id,
      brand,
      name,
      quantity_unit,
      quantity,
      image,
      keywords,
      categories,
    } = json.item[0];

    const newProduct = new Product(
      id || "", // Use empty string if undefined
      brand || "", // Use empty string if undefined
      name || "", // Use empty string if undefined
      quantity_unit || "", // Use empty string if undefined
      quantity || "", // Use empty string if undefined
      image || "", // Use empty string if undefined
      keywords || [], // Use an empty array if undefined
      categories || [] // Use an empty array if undefined
    );

    if (
      !brand ||
      !name ||
      !quantity_unit ||
      !quantity ||
      !image ||
      categories[0] === ""
    ) {
      // If any required parameter is missing, ask the user to complete the product
      console.log("Missing or empty values:", {
        brand,
        name,
        quantity_unit,
        quantity,
        image,
        categories,
      });
      navigation.navigate("CreateProduct", {
        barcode: barCodeScanned,
        newProduct: newProduct,
      });
    } else {
      setProduct(newProduct);
      setIsProductExist(true);
      displayProductModal();
    }
  };

  const displayProductModal = () => {
    setModalVisible(true);
  };

  const updateCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getProduct(data);
  };

  const createCategory = async (data) => {
    try {
      const response = await fetch(
        API_URL+"/product/insert_product_category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Réponse de l'API :", result);

      // Traitez la réponse de l'API ici, si nécessaire
      if (result.success) {
        console.log("Catégorie créée avec succès :", result.category);
      } else {
        console.error(
          "Erreur lors de la création de la catégorie :",
          result.error
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête fetch :", error);
    }
  };

  const getProduct = async (barCodeScanned) => {
    let product = {
      scannedNum: barCodeScanned,
    };

    let jsonRequest = JSON.stringify(product);

    try {
      const response = await fetch(
        API_URL+"/openfoodfacts_api/search_product",
        {
          method: "POST",
          headers: {
            Authorization: token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: jsonRequest,
        }
      );

      const json = await response.json();

      if (json.status === 1) {
        buildProduct(json, barCodeScanned);
      } else if (json.status === 0) {
        setModalVisible(false);
        navigation.navigate("CreateProduct", { barcode: barCodeScanned });
      } else {
        logout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveProductInKitchen = async (selectedCategory, selectedFamily) => {
    if (!product) {
      Alert.alert("Error", "No product to save");
      return;
    }
    if (selectedFamily) {
      let category = {
        categories_name_fr: selectedCategory,
        tableName: selectedFamily,
      };

      createCategory(category);

      console.log("famille");
      console.log(selectedFamily);
    }

    let productData = {
      kitchen_id: kitchen.id,
      brand: product.brand,
      name: product.name,
      image: product.image,
      quantity: product.quantity,
      quantity_unit: product.quantity_unit,
      keywords: product.keywords,
      category: selectedCategory,
      family: selectedFamily,
    };

    let jsonRequest = JSON.stringify(productData);
    try {
      const response = await fetch(API_URL+"/product/store_product", {
        method: "POST",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: jsonRequest,
      });

      const json = await response.json();
      console.log(json);
      if (json.result) {
        checkProduct(json);
      } else {
        // logout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkProduct = (json) => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
    console.log("Product stored successfully:", json);
  };

  return (
    <View style={globalStyleSheet.container}>
      <GradientBackground />
      <View style={styles.cameraBox}>
        {isCameraActive && (
          <Camera
            style={styles.camera}
            type={type}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            ratio="1:1"
          />
        )}
      </View>

      <View style={styles.bottomContainer}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          animationOut="slideOutDown"
          animationOutTiming={600}
          coverScreen
          backdropOpacity={0.0}
          swipeDirection="down"
          style={{ justifyContent: "flex-end", margin: 0 }}
        >
          {isProductExist && (
            <View style={styles.productBox}>
               {success && (
                <View style={{alignItems:'center'}}>
                  <SuccessMessageComponent
                    message={"Produit ajouté !"}
                  ></SuccessMessageComponent>
                </View>
              )}
              <ScannedProduct
                image={product.image}
                brand={product.brand}
                name={product.name}
                categories={product.categories}
                quantity_unit={product.quantity_unit}
                quantity={product.quantity}
                unit={product.quantity_unit}
                updateCategory={updateCategory}
                saveProductInKitchen={saveProductInKitchen}
              />
       
              <View style={styles.rowsContainer}>
                <RegularButtonComponent
                  onPress={() => setScanned(false)}
                  title="Scanner"
                  style={styles.button}
                />
              </View>
            </View>
          )}
        </Modal>
        <View style={styles.cameraButtonBox}>
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <IconButton
              style={styles.scanButton}
              imageStyle={styles.imageStyle}
              onPress={() => setScanned(false)}
              source={require("../../../assets/qr-code-scan.png")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scanButton: {
    height: 100,
    width: 100,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: "70%",
    height: "70%",
  },
  scrollContainer: {
    backgroundColor: "transparent",
  },
  bottomContainer: {
    flex: 2,
  },
  cameraBox: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  cameraButtonBox: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 40,
    marginHorizontal: 15,
  },
  cameraButton: {
    paddingVertical: 15,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#D9D9D9",
  },
  productBox: {
    borderTopRadius: 5,
    backgroundColor: Colors.primary,
  },
  productButtonBox: {
    height: 5,
    width: 10,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#D9D9D9",
  },
  button: {
    marginHorizontal: 10,
    fontSize: 16,
    marginVertical: 5,
    alignItems: "center",
  },
  rowsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: Colors.darkBlue,
    paddingBottom: 10,
    paddingTop: 10,
  },
});
