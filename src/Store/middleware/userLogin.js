import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import { signIn, signOut } from '../../ControlPanel/Components/FirebaseProvider/auth'
import { removeState } from '../../LocalStorage'
import {
    USER_LOGGING_IN,
    USER_LOGOUT,
    USER_LOGIN,
    OPEN_SNACK_BAR,
    CHECKED_USER,
} from '../../ControlPanel/Constants'
import { 
    subscribeRoom,
    listenRoom,
    subscribeGroups,
    listenGroups,
    subscribeInstances,
    listenInstances,
    subscribeProblem,
    listenProblem,
    subscribeHistory,
    listenHistory,
    subscribeRanking,
    listenRanking,
 } from '../epics'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const unsubscribe = {
    type: OPEN_SNACK_BAR,
    payload: {
        message: 'SUCCESS: Logged out. Stop listening from database',
        type: 'success',
    }
}

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
        case CHECKED_USER:
            listenGroups
                .onSnapshot(subscribeGroups(),() => {store.dispatch(unsubscribe)})
            listenInstances
                .onSnapshot(subscribeInstances(),() => {store.dispatch(unsubscribe)})
            listenProblem
                .onSnapshot(subscribeProblem(),() => {store.dispatch(unsubscribe)})
            listenHistory
            //.orderBy('createdAt', 'desc')
                .where(firebase.firestore.FieldPath.documentId(), '==', store.getState().controlPanel.user.uid)
                .onSnapshot(subscribeHistory(),() => {store.dispatch(unsubscribe)})
            listenRanking
                .onSnapshot(subscribeRanking(),() => {store.dispatch(unsubscribe)})
            listenRoom
                .onSnapshot(subscribeRoom(),() => {store.dispatch(unsubscribe)})
            return next(action)
        case USER_LOGIN:
            const userRef = firestore.collection('userList').doc(action.payload.uid)
            userRef.set({
                name: action.payload.displayName,
                rol: action.payload.rol,
                picture: action.payload.picture,
                connected: true,
            })
            
            return next(action)
        default:
            return next(action)
    }
}

export default userLogin