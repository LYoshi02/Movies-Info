import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxKAMCrPe4V49zFR74oZBQCXQepERUXO8",
  authDomain: "movies-info-f83aa.firebaseapp.com",
  databaseURL: "https://movies-info-f83aa.firebaseio.com",
  projectId: "movies-info-f83aa",
  storageBucket: "movies-info-f83aa.appspot.com",
  messagingSenderId: "761193679809",
  appId: "1:761193679809:web:23fdf6a21fb9c914bebd40",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };