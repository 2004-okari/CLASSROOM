import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage as rp } from 'react-native-responsive-fontsize';
import Ionicons from '@expo/vector-icons/Ionicons';
import Timetable from '../Components/Timetable';
import Notes from '../Components/Notes';

const upcomingEvents = [
  {
    id: 1,
    title: 'Event One',
    month: 'January',
    date: '1',
    time: '18:00',
    venue: 'Venue One UON Hall 5',
    note: 'This is the first upcoming event.',
  },
  {
    id: 2,
    title: 'Event Two',
    month: 'September',
    date: '2',
    time: '20:00',
    venue: 'Venue Two',
    note: 'This is the second upcoming event.',
  },
  {
    id: 3,
    title: 'Event Three',
    month: 'August',
    date: '3',
    time: '17:00',
    venue: 'Venue Three',
    note: 'This is the third upcoming event.',
  },
  {
    id: 4,
    title: 'Event Four',
    month: 'February',
    date: '4',
    time: '19:00',
    venue: 'Venue Four',
    note: 'This is the fourth upcoming event.',
  },
  {
    id: 5,
    title: 'Event Five',
    month: 'June',
    date: '11',
    time: '16:00',
    venue: 'Venue Five',
    note: 'This is the fifth upcoming event.',
  },
  {
    id: 6,
    title: 'Event Six',
    month: 'September',
    date: '4',
    time: '21:00',
    venue: 'Venue Six',
    note: 'This is the sixth upcoming event.',
  },
  {
    id: 7,
    title: 'Event Seven',
    month: 'April',
    date: '8',
    time: '18:30',
    venue: 'Venue Seven',
    note: 'This is the seventh upcoming event.',
  },
  {
    id: 8,
    title: 'Event Eight',
    month: 'December',
    date: '9',
    time: '20:30',
    venue: 'Venue Eight',
    note: 'This is the eighth upcoming event.',
  },
];

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.userName}>Okari Nyandika</Text>
      </View>

      <View>
        <Text>Upcoming events</Text>
      </View>

      <View style={styles.flatlistContainer}>
        <FlatList
          data={upcomingEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <View style={styles.eventDetailsContainer}>
                <View style={styles.eventDateDetails}>
                  <Text style={styles.eventDetails1}>
                    {item.month.substring(0, 3).toUpperCase()}
                  </Text>
                  <Text style={styles.eventDetails2}>
                    {item.date.padStart(2, '0')}
                  </Text>
                </View>
                <Text style={styles.eventDetails3}>{item.time}</Text>
              </View>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDetails5}>{item.note}</Text>
              <View style={styles.eventLocation}>
                <Ionicons name="location-outline" size={22} color="red" />
                <Text style={styles.eventDetails4}>{item.venue}</Text>
              </View>
            </View>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventList}
        />
      </View>

      
      <View style={{ width: '100%', height: hp('40%') }}>
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
    backgroundColor: 'yellow',
    padding: wp('1%'),
  },
  userName: {
    textAlign: 'center',
    fontSize: rp(3),
    fontWeight: 'bold',
    marginBottom: wp('2%'),
  },
  flatlistContainer: {
    // flex: 1,
    backgroundColor: 'green',
  },
  eventItem: {
    backgroundColor: 'blue',
    margin: wp('2%'),
    padding: wp('2%'),
    borderRadius: wp('2%'),
    width: wp('90%'),
    // height: 120,
  },
  eventDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'purple',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
    borderRadius: 4,
    // height: wp('10%'),
  },
  eventDetails1: {
    fontWeight: '400',
  },
  eventDetails2: {
    fontSize: rp(4),
    fontWeight: '900',
  },
  eventDetails3: {
    fontSize: rp(3),
    fontWeight: '900',
  },
  eventDetails5: {
    // textAlign: 'center',
  },
  eventTitle: {
    fontSize: rp(2.8),
    fontWeight: '600',
  },
  eventLocation: {
    flexDirection: 'row',
  },
});
