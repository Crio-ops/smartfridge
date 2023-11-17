import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from "../colors/colors.js"

const GradientBackground = () => {
  return (
    <LinearGradient
      colors={[Colors.lightBlue, Colors.skyBlue]}
      start={{ x: 0.6, y: 0.3 }}
      end={{ x: 0.8, y: 1.5 }}
      style={styles.background}
    />
  );
};
const styles = {
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
      },
};

export default GradientBackground;
