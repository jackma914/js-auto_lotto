// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDR_6zhhvdqMXyPGGRpBlIeqAMeaIcrkIg",
  authDomain: "react-auction-65c3d.firebaseapp.com",
  projectId: "react-auction-65c3d",
  storageBucket: "react-auction-65c3d.appspot.com",
  messagingSenderId: "1025272867377",
  appId: "1:1025272867377:web:7a5d300221561758328310",
  measurementId: "G-BTJH20WPS0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
