import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase.config';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('userData')
      .then((value) => {
        if (value) {
          const userData = JSON.parse(value);
          console.log("Value:", value);
          console.log("Email:", userData.email);
          console.log("Password:", userData.password);
          signInWithEmailAndPassword(authentication, userData.email, userData.password)
            .then(() => {
              console.log("Just signed up!");
              navigation.navigate('Map');
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        } else {
          navigation.navigate('Login');
        }
      })
      .catch((error) => {
        console.error('Error while retrieving user data:', error);
      });
  }, []);

  return (
    <View>
      <View>
        <Text style={styles.userName}>Okari Nyandika</Text>
      </View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
