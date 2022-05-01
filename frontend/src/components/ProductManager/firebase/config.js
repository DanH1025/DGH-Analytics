import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCzmWbKhEgeUEgw-S9W2opRSg8lM8V0cRg",
  authDomain: "e-comm-e8626.firebaseapp.com",
  projectId: "e-comm-e8626",
  storageBucket: "e-comm-e8626.appspot.com",
  messagingSenderId: "307238169951",
  appId: "1:307238169951:web:0e390207d57ecb67d1daea"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
