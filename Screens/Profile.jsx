import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, Image, AsyncStorage } from 'react-native';

const Profile = () => {
  // Add state to store the profile's info
  const [username, setUsername] = useState('');
  const [imageUri, setImageUri] = useState('');

  // Helper function to sign out and clear AsyncStorage
  const signOut = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  // Profile page layout with input fields and sign out button
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Image source={{ uri: imageUri }} style={styles.profileImage} />
      <Button title="Sign Out" onPress={signOut} />
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
});
