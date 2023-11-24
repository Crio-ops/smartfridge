import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import AuthProvider, { useAuth } from "../../components/context/UserAuth.js";

const useScannerController = () => {
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

  if (!permission) {
    return {};
  }

  if (!permission.granted) {
    return {
      requestPermission,
    };
  }

  const checkProduct = (json) => {
    setIsProductExist(true);
    setProductBrand(json.item[0].brands);
    setProductName(json.item[0].name);
    setProductQuantity(json.item[0].quantity);
    setProductCategories(json.item[0].categories);
    setProductImage(json.item[0].image);
    setModalVisible(true);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getProduct(data);
  };

  const getProduct = async (barCodeScanned) => {
    let product = {
      scannedNum: barCodeScanned,
    };

    let jsonRequest = JSON.stringify(product);
    console.log(product);
    const LOCAL_URL = "http://192.168.1.56:3000/api/product/scanner";
    const RASPI_URL = "http://80.200.149.43:3000/api/product/scanner";

    try {
      const response = await fetch(LOCAL_URL, {
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
      if (json.status === 1) {
        checkProduct(json);
      } else {
        logout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveProductInKitchen = async () => {
    let product = {
        productBrand:productBrand,
        productName : productName,
        productImage: productImage,
        productQuantity: productQuantity,
        productCategories:productCategories
      };
    // let jsonRequest = JSON.stringify(json);
    console.log(product);
    const LOCAL_URL = "http://192.168.1.56:3000/api/product/saveProductInKitchen";
    // const RASPI_URL = "http://80.200.149.43:3000/api/product/scanner";

    try {
      const response = await fetch(LOCAL_URL, {
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
      if (json.status === 1) {
        checkProduct(json);
      } else {
        logout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    scanned,
    setScanned,
    type,
    setType,
    permission,
    requestPermission,
    product,
    setProduct,
    productBrand,
    setProductBrand,
    productName,
    setProductName,
    productQuantity,
    setProductQuantity,
    productImage,
    setProductImage,
    productCategories,
    setProductCategories,
    isProductExist,
    setIsProductExist,
    selectedItem,
    setSelectedItem,
    isModalVisible,
    setModalVisible,
    toggleModal,
    handleBarCodeScanned,
    getProduct,
    saveProductInKitchen,
  };
};

export default useScannerController;
