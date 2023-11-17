import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Colors from '../../../styles/colors/colors.js'

const RemoveButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
    >
      <Image
        style={styles.buttonImage}
        source={require("../../../../assets/plus.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: Colors.background,
    backgroundColor:Colors.primary,
    borderRadius: 50,
    elevation:10,
  },
  buttonImage: {
    width: "100%",
    height: "100%",
  },
});

export default RemoveButton;
