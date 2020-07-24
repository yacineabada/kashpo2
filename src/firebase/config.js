import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDM7SXaedhzAkIgd_fkupK4X-RPrkAuzk",
  authDomain: "kashpo-17348.firebaseapp.com",
  databaseURL: "https://kashpo-17348.firebaseio.com",
  projectId: "kashpo-17348",
  storageBucket: "kashpo-17348.appspot.com",
  messagingSenderId: "375764843430",
  appId: "1:375764843430:web:a22ac07863a7d520ddad67",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
