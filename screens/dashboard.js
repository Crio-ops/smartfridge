import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Fridge from "../components/fridge.js";
export default function Dashboard({ navigation }) {
  const fridgeFoodObj = [
    { id: 0, name: 'jambon'},
    { id: 1, name: 'orange'},
    { name: "boisson", id: 2},
    { name: "legumes", id: 3},
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.push("Scanner")}
        style={{
          marginVertical: 10,
          marginHorizontal: 80,
          paddingVertical: 15,
          borderRadius: 5,
          elevation: 5,
          backgroundColor: "#D9D9D9",
        }}
      >
        <Text style={{ textAlign: "center" }}>GO TO THE SCAN !</Text>
      </TouchableOpacity>
      {/* composant frigo importé */}
      <Fridge label='frigo' items={fridgeFoodObj}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C89A7",
    textAlign: "center",
  },
});
