import { initializeApp } from "firebase/app";

const firebaseConfig = {
    // Suas configurações do Firebase aqui
    apiKey: "AIzaSyAtPL4hrpRVce_v2Bi9_l8uiRIwrAGSgF0",
    authDomain: "metro-rec-fac.firebaseapp.com",
    projectId: "metro-rec-fac",
    storageBucket: "metro-rec-fac.appspot.com",
    messagingSenderId: "382659077949",
    appId: "1:382659077949:web:f6e02fd732c9431e224754"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
