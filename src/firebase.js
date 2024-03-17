import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {browserLocalPersistence, getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyC9-DZK8IIzGL8BahKyMDqIgC5H-DxAMbU",
  authDomain: "proyecto-sistemas-de-inf-d69d5.firebaseapp.com",
  projectId: "proyecto-sistemas-de-inf-d69d5",
  storageBucket: "proyecto-sistemas-de-inf-d69d5.appspot.com",
  messagingSenderId: "948413579606",
  appId: "1:948413579606:web:c451eda71df9690f3cd6f7",
  measurementId: "G-MP3Z2ET1L3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
auth.setPersistence(browserLocalPersistence);
googleProvider.setCustomParameters({prompt: "select_account"});

export const storage = getStorage(app);