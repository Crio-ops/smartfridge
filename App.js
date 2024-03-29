import "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "./src/styles/colors/colors.js";
//import for navigate between screens, Library : https://reactnavigation.org/
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//
import AuthProvider, { useAuth } from "./src/components/context/UserAuth.js";
import Scanner from "./src/screens/scanner/Scanner.js";
import Dashboard from "./src/screens/home/Dashboard.js";
import CreateAccount from "./src/screens/auth/CreateAccount.js";
import CreateRecipes from "./src/screens/recipes/CreateRecipes.js";
import PreparationListCreation from "./src/screens/recipes/PreparationListCreation.js";
import Recipes from "./src/screens/recipes/Recipes.js";
import ShowRecipe from "./src/screens/recipes/ShowRecipe.js"
import CreateProduct from "./src/screens/product/createProduct.js";
import Kitchen from "./src/screens/kitchen/Kitchen.js";
import Login from "./src/screens/auth/Login.js";
import Profile from "./src/screens/profile/Profile.js";
import Settings from "./src/screens/profile/Settings.js";

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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator
      drawerType="back"
      screenOptions={{
        headerStyle: {
          borderColor: Colors.background,
          borderWidth: 4,
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          color: Colors.primary,
          fontWeight: 800,
        },
        drawerStyle: {
          borderTopWidth: 52,
          borderRightWidth: 5,
          borderTopColor: Colors.background,
          borderRightColor: Colors.background,
          backgroundColor: Colors.background,
          width: 200,
        },
        sceneContainerStyle: { backgroundColor: "#62AFFF" },
        drawerActiveTintColor: Colors.background,
        drawerInactiveTintColor: Colors.primary,
        drawerActiveBackgroundColor: Colors.primary,
      }}
    >
      <Drawer.Screen
        name="Menu"
        component={TabScreens}
        options={{
          title: "Home",
          drawerIcon: ({ color }) => (
            <Image
              source={require("./assets/home.png")}
              style={{ height: 25, width: 25 }}
              colors={Colors.background}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profil",
          drawerIcon: ({ color }) => (
            <Image
              source={require("./assets/user.png")}
              style={{ height: 25, width: 25 }}
              colors={Colors.background}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Réglages",
          drawerIcon: ({ color }) => (
            <Image
              source={require("./assets/settings.png")}
              style={{ height: 25, width: 25 }}
              colors={Colors.background}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function TabScreens() {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        tabBarStyle: {
          height: "10%",
          borderTopWidth: 4,
          borderWidth: 4,
          borderTopColor: Colors.darkerGrey,
          borderLeftColor: Colors.darkerGrey,
          borderRightColor: Colors.darkerGrey,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          backgroundColor: Colors.backgroundFade,
        },
      }}
    >
      <Tab.Screen
        name="Ma cuisine"
        component={Kitchen}
        options={{
          tabBarItemStyle: {
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
          },
          tabBarActiveBackgroundColor: Colors.darkerGrey,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.primary,
          tabBarLabelStyle: { fontSize: 15, fontWeight: "800" },
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("./assets/fridge.png")}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarItemStyle: {
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
          },
          tabBarActiveBackgroundColor: Colors.darkerGrey,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.primary,
          tabBarLabelStyle: { fontSize: 15, fontWeight: "800" },
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("./assets/home.png")}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Recettes"
        component={Recipes}
        options={{
          tabBarItemStyle: {
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
          },
          tabBarActiveBackgroundColor: Colors.darkerGrey,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.primary,
          tabBarLabelStyle: { fontSize: 15, fontWeight: "800" },
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("./assets/recipe.png")}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Navigator = () => {
  const { user, token, login, logout } = useAuth();

  return (
    <Stack.Navigator initialRouteName={token ? "Root" : "Login"}>
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
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.background,
              },
              headerTitleStyle: {
                color: Colors.primary, // Couleur du titre de l'écran
              },
              headerTintColor: Colors.primary, // Couleur de l'icône de retour
            }}
          />
            <Stack.Screen
            name="CreateRecipes"
            component={CreateRecipes}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.background,
              },
              headerTitleStyle: {
                color: Colors.primary, // Couleur du titre de l'écran
              },
              headerTintColor: Colors.primary, // Couleur de l'icône de retour
            }}
          />
                <Stack.Screen
            name="PreparationListCreation"
            component={PreparationListCreation}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.background,
              },
              headerTitleStyle: {
                color: Colors.primary, // Couleur du titre de l'écran
              },
              headerTintColor: Colors.primary, // Couleur de l'icône de retour
            }}
          />
           <Stack.Screen
            name="CreateProduct"
            component={CreateProduct}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.background,
              },
              headerTitleStyle: {
                color: Colors.primary, // Couleur du titre de l'écran
              },
              headerTintColor: Colors.primary, // Couleur de l'icône de retour
            }}
          />
              <Stack.Screen
            name="ShowRecipe"
            component={ShowRecipe}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.background,
              },
              headerTitleStyle: {
                color: Colors.primary, // Couleur du titre de l'écran
              },
              headerTintColor: Colors.primary, // Couleur de l'icône de retour
            }}
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
};

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
    // backgroundColor: "#6C89A7",
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
