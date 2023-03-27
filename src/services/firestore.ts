import firebase, { getApp, getApps, initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  // storageBucket: Constants.manifest.extra.storageBucket,
  // messagingSenderId: Constants.manifest.extra.messagingSenderId,
  // appId: Constants.manifest.extra.appId,
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore();
console.log("Initialized Firebase");

export { firebaseApp, firestore };
