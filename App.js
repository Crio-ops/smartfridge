import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import Scanner from './components/scanner.js'

function HomeScreen({ navigation }) {
  
  return (
    <View style={styles.container}>
    <LinearGradient
      // Background Linear Gradient
      colors={['#34495E','#34495E']}
      style={styles.background}
    
    />
    <TouchableOpacity
      onPress={() => navigation.push("Scanner")}
    >
      <Image
      style={{
        width: 300,
        height: 300,
      }}
      source={require("./assets/chefsmate.png")}
    />
    {/* <LinearGradient
      // Button Linear Gradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.button}>
      <Text style={styles.text}>Chef's Mate</Text>
    </LinearGradient> */}
    </TouchableOpacity>
  </View>
  );
}

const Defaultoptions = {
  headerShown: true,
  animation: "slide_from_left",
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="chefsmate" 
          options={Defaultoptions} 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Scanner" 
          options={Defaultoptions}
          component={Scanner} 
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});

export default App;