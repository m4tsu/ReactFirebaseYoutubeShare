import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.app().functions("asia-northeast1");
// const getNicovideoTitle = firebase
//   .functions()
//   .httpsCallable("getNicovideoTitle");
export { firebase, auth, db, functions };
