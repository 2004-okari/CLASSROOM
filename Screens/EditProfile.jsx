import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import {
  Button,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import TextInput from 'react-native-text-input-interactive';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import PhoneInput from "react-native-phone-number-input";

const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userData = querySnapshot.docs.map((doc) => doc.data())[0];
      setUserData(userData);
      setName(userData.name);
      setAdmissionNumber(userData.admissionNumber);
      setCourse(userData.course);
      setEmail(userData.email);
      setImage(userData.image);
      setPhoneNumber(userData.phoneNumber);
      setUsername(userData.username);
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    const userDoc = doc(db, 'users', userData.id);
    await updateDoc(userDoc, {
      name: name,
      admissionNumber: admissionNumber,
      course: course,
      email: email,
      image: image,
      phoneNumber: phoneNumber,
      username: username,
    });
  };

  const data = [
    {
      label: 'Computer Science',
      value: '1',
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Name:</Text>
        <TextInput
          placeholder="Okari Nyandika"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text>Admission Number:</Text>
        <TextInput
          placeholder="****/****/****"
          value={admissionNumber}
          onChangeText={(text) => setAdmissionNumber(text)}
        />
        <Text>Course:</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select course' : '...'}
          searchPlaceholder="Search..."
          value={course}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCourse(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
        <Text>Email:</Text>
        <TextInput
          placeholder="okari@students.uonbi.ac.ke"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>Image:</Text>
        <TextInput value={image} onChangeText={(text) => setImage(text)} />
        <Text>Phone Number:</Text>
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Text>Username:</Text>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Button title="Update" onPress={handleUpdate} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
