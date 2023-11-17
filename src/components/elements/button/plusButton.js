import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Colors from '../../../styles/colors/colors.js'

const PlusButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.addButton}
    >
      <Image
        style={styles.addButtonImage}
        source={require("../../../../assets/plus.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: Colors.background,
    backgroundColor:Colors.primary,
    borderRadius: 50,
    elevation:10,
  },
  addButtonImage: {
    width: "100%",
    height: "100%",
  },
});

export default PlusButton;
