import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
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

          signInWithEmailAndPassword(
            authentication,
            userData.email,
            userData.password
          )
            .then(() => {
              navigation.navigate('Home');
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
