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
        const querySnapshot = await getDocs(collection(db, 'events'), orderBy('createdAt', 'asc'));
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
      <View>
        <Text>Upcoming events</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text>Add Event</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible}>
        <View>
          <Text
            style={{ textAlign: 'center', backgroundColor: 'red' }}
            onPress={() => setModalVisible(false)}
          >
            cancel
          </Text>
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
    </View>
  );
};

export default Update;

const styles = StyleSheet.create({
  userName: {
    textAlign: 'center',
    fontSize: rp(3),
    fontWeight: 'bold',
    marginBottom: wp('2%'),
  },
  flatlistContainer: {
    // flex: 1,
    backgroundColor: 'green',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: hp('0.5%'),
  },
  eventItem: {
    backgroundColor: 'blue',
    marginRight: wp('2%'),
    padding: wp('2%'),
    borderRadius: wp('2%'),
    width: wp('85%'),
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
  inputText: {
    borderWidth: 1,
    borderRadius: 5,
    height: hp('6.5%'),
    padding: wp('1%'),
    marginVertical: wp('1%'),
    fontSize: wp('5.5%'),
    backgroundColor: COLORS.TEXT3,
  },
});
