import {
    API_KEY,
    APP_ID,
    AUTH_DOMAIN,
    MESSAGING_SENDER_ID,
    PROJECT_ID,
    STORAGE_BUCKET
} from "@env";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
