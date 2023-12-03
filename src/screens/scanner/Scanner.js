import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import Colors from "../../styles/colors/colors.js";
import GradientBackground from "../../styles/components/GradientBackground.js";
import RegularButtonComponent from "../../components/elements/button/regularButtonComponent.js";
import Modal from "react-native-modal";
import useScannerController from "./ScannerController";
import ScannedProduct from "../../components/modals/scannedProduct/scannedProduct.js";

export default function Scanner() {
  const {
    scanned,
    setScanned,
    type,
    permission,
    requestPermission,
    product,
    isProductExist,
    isModalVisible,
    setModalVisible,
    handleBarCodeScanned,
    saveProductInKitchen,
  } = useScannerController();

  if (!permission) {
    return (
      <View style={styles.container}>
        <GradientBackground />
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <RegularButtonComponent
          onPress={requestPermission}
          title="grant permission"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GradientBackground />
      <View style={styles.cameraBox}>
        <View style={styles.cameraWindowBox}>
          <Camera
            style={styles.camera}
            type={type}
            onBarCodeScanned={scanned ? false : handleBarCodeScanned}
            ratio="1:1"
          ></Camera>
        </View>
      </View>

      {/*  This component displays the scanned product.  */}
      <View style={styles.bottomContainer}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          animationOut="slideOutDown"
          animationOutTiming={600}
          coverScreen
          backdropOpacity={0.0}
          swipeDirection="down"
          style={{ justifyContent: "flex-end", margin: 5 }}
        >
          {isProductExist && (
            <View style={styles.productBox}>
              <ScannedProduct
                image={product.image}
                brand={product.brand}
                name={product.name}
                categories={product.categories}
                quantity={product.quantity}
                unit={product.unit}
              ></ScannedProduct>

              <RegularButtonComponent
                onPress={() => saveProductInKitchen(product)}
                title="Ajouter au frigo"
                style={styles.button}
              />
              <RegularButtonComponent
                onPress={() => setScanned(false)}
                title="Scanner"
                style={styles.button}
              />
            </View>
          )}
        </Modal>
        <View style={styles.cameraButtonBox}>
          <RegularButtonComponent
            onPress={() => setScanned(false)}
            title="Scanne ton produit"
          />
        </View>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cameraWindowBox: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 2,
    borderRadius: 10,
    borderWidth: 4,
    elevation: 5,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
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
    marginHorizontal: 50,
    fontSize: 16,
    marginVertical: 5,
    alignItems: "center",
  },
});
