import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import GradientBackground from "../../styles/components/GradientBackground.js";
// import FridgeComponents from "../../components/FridgeComponents.js";
import Colors from "../../styles/colors/colors.js";
import { useAuth } from "../../components/context/UserAuth.js";
import fetchKitchenData from "../../services/fetchKitchenData.js";
import Modal from "react-native-modal";



export default function Kitchen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { kitchen, user, token } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState();
  const [kitchenFoodObj, setKitchenFoodObj] = useState(kitchen.kitchenData);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    refreshKitchenData();
  }, []);

  const refreshKitchenData = async () => {
    try {
      const result = await fetchKitchenData(user, token);
      setKitchenFoodObj(result);
    } catch (error) {
      console.error("Error refreshing kitchen data:", error);
    }
  };

  function getSelectedProduct(id){
    const result = kitchenFoodObj.find(product => product.id === id);
    setSelectedProduct(result)
    console.log(result)
    setIsVisible(true)
    toggleModal()
    
  }

  // useEffect(() => {
  //   getSelectedProduct()
  //   }, [selectedProduct]);

  //refresh products list
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshKitchenData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      
      <GradientBackground />
      <View style={{ padding: 10, flex: 1 }}>
        <Text style={styles.label}>{kitchen.kitchen_name}</Text>
        
        <FlatList
          style={styles.cardBox}
          data={kitchenFoodObj}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => getSelectedProduct(item.id)}
            >
              <View style={styles.rowContainer}>
                <Image
                  style={styles.tinyLogo}
                  source={
                    item.image_link
                      ? { uri: item.image_link }
                      : require("../../../assets/notFound.png")
                  }
                  
                />
                <Text style={styles.item}>
                  {item.name} - {item.brand}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
{ isModalVisible &&

        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
          <Image
                  style={styles.tinyLogo}
                  source={
                    selectedProduct.image_link
                      ? { uri: selectedProduct.image_link }
                      : require("../../../assets/notFound.png")
                  }
                  
                />
            <TextInput style={styles.textInput}>{selectedProduct.name}</TextInput>
            <TextInput style={styles.textInput}>{selectedProduct.brand}</TextInput>
            {/* <TextInput>{selectedProduct.name}</TextInput> */}
            <TouchableOpacity
            style={styles.button}
             onPress={toggleModal}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
  },
  cardBox: {},
  itemRow: {
    backgroundColor: Colors.lightBlue,
    borderBottomWidth: 1.5,
    borderRadius: 5,
    padding: 5,
    marginBottom: 2,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    color: Colors.darkerGrey,
    fontSize: 15,
  },
  label: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 24,
    color: Colors.darkBlue,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 4,
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
 button: {
  backgroundColor:Colors.blue,
  marginHorizontal: 50,
  fontSize: 16,
  marginVertical: 5,
  alignItems: "center",
},
});
