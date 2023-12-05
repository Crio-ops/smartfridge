import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/context/UserAuth.js";
import Product from "../../models/Product.js";

const useScannerController = () => {
  const { kitchen, token, logout } = useAuth();
  const [scanned, setScanned] = useState(true);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [product, setProduct] = useState();
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

  const buildProduct = (json) => {
    
    const {brand, name, quantity_unit, quantity, image, keywords, categories} = json.item[0];
    const product = new Product(brand, name, quantity_unit, quantity, image, keywords, categories); 
    product.afficherInfos();
    setProduct(product);
    setIsProductExist(true);
    displayProductModal()
  };
  
  const displayProductModal= () => {
    setModalVisible(true);   
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getProduct(data);
  };

  const getProduct = async (barCodeScanned) => {
    let product = {
      scannedNum: barCodeScanned,
    };

    let jsonRequest = JSON.stringify(product);
    const LOCAL_URL = "http://192.168.1.56:3001/routes/product/scanner";
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
        buildProduct(json);
      } else {
        logout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveProductInKitchen = async (data) => {
    console.log('le produit : ', data) 
    let product = {
      kitchen_id: kitchen.id,
      brand: data.brand,
      name: data.name,
      image: data.image,
      quantity: data.quantity,
      quantity_unit:data.quantity_unit,
      keywords: data.keywords,
      categories: data.categories,
    };
    let jsonRequest = JSON.stringify(product);
    console.log(product);
    const LOCAL_URL = "http://192.168.1.56:3001/routes/product/store_product";

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
