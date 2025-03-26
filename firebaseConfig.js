import { initializeApp } from "firebase/app"; // Inicializa la aplicación de Firebase
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Otros servicios de Firebase
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const firestore = getFirestore(app);
