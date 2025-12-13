
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAaeJj3oCpfVQiPRcaj-olrUEKm7CS8ZCA",
  authDomain: "ecommerce-product-34802.firebaseapp.com",
  projectId: "ecommerce-product-34802",
  storageBucket: "ecommerce-product-34802.firebasestorage.app",
  messagingSenderId: "690085389278",
  appId: "1:690085389278:web:7ef4245bbb0640d684b34f",
  measurementId: "G-2KYN0JC2B9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (used for data fetching)
export const db = getFirestore(app);
