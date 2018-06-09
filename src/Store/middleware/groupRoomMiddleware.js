import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    ADD_GROUP_ROOM,
    REMOVE_GROUP_ROOM,
    UPDATE_GROUP_ROOM,
} from '../../ControlPanel/Constants'


const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const groupRoomMiddleware = store => next => (action) => {
    switch (action.type) {
        case ADD_GROUP_ROOM:
        case UPDATE_GROUP_ROOM:
            let newRoomPwRef
            let newRoomRef
            if (action.type === ADD_GROUP_ROOM) {
                const createdAt = firebase.firestore.FieldValue.serverTimestamp()
                newRoomRef = firestore.collection('groupRooms').doc()
                newRoomPwRef = firestore.collection('roomsPw').doc(newRoomRef.id)
                newRoomRef.set({
                    name: action.payload.name,
                    members: action.payload.members,
                    problems: action.payload.problems,
                    createdAt,
                })
            } else {
                newRoomRef = firestore.collection('groupRooms').doc(action.payload.id)
                newRoomPwRef = firestore.collection('roomsPw').doc(action.payload.id)
                newRoomRef.update({
                    name: action.payload.name,
                    members: action.payload.members,
                    problems: action.payload.problems,
                })
            }
            newRoomPwRef.set({
                password: action.payload.password,
            })
            return next(action)
        case REMOVE_GROUP_ROOM:
            firestore
                .collection('groupRooms')
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

export default groupRoomMiddleware