import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Colors from '../../../styles/colors/colors.js';

export default function regularButtonComponent(props) {
  const { onPress, title = 'default', style } = props;
  return (
    <Pressable 
    style={({pressed}) => [
      {
        backgroundColor: pressed ? Colors.lightBlue : Colors.white,
        borderWidth: 0.2,
        borderBottomWidth: 1.5,
        borderColor:Colors.background,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 18,
        textAlign:'center',
      },
      style,
    ]}
    onPress={onPress}>
      <Text style={style}>{title}</Text>
    </Pressable>
  );
}

