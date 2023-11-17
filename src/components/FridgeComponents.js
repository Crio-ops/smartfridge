import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Colors from "../styles/colors/colors.js";
const FridgeComponents = ({ label, children, items }) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.cardBox}>
      {/* {Object.values(items).map((item, i) => ( */}
      <FlatList
        style={styles.cardBox}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemRow}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      {/* ))} */}
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardBox: {
    backgroundColor: Colors.blue,
  },
  itemRow:{
    borderWidth:2,
    // marginVertical:5,
    padding:5,
    
  },
  item: {
    color: Colors.white,
    fontSize:18,
  },
  label: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 24,
    color: Colors.darkBlue,
  },
});

export default FridgeComponents;
