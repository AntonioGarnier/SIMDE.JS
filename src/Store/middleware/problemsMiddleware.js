import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    ADD_PROBLEM,
    REMOVE_PROBLEM,
    UPDATE_NAME_PROBLEM,
    UPDATE_INSTANCES_PROBLEM,
    OPEN_SNACK_BAR,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const problemsMiddleware = store => next => (action) => {
    switch (action.type) {
        case ADD_PROBLEM:
            let newRoomRef
            const createdAt = firebase.firestore.FieldValue.serverTimestamp()
            newRoomRef = firestore.collection('problems').doc()
            newRoomRef.set({
                name: action.payload.name,
                instances: action.payload.instances,
                definition: action.payload.definition,
                createdAt,
            }).catch(() => store.dispatch({
                type: OPEN_SNACK_BAR,
                payload: {
                    message: 'ERROR - Creating problem: Could not connect with database',
                    type: 'error',
                }
            }))
            return next(action)
        case REMOVE_PROBLEM:
            firestore
                .collection('problems')
                .doc(action.payload.id)
                .delete()
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR - Removing problem: Could not connect with database',
                        type: 'error',
                    }
                }))
            return next(action)
        case UPDATE_NAME_PROBLEM:
            firestore.collection('problems').doc(action.payload.id)
                .update({
                    name: action.payload.name,
                }).catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR - Updating name problem: Could not connect with database',
                        type: 'error',
                    }
                }))
            return next(action)
        case UPDATE_INSTANCES_PROBLEM:
            firestore.collection('problems').doc(action.payload.id)
                .update({
                    problems: action.payload.problems,
                }).catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR - Updating instance problem: Could not connect with database',
                        type: 'error',
                    }
                }))
            return next(action)
        default:
            return next(action)
    }
}

export default problemsMiddleware
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