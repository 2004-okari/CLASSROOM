import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../Constants/colors';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userData = querySnapshot.docs.map((doc) => doc.data());
      setUsers(userData);
      console.log(users);
    } catch (error) {
      console.error('Error getting users: ', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const goToChatBox = () => {
    navigation.navigate('ChatBox');
  }

  return (
    <>
      <VirtualizedList
        data={users}
        initialNumToRender={4}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={goToChatBox} style={styles.textContainer}>
            <Text>{item.username}</Text>
            <Text>12:55 a.m</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        style={styles.container}
      />
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 5,
    paddingBottom: 15,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: COLORS.COLOR_10,
    borderRadius: 3,
  },
});
