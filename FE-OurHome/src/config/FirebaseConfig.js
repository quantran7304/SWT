// config/FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFXOWHYctBvMoBcaY331u0iUGyWTMQTxE",
  authDomain: "ourhome-45c19.firebaseapp.com",
  projectId: "ourhome-45c19",
  storageBucket: "ourhome-45c19.appspot.com",
  messagingSenderId: "790453700928",
  appId: "1:790453700928:web:7f115abb1b3e728325d2a5",
  measurementId: "G-KK48L3C3C2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
