import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../Screens/ChatScreen';
import ChatBox from '../Screens/ChatBox';

const ChatNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="List" component={ChatScreen} />
      <Stack.Screen name="ChatBox" component={ChatBox} />
    </Stack.Navigator>
  );
};

export default ChatNavigation;

const styles = StyleSheet.create({});
