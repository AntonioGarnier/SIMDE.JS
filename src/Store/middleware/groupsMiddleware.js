import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    ADD_GROUP,
    REMOVE_GROUP,
    UPDATE_NAME_GROUP,
    UPDATE_LEADER_GROUP,
    JOIN_GROUP,
    LEAVE_GROUP,
    ERROR_POPUP_OPEN,
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
            newGroupsRef.set({
                name: action.payload.name,
                members: action.payload.members,
                createdAt,
            }).catch((errorMessage) => store.dispatch({
                type: ERROR_POPUP_OPEN,
                payload: {
                    from: 'Error while creating group',
                    errorMessage
                }
            }))
            newGroupsPwRef.set({
                password: action.payload.password,
            }).catch((errorMessage) => store.dispatch({
                type: ERROR_POPUP_OPEN,
                payload: {
                    from: 'Error while creating password group',
                    errorMessage
                }
            }))
            return next(action)
        case REMOVE_GROUP:
            firestore
                .collection('groups')
                .doc(action.payload.id)
                .delete()
                .catch((errorMessage) => store.dispatch({
                    type: ERROR_POPUP_OPEN,
                    payload: {
                        from: 'Error while removing room',
                        errorMessage
                    }
                }))
            firestore
                .collection('groupsPw')
                .doc(action.payload.id)
                .delete()
                .catch((errorMessage) => store.dispatch({
                    type: ERROR_POPUP_OPEN,
                    payload: {
                        from: 'Error while removing password room',
                        errorMessage
                    }
                }))
            return next(action)
        case UPDATE_NAME_GROUP:
            firestore.collection('groups').doc(action.payload.id)
                .update({
                    name: action.payload.name,
                }).catch((errorMessage) => store.dispatch({
                    type: ERROR_POPUP_OPEN,
                    payload: {
                        from: 'Error while updating group name',
                        errorMessage
                    }
                }))
            return next(action)
        case UPDATE_LEADER_GROUP:
            firestore.collection('groups').doc(action.payload.id)
                .update({
                    leader: action.payload.leader,
                }).catch((errorMessage) => store.dispatch({
                    type: ERROR_POPUP_OPEN,
                    payload: {
                        from: 'Error while updating leader name',
                        errorMessage
                    }
                }))
            return next(action)
        case JOIN_GROUP:
            firestore.collection('groups').doc(action.payload.id)
                .set({
                    members: action.payload.members,
                }, { merge: true }).catch((errorMessage) => store.dispatch({
                    type: ERROR_POPUP_OPEN,
                    payload: {
                        from: 'Error while joining group',
                        errorMessage
                    }
                }))
            return next(action)
        case LEAVE_GROUP:
            firestore.collection('groups').doc(action.payload.id)
                .update({
                    members: action.payload.members,
                }).catch((errorMessage) => store.dispatch({
                    type: ERROR_POPUP_OPEN,
                    payload: {
                        from: 'Error while leaving group',
                        errorMessage
                    }
                }))
            return next(action)
        default:
            return next(action)
    }
}

export default groupsMiddleware