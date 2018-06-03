import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCtofD2jIdsAfeonq8iFT0tBhOwaAtUZAg",
    authDomain: "simde-19bb3.firebaseapp.com",
    databaseURL: "https://simde-19bb3.firebaseio.com",
    projectId: "simde-19bb3",
    storageBucket: "",
    messagingSenderId: "248938624018"
  }

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase
