import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import { signIn, signOut } from '../../ControlPanel/Components/FirebaseProvider/auth'
import { removeState } from '../../LocalStorage'
import {
    USER_LOGGING_IN,
    USER_LOGOUT,
    USER_LOGIN,
    OPEN_SNACK_BAR,
    ACTIVATE_STUDENT_LISTENERS,
    ACTIVATE_ADMIN_LISTENERS,
    USER_NOT_CONNECTED,
    DEACTIVATE_ADMIN_LISTENERS,
    DEACTIVATE_STUDENT_LISTENERS,
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

const unsubscribe = {
    listenProblem,
    listenHistory,
    listenGroups,
    listenUsers,
    listenInstances,
    listenRanking,
    listenRoom
}

const userLogin = store => next => (action) => {
    switch (action.type) {
        case USER_LOGGING_IN:
            signIn()
            return next(action)
        case USER_LOGOUT:
            firestore
                .collection('userList')
                .doc(action.payload.uid)
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
        case DEACTIVATE_ADMIN_LISTENERS:
            unsubscribe.listenProblem()
        // eslint-disable-next-line
        case DEACTIVATE_STUDENT_LISTENERS:
            unsubscribe.listenHistory()
            unsubscribe.listenGroups()
            unsubscribe.listenUsers()
            unsubscribe.listenInstances()
            unsubscribe.listenRanking()
            unsubscribe.listenRoom()
            return next(action)
        case ACTIVATE_STUDENT_LISTENERS:
            unsubscribe.listenHistory = listenHistory
                .where(firebase.firestore.FieldPath.documentId(), '==', store.getState().controlPanel.user.uid)
                .onSnapshot(subscribeHistory())
            unsubscribe.listenGroups = listenGroups
                .onSnapshot(subscribeGroups())
            unsubscribe.listenUsers = listenUsers
                .onSnapshot(subscribeUsers())
            unsubscribe.listenInstances = listenInstances
                .onSnapshot(subscribeInstances())
            unsubscribe.listenRanking = listenRanking
                .onSnapshot(subscribeRanking())
            unsubscribe.listenRoom = listenRoom
                .where('visibility', '==', true)
                .orderBy('createdAt', 'desc')
                .onSnapshot(subscribeRoom())
            return next(action)
        case ACTIVATE_ADMIN_LISTENERS:
            unsubscribe.listenHistory = listenHistory
                .where(firebase.firestore.FieldPath.documentId(), '==', store.getState().controlPanel.user.uid)
                .onSnapshot(subscribeHistory())
            unsubscribe.listenGroups = listenGroups
                .onSnapshot(subscribeGroups())
            unsubscribe.listenUsers = listenUsers
                .onSnapshot(subscribeUsers())
            unsubscribe.listenInstances = listenInstances
                .onSnapshot(subscribeInstances())
            unsubscribe.listenProblem = listenProblem
                .onSnapshot(subscribeProblem())
            unsubscribe.listenRanking = listenRanking
                .onSnapshot(subscribeRanking())
            unsubscribe.listenRoom = listenRoom
                .orderBy('createdAt', 'desc')
                .onSnapshot(subscribeRoom())
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