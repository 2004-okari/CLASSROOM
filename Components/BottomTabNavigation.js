import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';

import Ionicons from '@expo/vector-icons/Ionicons';
import Profile from '../Screens/Profile';
import COLORS from '../Constants/colors';
import ChatNavigation from './ChatNavigation';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomePage') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Chat') {
            iconName = focused
              ? 'ios-chatbox-ellipses'
              : 'ios-chatbox-ellipses-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomePage" component={HomeScreen} />
      <Tab.Screen
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.TEXT1,
          },
          headerTitle: 'Classroom',
        }}
        name="Chat"
        component={ChatNavigation}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
