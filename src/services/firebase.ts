import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCO9yjQ2u8Nk6GL6QcldTMdOFeedZfxPFA",
    authDomain: "memini-97038.firebaseapp.com",
    projectId: "memini-97038",
    storageBucket: "memini-97038.appspot.com",
    messagingSenderId: "433306291341",
    appId: "1:433306291341:web:12fbac29d23615971266c4",
    measurementId: "G-3REJMNMQY6"
  };
  

const app = firebase.initializeApp(firebaseConfig)
export const db = app.firestore()