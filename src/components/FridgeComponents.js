import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import Colors from "../styles/colors/colors.js";
import Modal from "react-native-modal";

const FridgeComponents = ({ label, items }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const onRefresh = () => {
    // Mettez à jour les données ici (par exemple, refetch les données depuis le serveur)
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); 
  };

  const displayDetailsModal= () => {
    setModalVisible(true);   
  }

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <FlatList
        style={styles.cardBox}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemRow}
          onPress= {() => setModalVisible(true)}
          >
             <View style={styles.rowContainer}>
            <Image
            style={styles.tinyLogo}
            source={
              item.image_link
                ? { uri:  item.image_link }
                : require("../../assets/notFound.png")
            }
          />
            <Text style={styles.item}>{item.name} - {item.brand}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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
      <View>
        <Text>Modal</Text>
      </View>
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBox: {
  },
  itemRow: {
    backgroundColor: Colors.lightBlue,
    borderBottomWidth: 1.5,
    borderRadius:5,
    padding: 5,
    marginBottom:2,
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
    marginRight:4,
  },
});

export default FridgeComponents;
