// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBENLoYm8sYdE76uGsgKoAGzYcUj3Y-6U",
  authDomain: "swiggy-2c564.firebaseapp.com",
  projectId: "swiggy-2c564",
  storageBucket: "swiggy-2c564.appspot.com",
  messagingSenderId: "771852441206",
  appId: "1:771852441206:web:205af857adaf681e713157",
  measurementId: "G-YMB7N5CKJF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const database = getFirestore(app);
export const auth = getAuth();
