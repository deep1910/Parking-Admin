// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ2w5mmSSDVfb0xCAEhy7pGICmkDapS04",
  authDomain: "tutor-93492.firebaseapp.com",
  databaseURL: "https://tutor-93492-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tutor-93492",
  storageBucket: "tutor-93492.appspot.com",
  messagingSenderId: "422544221469",
  appId: "1:422544221469:web:8aa27ba8defc8f1cec2df4",
  measurementId: "G-5NKGYE87GD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);

export default app;


// export const signUp = async (email, password) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
//       return userCredential.user; // this is the user that was created
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }
  
//   export const signIn = async (email, password) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
//       return userCredential.user; // this is the signed in user
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }