import { initializeApp } from "firebase/app"; // Inicializa la aplicación de Firebase
import { getAuth } from "firebase/auth"; // Otros servicios de Firebase
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPpAzodF4oHqLNtbjUd7ECglOwWMyBVmI",
  authDomain: "splitwise-8d605.firebaseapp.com",
  projectId: "splitwise-8d605",
  storageBucket: "splitwise-8d605.firebasestorage.app",
  messagingSenderId: "324796854669",
  appId: "1:324796854669:web:93448fce6bb53926f70dc4",
  measurementId: "G-4S63RHD0NS",
};

// Inicializa Firebase para Expo
const app = initializeApp(firebaseConfig); // Inicializa Firebase utilizando expo-firebase-core

// Ahora puedes usar los servicios de Firebase, como Authentication
export const auth = getAuth(app); // Firebase Auth
export const firestore = getFirestore(app);
