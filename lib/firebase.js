import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCR_EJkpyznofKEh2hIufovYbShucrlno4",
  authDomain: "esports-management-service.firebaseapp.com",
  projectId: "esports-management-service",
  storageBucket: "esports-management-service.appspot.com",
  messagingSenderId: "467289672366",
  appId: "1:467289672366:web:ecfe54c446019371477b3f"
};

const initializeAuth = () => {
  initializeApp(firebaseConfig);
};

export default initializeAuth;
