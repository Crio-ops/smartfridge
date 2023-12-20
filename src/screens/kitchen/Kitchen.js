import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import GradientBackground from "../../styles/components/GradientBackground.js";
import Colors from "../../styles/colors/colors.js";
import { useAuth } from "../../components/context/UserAuth.js";
import fetchUserKitchenData from "../../services/productServices/fetchUserKitchenData";
import Modal from "react-native-modal";
import globalStyleSheet from "../../styles/components/globalStyleSheet.js";
import Product from "../../models/Product.js";
import ProductQuantitySlider from "../../components/elements/ProductQuantitySlider.js";

export default function Kitchen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const {setKitchen, kitchen, user, token } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState();
  const [kitchenFoodObj, setKitchenFoodObj] = useState(kitchen?.kitchenData || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateProductList, setUpateProductList] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const refreshKitchenData = async () => {
    try {
      const result = await fetchUserKitchenData(user, token);
      console.log(result.kitchenData);
      setKitchen(result)
      setKitchenFoodObj(result.kitchenData);
    } catch (error) {
      console.error("Error refreshing kitchen data:", error);
    }
  };

  function displaySelectedProduct(Prodid) {
    const selected = kitchenFoodObj.find((product) => product.id === Prodid);
    const product = new Product(
      selected.id,
      selected.brand,
      selected.name,
      selected.quantity_unit,
      selected.quantity,
      selected.image,
      selected.keywords
    );
    setSelectedProduct(product);
    product.afficherInfos();
    toggleModal();
  }

  const onUpdateOrDelete = async () => {
    setUpateProductList(true);
    await refreshKitchenData();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshKitchenData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <GradientBackground />
      <View style={{ padding: 10, flex: 1 }}>
        <Text style={styles.label}>{kitchen?.kitchen_name || "Cuisine"}</Text>
        {updateProductList && (
          <Text style={{ color: Colors.green }}>
            Modification effectuée avec succès
          </Text>
        )}
        {kitchenFoodObj.length === 0 ? (
          <Text style={styles.emptyText}>Votre cuisine est vide</Text>
        ) : (
          <FlatList
            style={styles.cardBox}
            data={kitchenFoodObj}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemRow}
                onPress={() => displaySelectedProduct(item.id)}
              >
                <View style={styles.rowContainer}>
                  <Image
                    style={styles.tinyLogo}
                    source={
                      item.image
                        ? { uri: item.image }
                        : require("../../../assets/notFound.png")
                    }
                  />
                  <View style={styles.columnContainer}>
                    <Text style={[styles.item, { fontSize: 17 }]}>
                      {item.name}
                    </Text>
                    <Text style={styles.item}>{item.brand}</Text>
                    <Text style={styles.item}>
                      {item.quantity} {item.quantity_unit}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}

        {isModalVisible && (
          <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
            <View style={styles.modalContainer}>
              <View style={styles.imageContainer}>
                <Text
                  style={[
                    globalStyleSheet.title,
                    { fontSize: 20, textAlign: "center" },
                  ]}
                >
                  Ajuster la quantité
                </Text>
                <Image
                  style={styles.modalLogo}
                  source={
                    selectedProduct.image
                      ? { uri: selectedProduct.image }
                      : require("../../../assets/notFound.png")
                  }
                />
              </View>
              <View>
                <Text style={globalStyleSheet.subtitle}>Nom du produit</Text>
                <Text style={styles.text}>{selectedProduct.name}</Text>
              </View>
              <View>
                <Text style={globalStyleSheet.subtitle}>Marque du produit</Text>
                <Text style={styles.text}>{selectedProduct.brand}</Text>
              </View>
              <ProductQuantitySlider
                product_id={selectedProduct.id}
                quantity={selectedProduct.quantity}
                quantity_unit={selectedProduct.quantity_unit}
                onClose={toggleModal}
                onUpdate={onUpdateOrDelete}
                onDelete={onUpdateOrDelete}
              />
            </View>
          </Modal>
        )}
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
  cardBox: {
    backgroundColor: Colors.primaryFade,
    borderRadius: 5,
    flex: 1,
    padding: 20,
  },
  itemRow: {
    borderBottomWidth: 0.5,
    borderRadius: 5,
    padding: 5,
    marginBottom: 2,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  columnContainer: {
    flexDirection: "column",
  },
  item: {
    color: Colors.darkerGrey,
    fontSize: 14,
  },
  label: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 24,
    color: Colors.darkBlue,
  },
  modalLogo: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 4,
    marginVertical: 15,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
    marginVertical: 1,
  },
  text: {
    fontSize: 15,
    borderRadius: 4,
    height: 45,
    borderBottomWidth: 1,
    borderColor: Colors.darkBlue,
    paddingVertical: 10,
    marginBottom: 15,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.darkerGrey,
    marginTop: 20,
  },
});
