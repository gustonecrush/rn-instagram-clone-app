import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByHV29m8wfJT93OCrxbEEgHSVwBPoVNgM",
  authDomain: "rn-instagram-clone-34176.firebaseapp.com",
  projectId: "rn-instagram-clone-34176",
  storageBucket: "rn-instagram-clone-34176.appspot.com",
  messagingSenderId: "402153304276",
  appId: "1:402153304276:web:0432b105d740db6cf58b41",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth, firebase };
