import { Camera, CameraType } from "expo-camera";
import AuthProvider, { useAuth } from "../components/context/UserAuth.js";
import Colors from "../styles/colors/colors.js";
import { useState, React } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import GradientBackground from "../styles/components/GradientBackground.js";
import { Picker } from "@react-native-picker/picker";
import ProductInfoComponent from "../components/scannedProduct.js";
import RegularButtonComponent from "../components/elements/button/regularButtonComponent.js";
import Modal from "react-native-modal";

export default function Scanner() {
  const { user, token, logout, setToken } = useAuth();
  const [scanned, setScanned] = useState(true);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [product, setProduct] = useState();
  const [productBrand, setProductBrand] = useState();
  const [productName, setProductName] = useState();
  const [productQuantity, setProductQuantity] = useState();
  const [productImage, setProductImage] = useState();
  const [productCategories, setProductCategories] = useState();
  const [isProductExist, setIsProductExist] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // const width = Dimensions.get('window').width;

  if (!permission) {
    return <View />;
  }
  // grant permisson to use the camera
  if (!permission.granted) {
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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getProduct(data);
  };

  function getProduct(barCodeScanned) {
    let product = {
      scannedNum: barCodeScanned,
    };

   async function checkProduct(json){
      setIsProductExist(true);
      setProductBrand(json.item[0].brands);
      setProductName(json.item[0].name);
      setProductQuantity(json.item[0].quantity);
      setProductCategories(json.item[0].categories);
      setProductImage(json.item[0].image);
      setModalVisible(true);
    }

    let jsonRequest = JSON.stringify(product);
    console.log(product);
    const LOCAL_URL = "http://192.168.1.56:3000/api/product/scanner";
    const RASPI_URL = "http://80.200.149.43:3000/api/product/scanner";
    try {
      fetch(RASPI_URL, {
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
            checkProduct(json)
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
      <GradientBackground />
      <View style={styles.cameraBox}>
        <View style={styles.cameraWindowBox}>
          <Camera
            style={styles.camera}
            type={type}
            onBarCodeScanned={scanned ? false : handleBarCodeScanned}
            ratio="1:1"
          >
          </Camera>
        </View>
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
          style={{ justifyContent: "flex-end", margin: 0, flex: 1 }}
        >
          {isProductExist && (
            <View style={styles.productBox}>
    <ScrollView style={styles.scrollContainer}>
                <ProductInfoComponent
                  productImage={productImage}
                  productBrand={productBrand}
                  productName={productName}
                  productCategories={productCategories}
                  productQuantity={productQuantity}
                ></ProductInfoComponent>
                
              </ScrollView>

              <RegularButtonComponent title="Ajouter au frigo" />
              <RegularButtonComponent
                onPress={() => setScanned(false)}
                title="Scanner"
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
    // flex: 1,
    backgroundColor: 'transparent', // Pour éviter le fond blanc de ScrollView
  },
  bottomContainer: {
    flex: 1,
  },
  cameraBox: {
    flex: 1,
    width: "100%",
    height: "40%",
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
    // paddingVertical: 15,
    height: 5,
    width: 10,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#D9D9D9",
  },
});
