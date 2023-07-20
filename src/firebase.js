// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1Y_nnR_RaJSPqf17IUhTDz-28pOfPAPE",
  authDomain: "resumemaker-39d69.firebaseapp.com",
  projectId: "resumemaker-39d69",
  storageBucket: "resumemaker-39d69.appspot.com",
  messagingSenderId: "609321249326",
  appId: "1:609321249326:web:736426aa2b6496599a8dbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();
export const createUser = createUserWithEmailAndPassword;
