import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    ADD_INSTANCE,
    REMOVE_INSTANCE,
    UPDATE_INSTANCE,
} from '../../ControlPanel/Constants'


const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const instancesMiddleware = store => next => (action) => {
    switch (action.type) {
        case ADD_INSTANCE:
        case UPDATE_INSTANCE:
            let newInstanceRef
            if (action.type === ADD_INSTANCE) {
                const createdAt = firebase.firestore.FieldValue.serverTimestamp()
                newInstanceRef = firestore.collection('instances').doc()
                newInstanceRef.set({
                    name: action.payload.name,
                    initialMem: action.payload.initialMem,
                    finalMem: action.payload.finalMem,
                    createdAt,
                })
            } else {
                newInstanceRef = firestore.collection('instances').doc(action.payload.id)
                newInstanceRef.update({
                    name: action.payload.name,
                    initialMem: action.payload.initialMem,
                    finalMem: action.payload.finalMem,
                })
            }
            return next(action)
        case REMOVE_INSTANCE:
            firestore
                .collection('instances')
                .doc(action.payload.id)
                .delete()
                .catch()
            return next(action)
        default:
            return next(action)
    }
}

export default instancesMiddleware