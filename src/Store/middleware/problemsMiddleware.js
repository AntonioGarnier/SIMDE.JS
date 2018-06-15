import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    ADD_PROBLEM,
    REMOVE_PROBLEM,
    UPDATE_NAME_PROBLEM,
    UPDATE_INSTANCES_PROBLEM,
    OPEN_SNACK_BAR,
    UPDATE_DEFINITION_PROBLEM,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const problemsMiddleware = store => next => (action) => {
    switch (action.type) {
        case ADD_PROBLEM:
            let newRoomRef
            const createdAt = firebase.firestore.FieldValue.serverTimestamp()
            newRoomRef = firestore.collection('problems').doc()
            newRoomRef
                .set({
                    name: action.payload.name,
                    instances: action.payload.instances,
                    definition: action.payload.definition,
                    createdAt,
                })
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Problem added!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not add problem! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        case REMOVE_PROBLEM:
            firestore
                .collection('problems')
                .doc(action.payload.id)
                .delete()
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Problem removed!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not remove problem! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        case UPDATE_NAME_PROBLEM:
            firestore.collection('problems').doc(action.payload.id)
                .update({
                    name: action.payload.name,
                })
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Problem name updated!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not update name! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        case UPDATE_DEFINITION_PROBLEM:
            firestore.collection('problems').doc(action.payload.id)
                .update({
                    definition: action.payload.definition,
                })
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Problem definition updated!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not update definition! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        case UPDATE_INSTANCES_PROBLEM:
            firestore.collection('problems').doc(action.payload.id)
                .update({
                    instances: action.payload.instances,
                })
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Problem instances updated!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not update instances! (DataBase - Problem)',
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