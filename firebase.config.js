// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTlTh9SFo-vcl1clgT6eQmYjVxzdTpu1I",
  authDomain: "classroom-c17b6.firebaseapp.com",
  projectId: "classroom-c17b6",
  storageBucket: "classroom-c17b6.appspot.com",
  messagingSenderId: "530677863892",
  appId: "1:530677863892:web:4db31b63788b2c996f7241"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authentication = getAuth(app);