// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAoogjReqaiVurHoUc0a9GJw-JYTmh0klw",
    authDomain: "celiac-community.firebaseapp.com",
    projectId: "celiac-community",
    storageBucket: "celiac-community.firebasestorage.app",
    messagingSenderId: "199525229209",
    appId: "1:199525229209:web:cb48f1fcca00d100768e08",
    measurementId: "G-BQZJWJS416"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
