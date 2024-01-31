// import React, { useCallback, useEffect, useState } from 'react';
// import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
// import { storage, db, authentication } from '../firebase.config';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { Ionicons } from '@expo/vector-icons';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import * as ImagePicker from 'expo-image-picker';

// // State to display extra accesories,
// // for example map, media and audio controls

// // const [toogle, setToggle] = useState(false);
// // const [toogle, setToggle] = useState(false);
// // const [toogle, setToggle] = useState(false);
// // const [toogle, setToggle] = useState(false);
// // const [toogle, setToggle] = useState(false);
// // const [toogle, setToggle] = useState(false);

// const ChatScreen = ({ route }) => {
//   const { recipientUserId } = route.params;
//   const [greetingMessage, setGreetingMessage] = useState('');

//   const greetingsArray = [
//     'Hello', // English
//     'Bonjour', // French
//     'Hola', // Spanish
//     'Ciao', // Italian
//     'Hallo', // German
//     'Olá', // Portuguese
//     'Привет', // Russian
//     '你好', // Chinese (Simplified)
//     'こんにちは', // Japanese
//     '안녕하세요', // Korean
//     'Merhaba', // Turkish
//     'مرحبا', // Arabic
//   ];

//   useEffect(() => {
//     let currentIndex = 0;

//     const intervalId = setInterval(() => {
//       setGreetingMessage(greetingsArray[currentIndex]);
//       currentIndex = (currentIndex + 1) % greetingsArray.length;
//     }, 1500);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   const [messages, setMessages] = useState([]);
//   const user = {
//     _id: authentication.currentUser.uid,
//     name: authentication.currentUser.displayName,
//     avatar: authentication.currentUser.photoURL,
//   };

//   const messagesRef = collection(db, 'messages');

//   useEffect(() => {
//     const q = query(
//       messagesRef,
//       orderBy('createdAt', 'desc') // Newest messag
//     );

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const newMessages = [];
//       querySnapshot.forEach((doc) => {
//         const messageData = doc.data();
//         // Check if the message is sent to the current user or sent by the current user
//         if (
//           (messageData.recipientId === user._id && messageData.senderId === recipientUserId) ||
//           (messageData.recipientId === recipientUserId && messageData.senderId === user._id)
//         ) {
//           const message = {
//             _id: doc.id,
//             text: messageData.text,
//             createdAt: messageData.createdAt.toDate(),
//             user: {
//               _id: messageData.senderId,
//               name: messageData.senderName,
//               avatar: messageData.senderAvatar,
//             },
//           };
//           newMessages.push(message);
//         }
//       });
//       setMessages(newMessages); // Reverse to display newest at the bottom
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [recipientUserId]);

//   const renderBubble = (props) => {
//     const { currentMessage } = props;
//     const isCurrentUser = currentMessage.user._id === user._id;

//     if (currentMessage.image) {
//       console.log('Image URL:', currentMessage.image); // Debugging line
//       return (
//         <View style={{ flexDirection: 'column' }}>
//           <Image source={{ uri: currentMessage.image }} style={{ width: 200, height: 200 }} />
//           <Text>{currentMessage.text}</Text>
//         </View>
//       );
//     } else {
//       return (
//         <View
//           style={{
//             backgroundColor: isCurrentUser ? 'lightblue' : 'lightgreen',
//             borderRadius: 10,
//             padding: 10,
//           }}
//         >
//           <Text>{currentMessage.text}</Text>
//         </View>
//       );
//     }
//   };

//   const customTextInputStyle = {
//     backgroundColor: 'lightgray',
//     fontSize: 16,
//     borderColor: 'gray',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 22,
//   };

//   const customScrollToBottom = () => (
//     <View>
//       <Ionicons name="chevron-down-circle-outline" color="red" size={22} />
//     </View>
//   );

//   const openCamera = async () => {
//     let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert('Permission to access camera was denied');
//       return;
//     }

//     let pickerResult = await ImagePicker.launchCameraAsync();
//     if (pickerResult.canceled) {
//       console.log('User cancelled camera operation');
//       return;
//     }
//     console.log(pickerResult);
//   };

//   const openImageLibrary = async () => {
//     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert('Permission to access media library was denied');
//       return;
//     }

//     let pickerResult = await ImagePicker.launchImageLibraryAsync();
//     if (pickerResult.canceled) {
//       console.log('User cancelled image library operation');
//       return;
//     }

