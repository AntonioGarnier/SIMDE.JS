import 'firebase/firestore'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    ADD_ROOM,
    REMOVE_ROOM,
    UPDATE_NAME_ROOM,
    UPDATE_PROBLEMS_ROOM,
    JOIN_ROOM,
    LEAVE_ROOM,
    OPEN_SNACK_BAR,
    UPDATE_VISIBILITY_ROOM,
    CHECK_ROOM_PASSWORD,
    REQUEST_JOIN_FAILED,
    UPDATE_RANKING_RESULTS,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const roomMiddleware = store => next => (action) => {
    switch (action.type) {
        case ADD_ROOM:
            let newRoomPwRef
            let newRankingRef
            let newRoomRef
            const createdAt = firebase.firestore.FieldValue.serverTimestamp()
            newRoomRef = firestore.collection('rooms').doc()
            newRankingRef = firestore.collection('ranking').doc(newRoomRef.id)
            newRoomPwRef = firestore.collection('roomsPw').doc(newRoomRef.id)
            newRoomRef
                .set({
                    name: action.payload.name,
                    members: action.payload.members,
                    problems: action.payload.problems,
                    visibility: action.payload.visibility,
                    type: action.payload.type,
                    createdAt,
                })
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Room added!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not add room! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            newRankingRef
                .set({

                })
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not add room ranking! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            newRoomPwRef
                .set({
                    password: action.payload.password,
                })
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not add room password! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            newRankingRef
                .set({
                    members: {},
                })
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not add ranking! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        case REMOVE_ROOM:
            firestore
                .collection('rooms')
                .doc(action.payload.id)
                .delete()
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Room removed!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not remove room! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            firestore
                .collection('roomsPw')
                .doc(action.payload.id)
                .delete()
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could remove password! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        case UPDATE_VISIBILITY_ROOM:
            firestore.collection('rooms').doc(action.payload.id)
            .update({
                visibility: action.payload.visibility,
            })
            .then(() => store.dispatch({
                type: OPEN_SNACK_BAR,
                payload: {
                    message: 'SUCCESS: Room visibility updated!',
                    type: 'success',
                }
            }))
            .catch(() => store.dispatch({
                type: OPEN_SNACK_BAR,
                payload: {
                    message: 'ERROR: Could not update visibility! (DataBase - Problem)',
                    type: 'error',
                }
            }))
            return next(action)
        case UPDATE_NAME_ROOM:
            firestore.collection('rooms').doc(action.payload.id)
                .update({
                    name: action.payload.name,
                })
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Room name updated!',
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
        case UPDATE_PROBLEMS_ROOM:
            firestore.collection('rooms').doc(action.payload.id)
                .update({
                    problems: action.payload.problems,
                })
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Room problems updated!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not update problems! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        case JOIN_ROOM:
            firestore.collection('rooms').doc(action.payload.id)
                .update({
                    ['members.' + action.payload.member]: true,
                })
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
                        message: 'ERROR: Could not join room! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        case LEAVE_ROOM:
            firestore.collection('rooms').doc(action.payload.id)
                .update({
                    ['members.' + action.payload.member]: firebase.firestore.FieldValue.delete(),
                })
                .then(() => {
                    store.dispatch({
                        type: OPEN_SNACK_BAR,
                        payload: {
                            message: 'SUCCESS: Room left!',
                            type: 'success',
                        }
                    })
                    store.dispatch({
                        type: REQUEST_JOIN_FAILED,
                    })
                })
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not leave room! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        case CHECK_ROOM_PASSWORD:
            const pwRef = firestore.collection('roomsPw').doc(action.payload.id)
            pwRef
                .get()
                .then((doc) => {
                    console.log(doc.data().password, ' = ', action.payload.password)
                    if (doc.exists) {
                        if (doc.data().password === action.payload.password)
                            store.dispatch({
                                type: JOIN_ROOM,
                                payload: {
                                    id: action.payload.id,
                                    member: action.payload.member,
                                }
                            })
                        else {
                            store.dispatch({
                                type: OPEN_SNACK_BAR,
                                payload: {
                                    message: 'WARNING: Wrong password',
                                    type: 'warning',
                                }
                            })
                            store.dispatch({
                                type: REQUEST_JOIN_FAILED,
                            })
                        }
                    } else {
                        store.dispatch({
                            type: OPEN_SNACK_BAR,
                            payload: {
                                message: 'ERROR: Room password nor registered',
                                type: 'error',
                            }
                        })
                    }
                    console.log('QUE PASO¿')
                }).catch(() => {
                    store.dispatch({
                        type: OPEN_SNACK_BAR,
                        payload: {
                            message: 'ERROR: Could not check passowrd! (DataBase - Problem)',
                            type: 'error',
                        }
                    })
                    store.dispatch({
                        type: REQUEST_JOIN_FAILED,
                    })
                }) 
            return next(action)
        case UPDATE_RANKING_RESULTS: // id: roomId; member: MemberID; result: integer
            firestore.collection('ranking').doc(action.payload.id)
                .update({
                    ['members.' + action.payload.member]: firebase.firestore.FieldValue + action.payload.result,
                })
                .then(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Room problems updated!',
                        type: 'success',
                    }
                }))
                .catch(() => store.dispatch({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not update problems! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
            return next(action)
        default:
            return next(action)
    }
}

export default roomMiddleware
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