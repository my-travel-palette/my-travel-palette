// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAl81OMUrTuc7ufrT7ffLNO-qxo6hgrw78",
    authDomain: "my-travel-palette.firebaseapp.com",
    databaseURL: "https://my-travel-palette-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "my-travel-palette",
    storageBucket: "my-travel-palette.firebasestorage.app",
    messagingSenderId: "812088333965",
    appId: "1:812088333965:web:b6714238b6c4d453e934c4"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});