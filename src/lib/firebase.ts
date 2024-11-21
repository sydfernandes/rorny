'use client';

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_ft-aJS_IaT6UGRwUl7h3T-nk21B6Xv8",
  authDomain: "rornyapp.firebaseapp.com",
  projectId: "rornyapp",
  storageBucket: "rornyapp.appspot.com",
  messagingSenderId: "30371314394",
  appId: "1:30371314394:web:ab8fc4072d2c55327383e3",
  measurementId: "G-NC52QV4ZEK"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Enable persistence
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
      console.error('Error setting persistence:', error);
    });
}

export { app, auth };
