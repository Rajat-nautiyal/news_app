import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoH33rnBPBF5BplbN2RXVF5I3O5-aS49k",
  authDomain: "fir-chatapp-82a43.firebaseapp.com",
  projectId: "fir-chatapp-82a43",
  storageBucket: "fir-chatapp-82a43.appspot.com",
  messagingSenderId: "127437389220",
  appId: "1:127437389220:web:4de09ea8c8b238e083d531"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp); //Add to Initialize Authentication
export const database = getDatabase(firebaseApp); //Add to Initialize Reatime Database
export const firestore = getFirestore(firebaseApp); //Add to Initialize Firestore Database
export const storage = getStorage(firebaseApp);