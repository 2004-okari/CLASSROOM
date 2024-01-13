import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import Update from '../Components/Update';
import Timetable from '../Components/Timetable';
import Ionicons from '@expo/vector-icons/Ionicons';
import Notes from './Notes';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomePage') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Update') {
            iconName = focused ? 'ios-create' : 'ios-create-outline';
          } else if (route.name === 'Timetable') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomePage" component={HomeScreen} />
      <Tab.Screen name="Update" component={Update} />
      <Tab.Screen name="Timetable" component={Timetable} />
      <Tab.Screen name="notes" component={Notes} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
