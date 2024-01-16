import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage as rp } from 'react-native-responsive-fontsize';
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';
import TextInput from 'react-native-text-input-interactive';
import COLORS from '../Constants/colors';
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase.config';

const Update = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [note, setNote] = useState('');
  const [eventsArray, setEventsArray] = useState([]);

  const eventsRef = collection(db, 'events');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'events'),
          orderBy('createdAt', 'asc')
        );
        const newEvents = [];

        querySnapshot.forEach((doc) => {
          const eventData = doc.data();

          const eventDetails = {
            id: doc.id,
            title: eventData.title,
            month: eventData.month,
            date: eventData.date,
            time: eventData.time,
            venue: eventData.venue,
            note: eventData.note,
          };

          newEvents.push(eventDetails);

          // Log each event
          console.log('Event:', eventDetails);
        });

        // Set the eventsArray state
        setEventsArray(newEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  const handleEventFieldChange = (field, value) => {
    switch (field) {
      case 'title':
        setTitle(value);
        break;
      case 'month':
        setMonth(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'time':
        setTime(value);
        break;
      case 'venue':
        setVenue(value);
        break;
      case 'note':
        setNote(value);
        break;
      default:
        break;
    }
  };

  const handleAddEvent = () => {
    const newEvent = {
      title,
      month,
      date,
      time,
      venue,
      note,
    };

    addDoc(eventsRef, newEvent)
      .then(() => {
        console.log('Okkari');
      })
      .catch((error) => {
        console.error('Error adding event: ', error);
      });
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Upcoming events</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButton}>Add Event</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons
              name="close-outline"
              size={24}
              color={COLORS.BG2}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
              }}
            />
          </TouchableOpacity>
          {/* Inputs go here */}
          <TextInput
            onChangeText={(value) => handleEventFieldChange('title', value)}
            placeholder="Title"
            value={title}
            mainColor={COLORS.BG2}
            originalColor="transparent"
            animatedPlaceholderTextColor="#757575"
            textInputStyle={styles.inputText}
            enableIcon={false}
          />
          <TextInput
            onChangeText={(value) => handleEventFieldChange('month', value)}
            placeholder="Month"
            value={month}
            mainColor={COLORS.BG2}
            originalColor="transparent"
            animatedPlaceholderTextColor="#757575"
            textInputStyle={styles.inputText}
            enableIcon={false}
          />
          <TextInput
            onChangeText={(value) => handleEventFieldChange('date', value)}
            placeholder="Date"
            value={date}
            mainColor={COLORS.BG2}
            originalColor="transparent"
            animatedPlaceholderTextColor="#757575"
            textInputStyle={styles.inputText}
            enableIcon={false}
          />
          <TextInput
            onChangeText={(value) => handleEventFieldChange('time', value)}
            placeholder="Time"
            value={time}
            mainColor={COLORS.BG2}
            originalColor="transparent"
            animatedPlaceholderTextColor="#757575"
            textInputStyle={styles.inputText}
            enableIcon={false}
          />
          <TextInput
            onChangeText={(value) => handleEventFieldChange('venue', value)}
            placeholder="Venue"
            value={venue}
            mainColor={COLORS.BG2}
            originalColor="transparent"
            animatedPlaceholderTextColor="#757575"
            textInputStyle={styles.inputText}
            enableIcon={false}
          />
          <TextInput
            onChangeText={(value) => handleEventFieldChange('note', value)}
            placeholder="Note"
            value={note}
            mainColor={COLORS.BG2}
            originalColor="transparent"
            animatedPlaceholderTextColor="#757575"
            textInputStyle={styles.inputText}
            enableIcon={false}
          />
          <Button title="Add note" onPress={handleAddEvent} />
        </View>
      </Modal>

      <View style={styles.flatlistContainer}>
        <FlatList
          data={eventsArray}
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
              <View style={styles.eventLocation}>
                <Text>Event : </Text>
                <Text style={styles.eventTitle}>{item.title}</Text>
              </View>
              <View style={styles.eventLocation}>
                <Text>Note : </Text>
                <Text style={styles.eventDetails5}>{item.note}</Text>
              </View>
              <View style={styles.eventLocation}>
                <Text>Location : </Text>
                <Text style={styles.eventDetails4}>{item.venue}</Text>
              </View>
            </View>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventList}
        />
      </View>
    </View>
  );
};

export default Update;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerText: {
    textAlign: 'center',
    fontSize: rp(2.5),
    fontWeight: 'bold',
  },
  addButton: {
    fontSize: rp(2),
    color: COLORS.COLOR_11,
    fontWeight: '500',
  },
  modalContainer: {
    padding: wp('1%'),
    backgroundColor: 'red',
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: COLORS.TEXT3,
    aspectRatio: 1,
    alignSelf: 'flex-end',
    borderRadius: 5,
    width: 'auto',
  },
  flatlistContainer: {
    paddingVertical: hp('0.5%'),
    paddingHorizontal: hp('0.5%'),
  },
  eventItem: {
    backgroundColor: COLORS.TEXT1,
    marginRight: wp('2%'),
    padding: wp('2%'),
    borderRadius: wp('2%'),
    width: wp('85%'),
  },
  eventDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('2%'),
    borderRadius: 4,
    backgroundColor: COLORS.TEXT3,
    marginBottom: 4,
  },
  eventDateDetails: {
    flexDirection: 'column',
    color: COLORS.BG2,
  },
  eventDetails1: {
    marginLeft: 3,
    fontWeight: '400',
  },
  eventDetails2: {
    fontSize: rp(3.5),
    fontWeight: '900',
  },
  eventDetails3: {
    fontSize: rp(3),
    fontWeight: '800',
  },
  eventDetails5: {
    fontSize: rp(2),
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: rp(2),
    fontWeight: '600',
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  eventDetails4: {
    fontSize: rp(2),
    fontWeight: '600',
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 5,
    height: hp('6.5%'),
    padding: wp('1%'),
    marginVertical: wp('1%'),
    fontSize: wp('5.5%'),
    backgroundColor: COLORS.BG1,
  },
});