//     // Access the selected asset through the "assets" array
//     if (pickerResult.assets && pickerResult.assets.length > 0) {
//       const asset = pickerResult.assets[0];
//       const imageUrl = await uploadImage(asset.uri);
//       onSend([
//         {
//           _id: Math.random().toString(),
//           text: '',
//           createdAt: new Date(),
//           user: user,
//           image: imageUrl,
//         },
//       ]);
//     }
//   };

//   const onSend = async (newMessages = []) => {
//     try {
//       const messagePromises = newMessages.map(async (message) => {
//         const messageData = {
//           text: message.text || '',
//           createdAt: message.createdAt,
//           senderId: user._id,
//           senderName: user.name,
//           senderAvatar: user.avatar,
//           recipientId: recipientUserId,
//           image: message.image || '',
//         };
//         await addDoc(messagesRef, messageData);
//       });

//       await Promise.all(messagePromises);
//     } catch (error) {
//       console.error('Error sending messages:', error);
//     }
//   };

//   const uploadImage = async (uri) => {
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     const storageRef = ref(storage, `images/${Date.now()}`);
//     const uploadTask = uploadBytesResumable(storageRef, blob);

//     return new Promise((resolve, reject) => {
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           // Progress function
//         },
//         (error) => {
//           // Error function
//           reject(error);
//         },
//         () => {
//           // Complete function
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(newMessages) => onSend(newMessages)}
//       user={user}
//       placeholder="greetingMessage"
//       renderBubble={renderBubble}
//       alwaysShowSend={true}
//       scrollToBottom={true}
//       textInputStyle={customTextInputStyle}
//       scrollToBottomComponent={customScrollToBottom}
//       renderChatEmpty={() => (
//         <>
//           <Image source={require('../assets/549345.jpg')} />
//         </>
//       )}
//       renderAccessory={() => (
//         <View style={styles.accessoryContainer}>
//           <TouchableOpacity onPress={openCamera} style={styles.accessoryButton}>
//             <Text>Open Camera</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={openImageLibrary} style={styles.accessoryButton}>
//             <Text>Open Image Library</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     />
//     );
//   };

//   export default ChatBox;
// const styles = StyleSheet.create({
//   accessoryContainer: {
//     height: wp('20%'),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'lightgray',
//     marginBottom: 19,
//   },
//   accessoryButton: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//     backgroundColor: 'white',
//     marginHorizontal: 5,
//     borderRadius: 5,
//   },
// });

import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { authentication, db } from '../firebase.config';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

const ChatBox = ({ route }) => {
  const { recipientUserId, userName } = route.params;
  const [messages, setMessages] = useState([]);

  const user = {
    _id: authentication.currentUser.uid,
    name: authentication.currentUser.displayName,
    avatar: authentication.currentUser.photoURL,
  };

  const messagesRef = collection(db, 'messages');

  const onSend = async (newMessages = []) => {
    try {
      const messagePromises = newMessages.map(async (message) => {
        const messageData = {
          text: message.text || '',
          createdAt: message.createdAt,
          senderId: user._id,
          senderName: user.name,
          senderAvatar: user.avatar,
          recipientId: recipientUserId,
          image: message.image || '',
        };
        console.log('Sending message data:', messageData);
        
        await addDoc(messagesRef, messageData);
      });

      await Promise.all(messagePromises);
    } catch (error) {
      console.error('Error sending messages:', error);
    }
  };

  useEffect(() => {
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages = [];
      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        // Check if the message is sent to the current user or sent by the current user
        if (
          (messageData.recipientId === user._id &&
            messageData.senderId === recipientUserId) ||
          (messageData.recipientId === recipientUserId &&
            messageData.senderId === user._id)
        ) {
          const message = {
            _id: doc.id,
            text: messageData.text,
            createdAt: messageData.createdAt.toDate(),
            user: {
              _id: messageData.senderId,
              name: messageData.senderName,
              avatar: messageData.senderAvatar,
            },
          };
          newMessages.push(message);
        }
      });
      setMessages(newMessages); // Reverse to display newest at the bottom
    });

    return () => {
      unsubscribe();
    };
  }, [recipientUserId]);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <Ionicons name="paper-plane-outline" size={20} color="blue" />
        </View>
      </Send>
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      isTyping
      alwaysShowSend
      scrollToBottom
      onPressActionButton={() => {}}
      // renderInputToolbar={() => {}}
      renderSend={renderSend}
      textInputProps={{
        placeholder: 'Hello, World!',
        placeholderColor: 'blue',
      }}
      textInputStyle={{
        marginRight: 20,
        backgroundColor: 'lightgray',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingHorizontal: 5,
      }}
      renderChatEmpty={() => <View></View>}
      user={user}
    />
  );
};

export default ChatBox;

const styles = StyleSheet.create({
  accessoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
});
