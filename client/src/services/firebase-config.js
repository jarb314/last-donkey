// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
// import "firebase/compat/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDINxZauR9WclNstzc-__Z9UlLhiKDvurQ",
  authDomain: "last-donkey-e94fc.firebaseapp.com",
  projectId: "last-donkey-e94fc",
  storageBucket: "last-donkey-e94fc.appspot.com",
  messagingSenderId: "305851546838",
  appId: "1:305851546838:web:09bb9acd6683aeffe55d77",
  measurementId: "G-Y05BTLT8QD",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
// export const db = app.firestore();

// const analytics = getAnalytics(app);

// export const auth = firebase.auth();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });

// export const signInWithGoogle = () => auth.signInWithPopup(provider);
