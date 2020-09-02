import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAJywwq6ByhZ-QQG3Etw5kY1RGEBlVhZww",
  authDomain: "crud-8eb58.firebaseapp.com",
  databaseURL: "https://crud-8eb58.firebaseio.com",
  projectId: "crud-8eb58",
  storageBucket: "crud-8eb58.appspot.com",
  messagingSenderId: "265983339404",
  appId: "1:265983339404:web:235804bbb3e77ee51ac4a9",
  measurementId: "G-4BXSCCY4NE",
};

// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
