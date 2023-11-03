import { Camera, CameraType } from "expo-camera";
import AuthProvider, { useAuth } from "../components/context/UserAuth.js";
import { useEffect, useState, useCallback, useMemo, React, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default function Scanner() {
  const { user, token, logout, setToken } = useAuth();
  const [scanned, setScanned] = useState(true);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [productBrand, setProductBrand] = useState();
  const [productName, setProductName] = useState();
  const [productQuantity, setProductQuantity] = useState();
  const [productImage, setProductImage] = useState();

  if (!permission) {
    return <View />;
  }
  // grant permisson to use the camera
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getProduct(data);
  };

  // Changement de caméra
  // function toggleCameraType() {
  //   setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  // }

  function getProduct(barCodeScanned) {
    let product = {
      scannedNum: barCodeScanned,
    };

    let jsonRequest = JSON.stringify(product);
    console.log(product);

    try {
      fetch("http://192.168.1.56:3000/api/product/scanner", {
        method: "POST",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: jsonRequest,
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.status === 1) {
            setProductBrand(json.item[0].product.brands);
            setProductName(json.item[0].product.product_name);
            setProductQuantity(json.item[0].product.quantity);
            setProductImage(json.item[0].product.image_front_small_url);
          } else {
            logout();
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraBox}>
        <View style={styles.cameraWindowBox}>
          <Camera
            style={styles.camera}
            type={type}
            onBarCodeScanned={scanned ? false : handleBarCodeScanned}
            ratio="1:1"
          >
            {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity> */}
          </Camera>
        </View>
        {/* {scanned && ( */}
        <TouchableOpacity
          style={styles.cameraButtonBox}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.text}>Scanne ton produit</Text>
        </TouchableOpacity>
        {/* )} */}
      </View>
        <View style={styles.bottomContainer}>
          <View style={styles.productInfo}>
            <Image style={styles.tinyLogo} source={{ uri: productImage }} />
            <Text style={styles.text}>Marque : {productBrand}</Text>
            <Text style={styles.text}>type : {productName}</Text>
            <Text style={styles.text}>quantité : {productQuantity}</Text>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C89A7",
  },
  bottomContainer: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: "red",
    justifyContent: "center",
  },
  cameraBox: {
    flex: 1,
    // borderWidth: 2,
    width: "100%",
    height: "40%",
  },
  cameraWindowBox: {
    flex: 10,
    alignItems: "center",
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  cameraButtonBox: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 100,
    paddingVertical: 15,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#D9D9D9",
  },
  productInfo: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 40,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#D9D9D9",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 30,
    borderColor: "black",
    // elevation : 5,
    borderWidth: 1,
    alignSelf: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495E",
  },
});
