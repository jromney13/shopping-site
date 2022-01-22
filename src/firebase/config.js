import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMEBzdkEX0PmtIecu9MhWVc1eM5qkXv0k",
  authDomain: "classycouture-22c76.firebaseapp.com",
  projectId: "classycouture-22c76",
  storageBucket: "classycouture-22c76.appspot.com",
  messagingSenderId: "235511098088",
  appId: "1:235511098088:web:ae9ea49562cf3d0c7f375d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// init service
const projectFirestore = firebase.firestore()
const projectStorage = firebase.storage()
const projectAuth = firebase.auth()


// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectStorage, timestamp, projectAuth }