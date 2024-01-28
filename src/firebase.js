// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMByRJdvcrT1w1qJkSMxoo9HjmvsNSg6o",
  authDomain: "tweetx-8254d.firebaseapp.com",
  projectId: "tweetx-8254d",
  storageBucket: "tweetx-8254d.appspot.com",
  messagingSenderId: "1029493419241",
  appId: "1:1029493419241:web:3738f0c2a4d102b0565478",
  measurementId: "G-7F71ND2KWZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
