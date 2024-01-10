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
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleEmailChange = (inputText) => {
    setEmail(inputText);
    setCredentials({ ...credentials, email: inputText });
  };

  const handlePasswordChange = (inputText) => {
    setPassword(inputText);
    setCredentials({ ...credentials, password: inputText });
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
        console.log(user);
        AsyncStorage.setItem("userData", JSON.stringify(credentials));

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
        {/* <Image source={require('../assets/5098293.jpg')} style={styles.image} /> */}
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
          // iconImageSource={
          //   isPasswordVisible ? require('../assets/favicon.png') : require('../assets/favicon.png')
          // }
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
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TEXT1,
  },
  image: {
    height: wp('60%'),
    aspectRatio: 16 / 9,
    resizeMode: 'contain',
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
  error: {
    marginBottom: wp('1%'),
    color: COLORS.COLOR_15,
  },
  errorEmail: {
    color: COLORS.COLOR_15,
  },
  text1: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    marginBottom: wp('1.5%'),
    marginTop: wp('6%'),
  },
  text2: {
    fontSize: wp('5%'),
    fontWeight: 'regular',
    marginBottom: wp('4%'),
    letterSpacing: 0.5,
  },
  button: {
    width: wp('90%'),
    backgroundColor: COLORS.BG1,
    marginVertical: wp('2.5%'),
    height: hp('6.2%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text3: {
    textAlign: 'center',
    fontSize: wp('8%'),
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.TEXT1,
  },
  lineContainer: {
    width: wp('90%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: wp('4%'),
    paddingHorizontal: wp('1%'),
  },
  line: {
    width: wp('37%'),
    height: hp('0.5%'),
    backgroundColor: COLORS.BG2,
    borderRadius: 6,
  },
  text4: {
    fontSize: wp('5%'),
    letterSpacing: 1,
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text5: {
    fontSize: wp('4.5%'),
    letterSpacing: 1,
    textAlign: 'center',
  },
  text6: {
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
    textAlign: 'center',
    letterSpacing: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
