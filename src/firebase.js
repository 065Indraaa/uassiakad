// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQ7cTRkw8IiJZInu0uJA6tU7HW44Pc1EQ",
    authDomain: "uassiakad.firebaseapp.com",
    projectId: "uassiakad",
    storageBucket: "uassiakad.firebasestorage.app",
    messagingSenderId: "257897112931",
    appId: "1:257897112931:web:2f4b12f1d614e560fb5f56",
    measurementId: "G-LSS08XGGLC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
