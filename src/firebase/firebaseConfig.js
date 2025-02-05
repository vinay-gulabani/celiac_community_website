// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAoogjReqaiVurHoUc0a9GJw-JYTmh0klw",
  authDomain: "celiac-community.firebaseapp.com",
  projectId: "celiac-community",
  storageBucket: "celiac-community.firebasestorage.app",
  messagingSenderId: "199525229209",
  appId: "1:199525229209:web:cb48f1fcca00d100768e08",
  measurementId: "G-BQZJWJS416"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app); // Export Firestore instance

export default app;
