import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import { observer } from "mobx-react-lite";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { loggingOut } from "./../sdk/FirebaseMethods";

// Mobx Stores
import UserStore from "./../stores/userStore";

// Import Screens
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Emergencies from "../screens/Emergencies";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";

// Convert Screens
const MHome = () => <Home></Home>;
const MProfile = () => <Profile userstore={UserStore}></Profile>;
const MEmergencies = () => <Emergencies></Emergencies>;
const MSignin = () => <Signin userstore={UserStore}></Signin>;
const MSignup = () => <Signup userstore={UserStore}></Signup>;

// Navoigation stacks

function AuthStack(props) {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={MSignin}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={MSignup}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

// Signout
function SignOutScreen() {
  loggingOut();
  UserStore.setLogout();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ margin: 20 }}>Signing out</Text>
      <ActivityIndicator
        animating={UserStore.loggedIn}
        size="large"
      ></ActivityIndicator>
    </View>
  );
}

// Application Tabs
function ApplicationTabs(props) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <AntDesign name="home" size={16} color="black" />;
          } else if (route.name === "Emergencies") {
            return (
              <Ionicons
                name="ios-alert-circle-outline"
                size={16}
                color="black"
              />
            );
          } else if (route.name === "Profile") {
            return <AntDesign name="user" size={16} color="black" />;
          } else if (route.name === "Signout") {
            return <Ionicons name="log-out-outline" size={16} color="black" />;
          }
        },
      })}
      cardStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabBarOptions={{
        activeTintColor: "#ff8888",
        inactiveTintColor: "#eeeeee",
        style: {
          backgroundColor: "#111111",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MHome}
        options={({ navigation }) => ({ headerShown: false })}
      />
      <Tab.Screen
        name="Emergencies"
        component={MEmergencies}
        options={({ navigation }) => ({ headerShown: false })}
      />
      <Tab.Screen
        name="Profile"
        component={MProfile}
        options={({ navigation }) => ({ headerShown: false })}
      />
      <Tab.Screen
        name="Signout"
        component={SignOutScreen}
        options={({ navigation }) => ({ headerShown: false })}
      />
    </Tab.Navigator>
  );
}

const Screens = observer(({ navigation }) => {
  // Authentication Stack
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("login", loggedIn);
    console.log("UserStore", UserStore);
    setLoggedIn(UserStore.loggedIn);
  }, [UserStore.loggedIn]);

  function renderScreen() {
    if (!loggedIn) {
      return <Stack.Screen name="Auth" component={AuthStack} />;
    } else {
      return <Stack.Screen name="Application" component={ApplicationTabs} />;
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator mode="model" headerMode="none">
        {renderScreen()}
        {/* {renderScreen()} */}
        {/* {!loggedIn && <Stack.Screen name="Auth" component={AuthStack} />}
        {loggedIn && <Stack.Screen name="Home" component={HomeStack} />} */}
        {/* <Stack.Screen name="Application" component={ApplicationTabs} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

export default Screens;
