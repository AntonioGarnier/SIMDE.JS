import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    ADD_INSTANCE,
    REMOVE_INSTANCE,
    OPEN_SNACK_BAR,
} from '../../ControlPanel/Constants'


const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const instancesMiddleware = store => next => (action) => {
    switch (action.type) {
        case ADD_INSTANCE:
            let newInstanceRef
            const createdAt = firebase.firestore.FieldValue.serverTimestamp()
            newInstanceRef = firestore.collection('instances').doc()
            newInstanceRef
                .set({
                    name: action.payload.name,
                    initial: action.payload.initial,
                    final: action.payload.final,
                    createdAt,
                })
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Instance added!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not add the instance!',
                        type: 'error',
                    }
                }))
            return next(action)
        case REMOVE_INSTANCE:
            firestore
                .collection('instances')
                .doc(action.payload.id)
                .delete()
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Instance removed!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not remove the instance!',
                        type: 'error',
                    }
                }))
            return next(action)
        default:
            return next(action)
    }
}

export default instancesMiddleware