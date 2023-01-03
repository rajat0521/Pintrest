// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDGcd7xBm1PVvaSETgFLwYTFDaQWIUR5Os",
    authDomain: "pintrest-cb187.firebaseapp.com",
    projectId: "pintrest-cb187",
    storageBucket: "pintrest-cb187.appspot.com",
    messagingSenderId: "811783690428",
    appId: "1:811783690428:web:62f545956b3654457498b9",
    measurementId: "G-6CXCEFDDCH"
  };


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const stortage = getStorage(firebaseApp);


export { auth, provider, stortage };
export default db;
