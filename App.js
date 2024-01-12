import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import SplashScreen from './Screens/SplashScreen';
import Update from './Components/Update';
import Timetable from './Components/Timetable';

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Splash" component={SplashScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Signup" component={SignupScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Timetable" component={Timetable} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
