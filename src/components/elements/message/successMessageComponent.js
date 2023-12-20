import React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import Colors from '../../../styles/colors/colors.js' 

const SuccessMessageComponent = ({ message }) => {
  return (
    <View style={[styles.sucessContainer, styles.sucessBackground]}>
      <Text style={styles.sucessText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    sucessContainer: {
      borderRadius: 4,
      width: 230,
      paddingVertical: 6,
      paddingHorizontal: 18,
      marginVertical: 5,
      elevation: 10,
      textAlign: "center",
    },
    successText: {
      fontSize: 15,
      textAlign: 'center',
    },
    sucessBackground: {
      backgroundColor: Colors.sucess,
    },
  });

export default SuccessMessageComponent;
