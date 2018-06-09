import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    ADD_GROUP,
    REMOVE_GROUP,
    UPDATE_GROUP,
} from '../../ControlPanel/Constants'


const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const groupsMiddleware = store => next => (action) => {
    switch (action.type) {
        case ADD_GROUP:
        case UPDATE_GROUP:
            let newGroupsPwRef
            let newGroupsRef
            if (action.type === ADD_GROUP) {
                const createdAt = firebase.firestore.FieldValue.serverTimestamp()
                newGroupsRef = firestore.collection('groups').doc()
                newGroupsPwRef = firestore.collection('groupsPw').doc(newGroupsRef.id)
                newGroupsRef.set({
                    name: action.payload.name,
                    members: action.payload.members,
                    createdAt,
                })
            } else {
                newGroupsRef = firestore.collection('groups').doc(action.payload.id)
                newGroupsPwRef = firestore.collection('groupsPw').doc(action.payload.id)
                newGroupsRef.update({
                    name: action.payload.name,
                    members: action.payload.members,
                })
            }
            newGroupsPwRef.set({
                password: action.payload.password,
            })
            return next(action)
        case REMOVE_GROUP:
            firestore
                .collection('groups')
                .doc(action.payload.id)
                .delete()
                .catch()
            firestore
                .collection('groupsPw')
                .doc(action.payload.id)
                .delete()
                .catch()
            return next(action)
        default:
            return next(action)
    }
}

export default groupsMiddleware