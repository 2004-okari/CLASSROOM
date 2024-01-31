import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import SplashScreen from './Screens/SplashScreen';
import BottomTabNavigation from './Components/BottomTabNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedPickup from './Screens/FeedPickup';
import SettingScreen from './Screens/SettingScreen';
import EditProfile from './Screens/EditProfile';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigation} />
        <Stack.Screen name="FeedPickup" component={FeedPickup} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
