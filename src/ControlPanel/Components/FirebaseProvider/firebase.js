import firebase from 'firebase'


const config = {
    apiKey: 'AIzaSyDnf85_olh01OJMokfBwRmoJB51FmRzgSY',
    authDomain: 'simde-tfg-ajlg.firebaseapp.com',
    databaseURL: 'https://simde-tfg-ajlg.firebaseio.com',
    projectId: 'simde-tfg-ajlg',
    storageBucket: 'simde-tfg-ajlg.appspot.com',
    messagingSenderId: '10872132531',
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase
