import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getDatabase} from 'firebase/database'
 
const firebaseConfig = {
  apiKey: "AIzaSyB8BUXiySRyclXAit2EQwKNC48eWtu1gPA",
  authDomain: "app-proyecto-5b25a.firebaseapp.com",
  projectId: "app-proyecto-5b25a",
  storageBucket: "app-proyecto-5b25a.firebasestorage.app",
  messagingSenderId: "864349984597",
  appId: "1:864349984597:web:42740e1aba1c8204cc41dc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

