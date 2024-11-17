// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
    authDomain: "travel-planner-438a0.firebaseapp.com",
    projectId: "travel-planner-438a0",
    storageBucket: "travel-planner-438a0.appspot.com",
    messagingSenderId: "1007281510870",
    appId: "1:1007281510870:web:9f2b70c3cae43193a0ac77",
    measurementId: "G-CF99R5NME5"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);