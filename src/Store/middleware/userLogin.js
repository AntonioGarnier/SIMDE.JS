import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import { signIn, signOut } from '../../ControlPanel/Components/FirebaseProvider/auth'
import { removeState } from '../../LocalStorage'
import {
    USER_LOGGING_IN,
    USER_LOGOUT,
    USER_LOGIN,
    OPEN_SNACK_BAR,
    ACTIVATE_LISTENERS,
    USER_NOT_CONNECTED,
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
    subscribeUsers,
    listenUsers,
 } from '../epics'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const userLogin = store => next => (action) => {
    switch (action.type) {
        case USER_LOGGING_IN:
            signIn()
            return next(action)
        case USER_LOGOUT:
            firestore
                .collection('userList')
                .doc(store.getState().controlPanel.user.uid)
                .update({
                    connected: false,
                })
                .then(() => {
                    signOut()
                    store.dispatch({
                        type: OPEN_SNACK_BAR,
                        payload: {
                            message: 'SUCCESS: Logged out!',
                            type: 'success',
                        }
                    })
                })
            return next(action)
        case USER_NOT_CONNECTED:
            removeState()
            return next(action)
        case ACTIVATE_LISTENERS:
            const user = store.getState().controlPanel.user
                listenHistory
                    .where(firebase.firestore.FieldPath.documentId(), '==', user.uid)
                    .onSnapshot(subscribeHistory())
                listenGroups
                    .onSnapshot(subscribeGroups())
                listenUsers
                    .onSnapshot(subscribeUsers())
                listenInstances
                    .onSnapshot(subscribeInstances())
                listenProblem
                    .onSnapshot(subscribeProblem())
                listenRanking
                    .onSnapshot(subscribeRanking())
                if (user.rol === 'admin') {
                    listenRoom
                        .orderBy('createdAt', 'desc')
                        .onSnapshot(subscribeRoom())
                } else {
                    listenRoom
                        .where('visibility', '==', true)
                        .orderBy('createdAt', 'desc')
                        .onSnapshot(subscribeRoom())
                }
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