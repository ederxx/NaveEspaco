// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOZOM6-dNokue_tVitqWI2K9afDgXUKVw",
  authDomain: "espaconave-ec53b.firebaseapp.com",
  projectId: "espaconave-ec53b",
  storageBucket: "espaconave-ec53b.firebasestorage.app",
  messagingSenderId: "325210521630",
  appId: "1:325210521630:web:4362c1db65c6172b4d2e0f",
  measurementId: "G-DRPNFRZ5RJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };