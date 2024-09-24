
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjGjforVV47y5eD9jZqwokvE3EDZmSpDA",
  authDomain: "new-project-a151a.firebaseapp.com",
  projectId: "new-project-a151a",
  storageBucket: "new-project-a151a.appspot.com",
  messagingSenderId: "583747743669",
  appId: "1:583747743669:web:c397fcc795ce0e2661f3fc",
  measurementId: "G-Q4FGVWR4F1"
};

// Initializes your Firebase project using your app's credentials.
const app = initializeApp(firebaseConfig);

// Returns the authentication instance to use Firebase authentication methods.
export const auth = getAuth(app);

// Initializes Firestore, Firebase's NoSQL database.
export const db = getFirestore(app);

export const analytics = getAnalytics(app);