import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Profile = () => {
  return (
    <View>
      <View>
        <Image
          source={require('../assets/images/id.jpeg')}
          style={styles.idImage}
        />
        <Image
          source={require('../assets/images/id.jpeg')}
          style={styles.profileImage}
        />
      </View>
      <ScrollView>
        <View>
          <Text>Okari Nyandika</Text>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity onPress={() => {

        }}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    width: '100%', 
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  idImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
});
