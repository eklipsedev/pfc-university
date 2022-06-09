import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage'
import "firebase/auth";
import "firebase/functions";

import flamelink from "flamelink";
import 'flamelink/content'
import 'flamelink/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDyz-J-_Oq67KRs4qBSyaWRHDLA6Xv0XZg",
  authDomain: "appjaxx.firebaseapp.com",
  databaseURL: "https://appjaxx.firebaseio.com",
  projectId: "appjaxx",
  storageBucket: "appjaxx.appspot.com",
  messagingSenderId: "268262145247",
  appId: "1:268262145247:web:b68e58543a7b242cd2fd6a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const app = flamelink({
  firebaseApp,
  env: 'production', // optional, defaults to `production`
  locale: 'en-US', // optional, defaults to `en-US`
  dbType: 'cf' // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Realtime DB vs Cloud Firestore)
})

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

export { app, db, auth, functions };
