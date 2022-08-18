// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfEWggGRt0uJs7T7MBNO1CpajhLWDkWvA",
  authDomain: "changa-app-80282.firebaseapp.com",
  projectId: "changa-app-80282",
  storageBucket: "changa-app-80282.appspot.com",
  messagingSenderId: "1001351434564",
  appId: "1:1001351434564:web:f2bc55cad2cf0c95654711",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
