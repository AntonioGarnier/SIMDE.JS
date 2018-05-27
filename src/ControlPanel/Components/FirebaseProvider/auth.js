import firebase from './firebase'


// Sign in
const provider = new firebase.auth.GoogleAuthProvider()
export const signIn = async () => firebase.auth().signInWithPopup(provider)

// Sign out
export const signOut = async () => firebase.auth().signOut()

