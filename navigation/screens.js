import React, {useContext, useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {observer} from 'mobx-react-lite';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Import Screens
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Emergencies from '../screens/Emergencies';

// Convert Screens
const MHome = () => <Home></Home>;
const MProfile = () => <Profile></Profile>;
const MEmergencies = () => <Emergencies></Emergencies>;

// Navoigation stacks

// Application Tabs
function ApplicationTabs(props) {
  return (
    <Tab.Navigator
      mode="card"
      initialRouteName="Home"
      // screenOptions={({route}) => ({
      //   tabBarIcon: ({focused, color, size}) => {
      //     if (route.name === 'Home') {
      //       return <FontAwesome5 name="Home" size={30} color="#900" />;
      //     } else if (route.name === 'Setting') {
      //       return <FontAwesome5 name="home" size={30} color="#900" />;
      //     }
      //   },
      // })}
      cardStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      tabBarOptions={{
        activeTintColor: '#ff8888',
        inactiveTintColor: '#eeeeee',
        style: {
          backgroundColor: '#111111',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={MHome}
        options={({navigation}) => ({headerShown: false})}
      />
      <Tab.Screen
        name="Emergencies"
        component={MEmergencies}
        options={({navigation}) => ({headerShown: false})}
      />
      <Tab.Screen
        name="Profile"
        component={MProfile}
        options={({navigation}) => ({headerShown: false})}
      />
    </Tab.Navigator>
  );
}

const Screens = observer(({navigation}) => {
  // Authentication Stack
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator mode="model" headerMode="none">
        {/* {renderScreen()} */}
        {/* {!loggedIn && <Stack.Screen name="Auth" component={AuthStack} />}
        {loggedIn && <Stack.Screen name="Home" component={HomeStack} />} */}
        <Stack.Screen name="Application" component={ApplicationTabs} />
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
