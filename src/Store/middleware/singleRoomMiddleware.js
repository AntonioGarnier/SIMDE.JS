import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    ADD_SINGLE_ROOM,
    REMOVE_SINGLE_ROOM,
    UPDATE_SINGLE_ROOM,
} from '../../ControlPanel/Constants'


const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const singleRoomMiddleware = store => next => (action) => {
    switch (action.type) {
        case ADD_SINGLE_ROOM:
        case UPDATE_SINGLE_ROOM:
            let newRoomPwRef
            let newRoomRef
            if (action.type === ADD_SINGLE_ROOM) {
                newRoomPwRef = firestore.collection('roomsPw').doc(newRoomRef.id)
                newRoomRef = firestore.collection('singleRooms').doc()
            } else {
                newRoomRef = firestore.collection('singleRooms').doc(action.payload.id)
                newRoomPwRef = firestore.collection('roomsPw').doc(action.payload.id)
            }
            newRoomRef.set({
                name: action.payload.name,
                members: action.payload.members,
                problems: action.payload.problems,
            })
            newRoomPwRef.set({
                password: action.payload.password,
            })
            return next(action)
        case REMOVE_SINGLE_ROOM:
            firestore
                .collection('singleRooms')
                .doc(action.payload.id)
                .delete()
                .catch()
            firestore
                .collection('roomsPw')
                .doc(action.payload.id)
                .delete()
                .catch()
            return next(action)
        default:
            return next(action)
    }
}

export default singleRoomMiddleware