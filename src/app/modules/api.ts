import {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} from "@env";
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

console.log("Firebase Config:", firebaseConfig);

const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
const auth = initializeAuth(app);

export { auth };
