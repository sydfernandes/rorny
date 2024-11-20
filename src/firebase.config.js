// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_ft-aJS_IaT6UGRwUl7h3T-nk21B6Xv8",
  authDomain: "rornyapp.firebaseapp.com",
  projectId: "rornyapp",
  storageBucket: "rornyapp.firebasestorage.app",
  messagingSenderId: "30371314394",
  appId: "1:30371314394:web:ab8fc4072d2c55327383e3",
  measurementId: "G-NC52QV4ZEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
