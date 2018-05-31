import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import { signIn, signOut } from '../../ControlPanel/Components/FirebaseProvider/auth'
import { removeState } from '../../LocalStorage'
import {
    USER_LOGGING_IN,
    USER_LOGOUT,
    USER_LOGIN,
} from '../../ControlPanel/Constants'
/* import {
    login,
} from '../../ControlPanel/Actions' */ 


const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })
// let newTaskRef

const userLogin = store => next => (action) => {
    switch (action.type) {
        case USER_LOGGING_IN:
            signIn()
            return next(action)
        case USER_LOGOUT:
            signOut()
            removeState()
            return next(action)
        case USER_LOGIN:
            firestore.collection('admins')
                 .onSnapshot((querySnapshot) => {
                    console.log('Current data: ', querySnapshot)
                    console.log('Current data1: ', querySnapshot.docChanges())
                    querySnapshot.docChanges().map((doc2) => (
                        console.log('Current data2: ', doc2.doc.data())
                    ))
                })
            return next(action)
        default:
            return next(action)
    }
}

export default userLogin