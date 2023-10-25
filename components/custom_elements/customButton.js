import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function CustomButton(props) {
  const { onPress, title = 'default', style } = props;
  return (
    <Pressable 
    style={({pressed}) => [
      {
        backgroundColor: pressed ? '#B1B1B1' : '#D9D9D9',
        borderWidth: 0.2,
        borderBottomWidth: 1.5,
        borderColor:'#484848',
        borderRadius: 10,
        margin : 15,
        paddingVertical: 5,
        paddingHorizontal: 18,
      },
      style.style,
    ]}
    onPress={onPress}>
      <Text style={style}>{title}</Text>
    </Pressable>
  );
}

