import React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import Colors from '../../../styles/colors/colors.js' 

const WarningMessageComponent = ({ message }) => {
  return (
    <View style={[styles.warningContainer, styles.warningBackground]}>
      <Text style={styles.warningText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    warningContainer: {
      borderRadius: 4,
      width: 230,
      paddingVertical: 6,
      paddingHorizontal: 18,
      marginVertical: 5,
      elevation: 10,
      textAlign: "center",
    },
    warningText: {
      fontSize: 15,
      textAlign: 'center',
    },
    warningBackground: {
      backgroundColor: Colors.warning, // Remplacez par votre couleur d'erreur
    },
  });

export default WarningMessageComponent;
