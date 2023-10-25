import 'react-native-gesture-handler'
import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomButton from "./components/custom_elements/customButton.js";
import AuthProvider, { useAuth } from "./components/context/UserAuth.js";
import Scanner from "./screens/scanner.js";
import Dashboard from "./screens/dashboard.js";
import CreateAccount from "./screens/create_account.js";
import Login from "./screens/login.js";
import Profile from "./screens/profile.js"
import Settings from "./screens/settings.js"
// //localization
// import * as Localization from 'expo-localization';
// import i18n from 'i18n-js';
// import { nl, en, fr, de } from './assets/i18n/supportedLanguages';

// i18n.fallbacks = true;
// i18n.translations = { nl, en, fr, de };
// i18n.locale = Localization.locale;
// //

const Defaultoptions = {
  headerShown: false,
  animation: "slide_from_left",
};

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator drawerType="back">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

const Navigator = () => {
  const {user, token, login, logout} = useAuth();


  return (
    <Stack.Navigator initialRouteName={token ? 'Root' : 'Login'}>
      {token ? (
        <>
          <Stack.Screen
            name="Root"
            component={Root}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Scanner"
            component={Scanner}
            options={{ headerShown: true }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6C89A7",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
  buttonStyle: {
    fontSize: 16,
    borderColor: "white",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 18,
    color: "#BABABA",
  },
});

export default App;
