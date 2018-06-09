import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import { signIn, signOut } from '../../ControlPanel/Components/FirebaseProvider/auth'
import { removeState } from '../../LocalStorage'
import {
    USER_LOGGING_IN,
    USER_LOGOUT,
    USER_LOGIN,
} from '../../ControlPanel/Constants'
import { subscribeRoom, listenRoom } from '../epics'
import { subscribeSingleRoom, listenSingleRoom } from '../epics'
import { subscribeGroupRoom, listenGroupRoom } from '../epics'
import { subscribeGroups, listenGroups } from '../epics'
import { subscribeInstances, listenInstances } from '../epics'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const userLogin = store => next => (action) => {
    switch (action.type) {
        case USER_LOGGING_IN:
            signIn()
            return next(action)
        case USER_LOGOUT:
            signOut()
            removeState()
            firestore.collection('userList').doc(store.getState().controlPanel.user.uid)
                .update({
                    connected: false,
                })
            return next(action)
        case USER_LOGIN:
            const userRef = firestore.collection('userList').doc(action.payload.uid)
            userRef.set({
                name: action.payload.displayName,
                rol: action.payload.rol,
                connected: true,
            })
            listenRoom.onSnapshot(subscribeRoom())
            //listenSingleRoom.onSnapshot(subscribeSingleRoom())
            //listenGroupRoom.onSnapshot(subscribeGroupRoom())
            listenGroups.onSnapshot(subscribeGroups())
            listenInstances.onSnapshot(subscribeInstances())
            return next(action)
        default:
            return next(action)
    }
}

export default userLogin