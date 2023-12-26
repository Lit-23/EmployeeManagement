// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "employee-management-9707e.firebaseapp.com",
  projectId: "employee-management-9707e",
  storageBucket: "employee-management-9707e.appspot.com",
  messagingSenderId: "907566209052",
  appId: "1:907566209052:web:74424b45d617528c89e7d9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);