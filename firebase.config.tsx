import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
  authDomain: "facebook-clone-fb6ac.firebaseapp.com",
  projectId: "facebook-clone-fb6ac",
  storageBucket: "facebook-clone-fb6ac.appspot.com",
  messagingSenderId: "1090270112131",
  appId: "1:1090270112131:web:d3fb35d709d5906eb0aeb6",
  measurementId: "G-QNZGE69QC9",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth, firebase };

export const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
