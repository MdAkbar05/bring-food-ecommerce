// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCQG2gejDaJJmQwbMzsGkfiRghBF3xoqQ",
  authDomain: "social-media-login-bcab1.firebaseapp.com",
  projectId: "social-media-login-bcab1",
  storageBucket: "social-media-login-bcab1.appspot.com",
  messagingSenderId: "375098272661",
  appId: "1:375098272661:web:6eb25be207a7fd090be49c",
  measurementId: "G-1DBLWS7Y0X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Initialize Facebook Auth instance
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
