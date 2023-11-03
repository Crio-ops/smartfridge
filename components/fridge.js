import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";


 const Fridge = ({ label, children, items }) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.cardBox}>
      {Object.values(items).map((item, i) => (
        <TouchableOpacity key={i} style={styles.card}>   
        
          {/* <Image
          id={it['id']}
          style={{
            width: 30,
            height: 30, 
          }}        
            source ={sourceImage}
          /> */}
          <Text style={{textAlign : 'center'}}>{i}. {item['name']}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);



const styles = StyleSheet.create({
  cardBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow : 0,
    borderRadius : 15,
    backgroundColor: "#D9D9D9",
    elevation : 15,
  },
  card: {
    padding: 15,
    margin: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems : "center"
  },
  label : {
    textAlign : 'center',
    fontWeight : '800',
    fontSize : 24,
    color : "#D9D9D9",
  }
});

export default Fridge