// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getFirestore as firestoreInstance 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCM17uBZknhqzT_-H1A_Jc410Utj6NBppo",
  authDomain: "mini-hackathone-35c4a.firebaseapp.com",
  projectId: "mini-hackathone-35c4a",
  storageBucket: "mini-hackathone-35c4a.firebasestorage.app",
  messagingSenderId: "941968400553",
  appId: "1:941968400553:web:7eeff773e8b1c6abdc09b8",
  measurementId: "G-N0JDH9D0GV"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  sendPasswordResetEmail,
  addDoc,
  collection,
  db,
  getDocs,
  doc,
  firestoreInstance
};
