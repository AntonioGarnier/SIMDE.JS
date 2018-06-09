import 'firebase/firestore'
import { ofType } from 'redux-observable'
import { Subject } from 'rxjs'
import {
    map,
    flatMap,
    // tap,
    merge,
} from 'rxjs/operators'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    FETCHING_USER_SINGLE_ROOMS,
    FETCH_ALL_USER_SINGLE_ROOMS,
    GOT_USER_SINGLE_ROOM,
    REMOVE_ALL_USER_SINGLE_ROOMS,
    GOT_REMOVE_USER_SINGLE_ROOM,
    GOT_UPDATE_USER_SINGLE_ROOM,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const singleRoomAdd$ = new Subject()
const singleRoomUpdate$ = new Subject()
const singleRoomRemove$ = new Subject()

export const subscribeUserSingleRoom = () => (querySnapshot) => {
    let updateType
    let rooms = {}
    querySnapshot.docChanges().forEach((room) => {
        rooms[room.doc.id] = room.doc.data()
        updateType = room.type
    })
    switch (updateType) {
        case 'added':
            singleRoomAdd$.next(rooms)
            break
        case 'modified':
            singleRoomUpdate$.next(rooms)
            break
        case 'removed':
            singleRoomRemove$.next(rooms)
            break
        default:
            break
    }
}

export const listenUserSingleRoom = firestore.collection('singleRooms')
    

export const manageUserSingleRoomEpic = action$ =>
    action$.pipe(
        ofType(FETCHING_USER_SINGLE_ROOMS),
        // tap(v => console.log('Antes de flat: ', v)),        
        flatMap(() => (
            singleRoomAdd$.pipe(
                // tap(v => console.log('add: ', v)),
                map((rooms) => {
                    if (Object.keys(rooms).length > 1)
                        return {
                            type: FETCH_ALL_USER_SINGLE_ROOMS,
                            payload: rooms,
                        }
                    const room = Object.values(rooms).shift()
                    return {
                        type: GOT_USER_SINGLE_ROOM,
                        payload: {
                            name: room.name,
                            id: Object.keys(rooms).shift(),
                            members: room.members,
                            problems: room.problems,
                            createdAt: room.createdAt,
                        },
                    }
                }),
                merge(singleRoomRemove$.pipe(
                    // tap(v => console.log('remove: ', v)),
                    map((rooms) => {
                        if (Object.keys(rooms).length > 1)
                            return {
                                type: REMOVE_ALL_USER_SINGLE_ROOMS,
                            }
                        return {
                            type: GOT_REMOVE_USER_SINGLE_ROOM,
                            payload: {
                                id: Object.keys(rooms).shift(),
                            },
                        }
                    }),
                    merge(singleRoomUpdate$.pipe(
                        // tap(v => console.log('update: ', v)),
                        map((rooms) => {
                            const room = Object.values(rooms).shift()
                            return {
                                type: GOT_UPDATE_USER_SINGLE_ROOM,
                                payload: {
                                    name: room.name,
                                    id: Object.keys(rooms).shift(),
                                    members: room.members,
                                    problems: room.problems,
                                    createdAt: room.createdAt,
                                },
                            }
                        }),
                    ))
                ))
            )
        )),
        //tap(v => console.log('despues de flat: ', v))       
    )

/*const manageSingleRoomEpic = action$ =>
    action$.pipe(
        ofType(FETCHING_SINGLE_ROOMS),
        tap(v => console.log('Antes de flat: ', v)),        
        flatMap(() => (
            singleRoomAdd$.pipe(
                tap(v => console.log('add: ', v)),
                map((rooms) => {
                    if (Object.keys(rooms).length > 1)
                        return {
                            type: FETCH_ALL_SINGLE_ROOMS,
                            payload: rooms,
                        }
                    const room = Object.values(rooms).shift()
                    return {
                        type: GOT_SINGLE_ROOM,
                        payload: {
                            name: room.name,
                            id: Object.keys(rooms).shift(),
                            members: room.members,
                            problems: room.problems,
                            createdAt: room.createdAt,
                        },
                    }
                }),
                merge(singleRoomRemove$.pipe(
                    tap(v => console.log('remove: ', v)),
                    map((rooms) => {
                        if (Object.keys(rooms).length > 1)
                            return {
                                type: REMOVE_ALL_SINGLE_ROOMS,
                            }
                        return {
                            type: GOT_REMOVE_SINGLE_ROOM,
                            payload: {
                                id: Object.keys(rooms).shift(),
                            },
                        }
                    }),
                    merge(singleRoomUpdate$.pipe(
                        tap(v => console.log('update: ', v)),
                        map((rooms) => {
                            const room = Object.values(rooms).shift()
                            return {
                                type: GOT_UPDATE_SINGLE_ROOM,
                                payload: {
                                    name: room.name,
                                    id: Object.keys(rooms).shift(),
                                    members: room.members,
                                    problems: room.problems,
                                    createdAt: room.createdAt,
                                },
                            }
                        }),
                    ))
                ))
            )
        )),
        //tap(v => console.log('despues de flat: ', v))       
    ) */


    /*
        {
type: 'ADD_SINGLE_ROOM',
payload: {
  name: 'Sala Primera',
  members: {
   'Anto': true,
   'Carl': false,
},
  problems: {
    'Problema 1': true,
},
  password: 'secreto',
},
}


{
type: 'REMOVE_SINGLE_ROOM',
payload:{
  id: 'tR9gqbgM6mmGfXp6BnWb',
},
}

{
type: 'REMOVE_SINGLE_ROOM',
payload: {
  id: '9GUbzrlY1SMrOGnxqZ8a',
},
}


{
type: 'UPDATE_SINGLE_ROOM',
payload: {
  name: 'Sala Cambiante',
  members: {
   'Antonio': true,
   'Carlos': false,
},
  problems: {
    'Problema 1': false,
},
  password: 'secretisimo',
  id: 'EmNNMh5eyEJAllVFknYW',
},
}


        */