import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../../styles/colors/colors.js';

const ErrorMessageComponent = ({ message }) => {
  return (
    <View style={[styles.errorContainer, styles.errorBackground]}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    borderRadius: 4,
    width: 230,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginVertical: 5,
    elevation: 10,
    textAlign: "center",
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
  },
  errorBackground: {
    backgroundColor: Colors.error,
  },
});

export default ErrorMessageComponent;
