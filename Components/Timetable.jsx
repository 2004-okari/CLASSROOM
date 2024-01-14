import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import TimeTable from '@mikezzb/react-native-timetable';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const eventGroups = [
  {
    courseId: 'AIST3020',
    title: 'Intro to Computer Systems',
    sections: {
      '- - LEC': {
        days: [2, 3],
        startTimes: ['11:30', '16:30'],
        endTimes: ['12:15', '18:15'],
        locations: ['Online Teaching', 'Online Teaching'],
      },
      '-L01 - LAB': {
        days: [2],
        startTimes: ['16:30'],
        endTimes: ['17:15'],
        locations: ['Online Teaching'],
      },
    },
  },
  {
    courseId: 'CSCI2  ``100',
    title: 'Data Structures',
    sections: {
      'A - LEC': {
        days: [1, 3],
        startTimes: ['16:30', '14:30'],
        endTimes: ['17:15', '16:15'],
        locations: ['Online Teaching', 'Online Teaching'],
      },
      'AT02 - TUT': {
        days: [4],
        startTimes: ['17:30'],
        endTimes: ['18:15'],
        locations: ['Online Teaching'],
      },
    },
  },
  {
    courseId: 'ELTU2014',
    title: 'English for ERG Stds I',
    sections: {
      'BEC1 - CLW': {
        days: [2, 4],
        startTimes: ['10:30', '9:30'],
        endTimes: ['11:15', '10:15'],
        locations: ['Online Teaching', 'Online Teaching'],
      },
    },
  },
  {
    courseId: 'ENGG2780',
    title: 'Statistics for Engineers',
    sections: {
      'B - LEC': {
        days: [1],
        startTimes: ['12:30'],
        endTimes: ['14:15'],
        locations: ['Online Teaching'],
      },
      'BT01 - TUT': {
        days: [3],
        startTimes: ['12:30'],
        endTimes: ['14:15'],
        locations: ['Online Teaching'],
      },
    },
  },
  {
    courseId: 'GESC1000',
    title: 'College Assembly',
    sections: {
      '-A01 - ASB': {
        days: [5],
        startTimes: ['11:30'],
        endTimes: ['13:15'],
        locations: ['Online Teaching'],
      },
    },
  },
  {
    courseId: 'UGEB1492',
    title: 'Data Expl - Stat in Daily Life',
    sections: {
      '- - LEC': {
        days: [4],
        startTimes: ['14:30'],
        endTimes: ['17:15'],
        locations: ['Lady Shaw Bldg LT5'],
      },
    },
  },
  {
    courseId: 'UGEC1685',
    title: 'Drugs and Culture',
    sections: {
      '- - LEC': {
        days: [4],
        startTimes: ['11:30'],
        endTimes: ['13:15'],
        locations: ['Lee Shau Kee Building LT5'],
      },
    },
  },
];

const Timetable = () => {
  const [isTimesModalVisible, setIsTimesModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setIsTimesModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsTimesModalVisible(false);
  };

  return (
    <View>
      <Text>Okari Nyandika!</Text>
      <ScrollView style={styles.container}>
        <TimeTable
          eventGroups={eventGroups}
          eventOnPress={handleEventPress}
          configs={{
            numOfDays: 5,
            endHour: 18,
            startHour: 9,
          }}
        />
        <Modal isVisible={isTimesModalVisible}>
          <View>
            <Text>{JSON.stringify(selectedEvent)}</Text>
            <Text onPress={handleCloseModal}>Cancel</Text>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Timetable;

const styles = StyleSheet.create({
  container: {
    // height: hp('40%'),
  },
});