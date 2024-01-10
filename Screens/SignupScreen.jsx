import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../Constants/colors';
import TextInput from 'react-native-text-input-interactive';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { authentication, db  } from '../firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [usernameValidationMessage, setUsernameValidationMessage] = useState('');
  const [usernameValid, setUsernameValid] = useState(true);

  const handleUsernameChange = (inputText) => {
    setUsername(inputText);
  };

  const handleEmailChange = (inputText) => {
    setEmail(inputText);
  };

  const handlePasswordChange = (inputText) => {
    setPassword(inputText);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isUsernameValid = (username) => {
    const usernamePattern = /^[a-zA-Z0-9._ ]{6,}$/;
    return usernamePattern.test(username);
  };

  const onBlurUsername = () => {
    if (!isUsernameValid(username)) {
      setUsernameValidationMessage('Please enter a valid username.');
    } else {
      setUsernameValidationMessage('');
    }
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

  const isPasswordValid = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const onBlurPassword = () => {
    if (!isPasswordValid(password)) {
      setPasswordValidationMessage(
        'Password must have at least 8 characters, 1 lowercase letter, 1 digit, and 1 special character.'
      );
    } else {
      setPasswordValidationMessage('');
    }
  };

  const [isSignedUp, setIsSignedUp] = useState(false);
  const registerUser = () => {
    if (!isUsernameValid(username)) {
      setUsernameValid(false);
    }

    if (!isEmailValid(email)) {
      setEmailValid(false);
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordValid(false);
      return;
    }

    createUserWithEmailAndPassword(authentication, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setUser(username);
      console.log(user);

      // AsyncStorage.setItem("user", JSON.stringify(user));

      // Set the displayName
      // await updateProfile(authentication.currentUser, {
      //   displayName: username,
      // });
        // Database connection
        // const userId = user.uid;
        // const userDocRef = doc(db, 'users', userId);
        // const docRef = setDoc(userDocRef, {
        //   username,
        //   email,
        //   password,
        //   userId,
        // });
      })
      .then(() => {
        setIsSignedUp(true);
        navigation.navigate('Login');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert(
            'Email Already in Use',
            'The provided email address is already registered. Please sign in instead.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
          setTimeout(() => {
            navigation.navigate('Login');
          }, 1000);
        } else {
          console.error('Error while signing up user: ' + error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View>
        {/* <Image source={require('../assets/6333050.jpg')} style={styles.image} /> */}
      </View>
      <View>
        <Text style={styles.text1}>Register</Text>
        <Text style={styles.text2}>Please Register to login.</Text>
        {usernameValidationMessage ? (
          <Text style={styles.errorEmail}>{usernameValidationMessage}</Text>
        ) : null}
        <TextInput
          onChangeText={handleUsernameChange}
          mainColor={COLORS.BG2}
          originalColor="transparent"
          animatedPlaceholderTextColor="#757575"
          placeholder="Username"
          textInputStyle={styles.inputText}
          value={username}
          enableIcon={false}
          onBlur={onBlurUsername}
        />
        {emailValidationMessage ? (
          <Text style={styles.errorEmail}>{emailValidationMessage}</Text>
        ) : null}
        <TextInput
          onChangeText={handleEmailChange}
          mainColor={COLORS.BG2}
          originalColor="transparent"
          animatedPlaceholderTextColor="#757575"
          placeholder="Email Adress"
          textInputStyle={styles.inputText}
          value={email}
          enableIcon={false}
          onBlur={onBlurEmail}
        />
        {passwordValidationMessage ? (
          <Text style={styles.errorEmail2}>{passwordValidationMessage}</Text>
        ) : null}
        <TextInput
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={handlePasswordChange}
          mainColor={COLORS.BG2}
          placeholder="Password"
          textInputStyle={styles.inputText}
          enableIcon={true}
          onBlur={onBlurPassword}
          onIconPress={togglePasswordVisibility}
          // iconImageSource={
          //   isPasswordVisible ? require('../assets/favicon.png') : require('../assets/favicon.png')
          // }
        />
        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <Text style={styles.text3}>Signup</Text>
        </TouchableOpacity>
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          <Text style={styles.text4}>or</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.account}>
          <Text style={styles.text5}>Already have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text6}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

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
  errorEmail: {
    color: COLORS.COLOR_15,
  },
  errorEmail2: {
    color: COLORS.COLOR_15,
    width: wp('80%'),
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
