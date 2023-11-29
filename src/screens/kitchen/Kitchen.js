import {
  StyleSheet,
  Text,
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
export default function Kitchen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { kitchen, user } = useAuth();

  const [fridgeFoodObj, setFridgeFoodObj] = useState(kitchen.kitchenData);

  useEffect(() => {
    refreshKitchenData();
  }, []);

  const refreshKitchenData = async () => {
    try {
      const result = await fetchKitchenData(user);
      setFridgeFoodObj(result);
    } catch (error) {
      console.error("Error refreshing kitchen data:", error);
    }
  };

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
        <Text style={styles.label}>Frigo</Text>
        <FlatList
          style={styles.cardBox}
          data={fridgeFoodObj}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemRow}
              // onPress=
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
      </View>
      {/* <FridgeComponents label="frigo" items={fridgeFoodObj} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
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
});
