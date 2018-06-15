import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    ADD_GROUP,
    REMOVE_GROUP,
    JOIN_GROUP,
    LEAVE_GROUP,
    OPEN_SNACK_BAR,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const groupsMiddleware = store => next => (action) => {
    switch (action.type) {
        case ADD_GROUP:
            let newGroupsPwRef
            let newGroupsRef
            const createdAt = firebase.firestore.FieldValue.serverTimestamp()
            newGroupsRef = firestore.collection('groups').doc()
            newGroupsPwRef = firestore.collection('groupsPw').doc(newGroupsRef.id)
            newGroupsRef
                .set({
                    name: action.payload.name,
                    members: action.payload.members,
                    leader: action.payload.leader,
                    createdAt,
                })
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Group added!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not add the group!',
                        type: 'error',
                    }
                }))
            newGroupsPwRef
                .set({
                    password: action.payload.password,
                })
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not save password! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        case REMOVE_GROUP:
            if (store.getState().controlPanel.user.rol === 'admin' || store.getState().controlPanel.user.uid === action.payload.leader) {
                firestore
                    .collection('groups')
                    .doc(action.payload.id)
                    .delete()
                    .then(() => store.dispatch({
                        type: OPEN_SNACK_BAR,
                        payload: {
                            message: 'SUCCESS: Group Removed!',
                            type: 'success',
                        }
                    }))
                    .catch(() => store.dispatch({
                        type: OPEN_SNACK_BAR,
                        payload: {
                            message: 'ERROR: Could not remove group! (DataBase - Problem)',
                            type: 'error',
                        }
                    }))
                firestore
                    .collection('groupsPw')
                    .doc(action.payload.id)
                    .delete()
                    .catch(() => store.dispatch({
                        type: OPEN_SNACK_BAR,
                        payload: {
                            message: 'ERROR: Could not remove password! (DataBase - Problem)',
                            type: 'error',
                        }
                    }))
            } 
            else 
                store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'WARNING: Only admins or leaders can remove groups!',
                        type: 'warning',
                    }
                })
            return next(action)
        case JOIN_GROUP:
            firestore.collection('groups').doc(action.payload.id)
                .set({
                    members: action.payload.members,
                }, { merge: true })
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Joined!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not join group! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        case LEAVE_GROUP:
            if (store.getState().controlPanel.user.uid !== action.payload.leader)
                firestore.collection('groups').doc(action.payload.id)
                    .update({
                        members: action.payload.members,
                    })
                    .then(() => store.dispatch({
                        type: OPEN_SNACK_BAR,
                        payload: {
                            message: 'SUCCESS: Group left!',
                            type: 'success',
                        }
                    }))
                    .catch(() => store.dispatch({
                        type: OPEN_SNACK_BAR,
                        payload: {
                            message: 'ERROR: Could not leave group! (DataBase - Problem)',
                            type: 'error',
                        }
                    }))
            else 
                store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'WARNING: Leaders cannot leave a group',
                        type: 'warning',
                    }
                })
            return next(action)
        default:
            return next(action)
    }
}

export default groupsMiddleware