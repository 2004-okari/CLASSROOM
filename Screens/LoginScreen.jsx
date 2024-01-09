import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../Constants/colors';
import TextInput from 'react-native-text-input-interactive';
import { authentication } from '../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  const handleEmailChange = (inputText) => {
    setEmail(inputText);
  };

  const handlePasswordChange = (inputText) => {
    setPassword(inputText);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const onBlurEmail = () => {
    if (!isEmailValid(email)) {
      setEmailValidationMessage('Please enter a valid email address.');
    } else {
      setEmailValidationMessage('');
    }
  };
  // Set up authentication with firebase (signin);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isPassWrong, setPassWrong] = useState(false);

  const signInUser = () => {
    if (!isEmailValid(email)) {
      setEmailValid(false);
      return;
    }

    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        AsyncStorage.setItem('userId', user.uid);  // Save user ID to AsyncStorage
        setIsSignedIn(true);
        navigation.navigate('Home', {name: userCredential.displayName});
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert(
            'User Not Found, Register',
            'The provided email address is not registered. Please sign up instead.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
          navigation.navigate('Signup');
        } else {
          console.error('Error signing in user:' + error.message);
        }

        if (error.code === 'auth/wrong-password') {
          setPassWrong(true);
          setTimeout(() => {
            setPassWrong(false);
          }, 3000)
        }
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/5098293.jpg')} style={styles.image} />
      </View>
      <View>
        <Text style={styles.text1}>Login</Text>
        <Text style={styles.text2}>Please Signin to continue.</Text>
        {emailValidationMessage ? (
        <Text style={styles.errorEmail}>{emailValidationMessage}</Text>
        ) : null}
        <TextInput
          onChangeText={handleEmailChange}
          mainColor={COLORS.BG2}
          originalColor="transparent"
          animatedPlaceholderTextColor="#757575"
          placeholder="Email Address"
          textInputStyle={styles.inputText}
          value={email}
          onBlur={onBlurEmail}
        />
        <TextInput
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={handlePasswordChange}
          mainColor={COLORS.BG2}
          textInputStyle={styles.inputText}
          enableIcon={true}
          placeholder="Password"
          onIconPress={togglePasswordVisibility}
          iconImageSource={
            isPasswordVisible ? require('../assets/favicon.png') : require('../assets/favicon.png')
          }
        />
        {isPassWrong ? <Text style={styles.error}>Password is wrong</Text> : ''}
        <TouchableOpacity style={styles.button} onPress={signInUser}>
          <Text style={styles.text3}>Login</Text>
        </TouchableOpacity>
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          <Text style={styles.text4}>or</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.account}>
          <Text style={styles.text5}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.text6}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen

const styles = StyleSheet.create({})