import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Timetable from '../Components/Timetable';
import Notes from '../Components/Notes';
import { authentication, db } from '../firebase.config';
import Update from '../Components/Update';
import COLORS from '../Constants/colors';


const HomeScreen = () => {

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.userName}>Okari Nyandika</Text>
      </View>

      <View>
        <Update />
      </View>

      <View >
        <Timetable />
      </View>

      <View>
        <Notes />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.TEXT2,
    padding: wp('2%'),
  },
});
