import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from '@expo/vector-icons/Ionicons';

const Profile = () => {
  const [feeds, setFeeds] = useState([]);
  const [modal, setModal] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setModal(!modal);
        }}
        style={styles.idImage}
      >
        <Image
          source={require('../assets/images/id.jpeg')}
          style={styles.idImage}
        />
      </TouchableOpacity>
      <Modal isVisible={modal}>
        <View style={{marginTop: 40}}>
          <TouchableOpacity onPress={() => setModal(!modal)}>
            <Ionicons name="close" size={30} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Image
            source={require('../assets/images/id.jpeg')}
            style={styles.idImage}
          />
          <Image
            source={require('../assets/images/id.jpeg')}
            style={styles.idImage}
          />
        </ScrollView>
      </Modal>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Image
            source={require('../assets/images/id.jpeg')}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>Okari Nyandika</Text>
            <Text style={styles.registration}>SCS3/146649/2023</Text>
            <Text style={styles.registration}>nyandika15@gmail.com</Text>
          </View>
        </View>
        <View style={styles.feedsContainer}>
          {feeds.length === 0 ? (
            <View style={styles.emptyFeedsContainer}>
              <Text style={styles.emptyFeedsText}>
                Capture the moment with a friend
              </Text>
              <Button title="Create your first feed" />
            </View>
          ) : (
            <View>
              <Text>Posts ({feeds.length})</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Edit profile" />
          <Button title="Settings" />
          <Button title="Logout" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

// Add styles for the profile page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    padding: 10,
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  registration: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  feedsContainer: {
    marginTop: 10,
  },
  emptyFeedsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyFeedsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,

  },
  idImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 5,
  },
});
