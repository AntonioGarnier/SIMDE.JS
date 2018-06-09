import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    ADD_ROOM,
    REMOVE_ROOM,
    UPDATE_NAME_ROOM,
    UPDATE_PROBLEMS_ROOM,
    JOIN_ROOM,
    LEAVE_ROOM,
    ERROR_POPUP_OPEN,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const singleRoomMiddleware = store => next => (action) => {
    switch (action.type) {
        case ADD_ROOM:
            let newRoomPwRef
            let newRoomRef
            const createdAt = firebase.firestore.FieldValue.serverTimestamp()
            newRoomRef = firestore.collection('rooms').doc()
            newRoomPwRef = firestore.collection('roomsPw').doc(newRoomRef.id)
            newRoomRef.set({
                name: action.payload.name,
                members: action.payload.members,
                problems: action.payload.problems,
                type: action.payload.type,
                createdAt,
            }).catch((errorMessage) => store.dispatch({
                type: ERROR_POPUP_OPEN,
                payload: {
                    from: 'Error while creating a new room',
                    errorMessage
                }
            }))
            newRoomPwRef.set({
                password: action.payload.password,
            }).catch((errorMessage) => store.dispatch({
                type: ERROR_POPUP_OPEN,
                payload: {
                    from: 'Error while setting room password',
                    errorMessage
                }
            }))
            return next(action)
        case REMOVE_ROOM:
            firestore
                .collection('rooms')
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
                .collection('roomsPw')
                .doc(action.payload.id)
                .delete()
                .catch((errorMessage) => store.dispatch({
                    type: ERROR_POPUP_OPEN,
                    payload: {
                        from: 'Error while removing room password',
                        errorMessage
                    }
                }))
            return next(action)
        case UPDATE_NAME_ROOM:
            firestore.collection('rooms').doc(action.payload.id)
                .update({
                    name: action.payload.name,
                }).catch((errorMessage) => store.dispatch({
                    type: ERROR_POPUP_OPEN,
                    payload: {
                        from: 'Error while updating room name',
                        errorMessage
                    }
                }))
            return next(action)
        case UPDATE_PROBLEMS_ROOM:
            firestore.collection('rooms').doc(action.payload.id)
                .update({
                    problems: action.payload.problems,
                }).catch((errorMessage) => store.dispatch({
                    type: ERROR_POPUP_OPEN,
                    payload: {
                        from: 'Error while updating room problems',
                        errorMessage
                    }
                }))
            return next(action)
        case JOIN_ROOM:
            firestore.collection('rooms').doc(action.payload.id)
                .set({
                    members: action.payload.members,
                }, {merge: true}).catch((errorMessage) => store.dispatch({
                    type: ERROR_POPUP_OPEN,
                    payload: {
                        from: 'Error while joining room',
                        errorMessage
                    }
                }))
            return next(action)
        case LEAVE_ROOM:
            firestore.collection('rooms').doc(action.payload.id)
                .update({
                    members: action.payload.members,
                }).catch((errorMessage) => store.dispatch({
                    type: ERROR_POPUP_OPEN,
                    payload: {
                        from: 'Error while leaving room',
                        errorMessage
                    }
                }))
            return next(action)
        default:
            return next(action)
    }
}

export default singleRoomMiddleware
/*
{
    type: 'JOIN_ROOM',
    payload: {
      id: '6HHKq3oQdPDOcaG1bv9O',
      members: {
        'carlos': true,
       'pedro': true,
      },
    },
    }
    */