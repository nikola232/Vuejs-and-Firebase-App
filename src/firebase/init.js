import firebase from "firebase";
import firestore from "@firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCfKkHlxg8JI1N9b_MJvccf7tVkAkDC1vk",
  authDomain: "vuejs-and-firebase-app-25ef2.firebaseapp.com",
  databaseURL: "https://vuejs-and-firebase-app-25ef2.firebaseio.com",
  projectId: "vuejs-and-firebase-app-25ef2",
  storageBucket: "vuejs-and-firebase-app-25ef2.appspot.com",
  messagingSenderId: "439762396357",
  appId: "1:439762396357:web:2dcf35181b32aee4383cac",
  measurementId: "G-7MR04D363L"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();
