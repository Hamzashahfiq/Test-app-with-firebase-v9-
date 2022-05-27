import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"



const firebaseConfig = {
    apiKey: "AIzaSyALB0QC0ZFXYX70dJ6zBXtEykvC7opu5C0",
    authDomain: "practics-v9.firebaseapp.com",
    projectId: "practics-v9",
    storageBucket: "practics-v9.appspot.com",
    messagingSenderId: "1056020601724",
    appId: "1:1056020601724:web:99fd6fa087d03728eaa2f9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);



