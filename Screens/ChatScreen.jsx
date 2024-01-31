import {
  Image,
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
import Ionicons from '@expo/vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userData = querySnapshot.docs.map((doc) => doc.data());
      setUsers(userData);
    } catch (error) {
      console.error('Error getting users: ', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <VirtualizedList
        data={users}
        initialNumToRender={8}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChatBox', {
                recipientUserId: item.userId,
                userName: item.username,
              });
            }}
            style={styles.textContainer}
          >
            <View>
              <Image
                source={{
                  uri:
                    item.image ||
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              />
            </View>
            <View style={styles.rowTwo}>
              <Text
                style={{ fontWeight: '500', fontSize: 16, marginBottom: 3 }}
              >
                {item.username}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="checkmark-done-outline"
                  color="skyblue"
                  size={18}
                  style={{
                    marginRight: 5,
                  }}
                />
                <Text>End Femicide ...</Text>
              </View>
            </View>

            <View style={styles.rowThree}>
              <Text>12:55 a.m</Text>
              <Text>Online</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.userId}
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    backgroundColor: COLORS.COLOR_10,
    borderRadius: 3,
  },
  rowThree: {
    paddingHorizontal: 6,
    alignItems: 'flex-end',
  },
  rowTwo: {
    flex: 1,
    paddingHorizontal: 6,
    justifyContent: 'space-between',
  },
});
