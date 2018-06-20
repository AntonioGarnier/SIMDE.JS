import 'firebase/firestore'
import { ofType } from 'redux-observable'
import { Subject } from 'rxjs'
import {
    map,
    flatMap,
    tap,
    merge,
} from 'rxjs/operators'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    FETCHING_ROOMS,
    FETCH_ALL_ROOMS,
    GOT_ADD_ROOM,
    REMOVE_ALL_ROOMS,
    GOT_REMOVE_ROOM,
    GOT_UPDATE_ROOM,
    GOT_UPDATE_SOME_ROOMS,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const roomAdd$ = new Subject()
const roomUpdate$ = new Subject()
const roomRemove$ = new Subject()

export const subscribeRoom = () => (querySnapshot) => {
    let updateType
    let rooms = []
    let singleRooms = {}
    let groupRooms = {}
    querySnapshot.docChanges().forEach((room) => {
        if (room.doc.data().type === 'single')
            singleRooms[room.doc.id] = room.doc.data()
        else
            groupRooms[room.doc.id] = room.doc.data()
        rooms.push(room.doc.id)
        updateType = room.type
    })
    // console.log('Changes: ', querySnapshot.docChanges())
    switch (updateType) {
        case 'added':
            roomAdd$.next({ singleRooms, groupRooms, rooms })
            break
        case 'modified':
            roomUpdate$.next({ singleRooms, groupRooms, rooms })
            break
        case 'removed':
            roomRemove$.next({ singleRooms, groupRooms, rooms })
            break
        default:
            break
    }
}

export const listenRoom = firestore.collection('rooms')
    .orderBy('createdAt', 'desc')

export const roomEpic = action$ =>
    action$.pipe(
        ofType(FETCHING_ROOMS),
        flatMap(() => (
            roomAdd$.pipe(
                // tap(v => console.log('ADD: ', v)),       
                map(({ singleRooms, groupRooms, rooms }) => {
                    // console.log('Diference between: ', [rooms[0]], ' and ', rooms[0])
                    if (rooms.length > 1) {
                        return {
                            type: FETCH_ALL_ROOMS,
                            payload: {
                                singleRooms,
                                groupRooms,
                                roomsOrdered: rooms,
                            }
                        }
                    }
                    let room = singleRooms.hasOwnProperty(rooms[0]) ? singleRooms[rooms[0]] : groupRooms[rooms[0]]
                    return {
                        type: GOT_ADD_ROOM,
                        payload: {
                            name: room.name,
                            id: rooms[0],
                            members: room.members,
                            type: room.type,
                            visibility: room.visibility,
                            problems: room.problems,
                            createdAt: room.createdAt,
                        },
                    }
                }),
                merge(roomRemove$.pipe(
                    // tap(v => console.log('remove: ', v)),
                    map(({ singleRooms, groupRooms, rooms }) => {
                        if (rooms.length > 1)
                            return {
                                type: REMOVE_ALL_ROOMS,
                            }
                        let room = singleRooms.hasOwnProperty(rooms[0]) ? singleRooms[rooms[0]] : groupRooms[rooms[0]]
                        return {
                            type: GOT_REMOVE_ROOM,
                            payload: {
                                id: rooms[0],
                                type: room.type,
                            },
                        }
                    }),
                    merge(roomUpdate$.pipe(
                        tap(v => console.log('update: ', v)),
                        map(({ singleRooms, groupRooms, rooms }) => {
                            if (rooms.length > 1) {
                                return {
                                    type: GOT_UPDATE_SOME_ROOMS,
                                    payload: {
                                        singleRooms,
                                        groupRooms,
                                    }
                                }
                            }
                            let room = singleRooms.hasOwnProperty(rooms[0]) ? singleRooms[rooms[0]] : groupRooms[rooms[0]]
                            return {
                                type: GOT_UPDATE_ROOM,
                                payload: {
                                    name: room.name,
                                    id: rooms[0],
                                    members: room.members,
                                    type: room.type,
                                    visibility: room.visibility,
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
    QsmYNTiwPdSlo3nYQG4WqCDWzxl2
        {
type: 'ADD_ROOM',
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