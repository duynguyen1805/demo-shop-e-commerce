import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-QNZGE69QC9",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth, firebase };

export const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
