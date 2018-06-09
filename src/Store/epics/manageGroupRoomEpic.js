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
    FETCHING_GROUP_ROOMS,
    FETCH_ALL_GROUP_ROOMS,
    GOT_GROUP_ROOM,
    REMOVE_ALL_GROUP_ROOMS,
    GOT_UPDATE_GROUP_ROOM,
    GOT_REMOVE_GROUP_ROOM,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })


const groupRoomAdd$ = new Subject()
const groupRoomUpdate$ = new Subject()
const groupRoomRemove$ = new Subject()

export const subscribeGroupRoom = () => (querySnapshot) => {
        let updateType
        let rooms = {}
        querySnapshot.docChanges().forEach((room) => {
            rooms[room.doc.id] = room.doc.data()
            updateType = room.type
        })
        switch (updateType) {
            case 'added':
                groupRoomAdd$.next(rooms)
                break
            case 'modified':
                groupRoomUpdate$.next(rooms)
                break
            case 'removed':
                groupRoomRemove$.next(rooms)
                break
            default:
                break
        }
    }


export const listenGroupRoom = firestore.collection('groupRooms')
    .orderBy('createdAt')

export const manageGroupRoomEpic = action$ =>
    action$.pipe(
        ofType(FETCHING_GROUP_ROOMS),
        // tap(v => console.log('Antes de flat: ', v)),        
        flatMap(() => (
            groupRoomAdd$.pipe(
                // tap(v => console.log('add: ', v)),
                map((rooms) => {
                    if (Object.keys(rooms).length > 1)
                        return {
                            type: FETCH_ALL_GROUP_ROOMS,
                            payload: rooms,
                        }
                    const room = Object.values(rooms).shift()
                    return {
                        type: GOT_GROUP_ROOM,
                        payload: {
                            name: room.name,
                            id: Object.keys(rooms).shift(),
                            members: room.members,
                            problems: room.problems,
                            createdAt: room.createdAt,
                        },
                    }
                }),
                merge(groupRoomRemove$.pipe(
                    // tap(v => console.log('remove: ', v)),
                    map((rooms) => {
                        if (Object.keys(rooms).length > 1)
                            return {
                                type: REMOVE_ALL_GROUP_ROOMS,
                            }
                        return {
                            type: GOT_REMOVE_GROUP_ROOM,
                            payload: {
                                id: Object.keys(rooms).shift(),
                            },
                        }
                    }),
                    merge(groupRoomUpdate$.pipe(
                        // tap(v => console.log('update: ', v)),
                        map((rooms) => {
                            const room = Object.values(rooms).shift()
                            return {
                                type: GOT_UPDATE_GROUP_ROOM,
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
        // tap(v => console.log('despues de flat: ', v))       
        
    )

        /*
        {
type: 'ADD_GROUP_ROOM',
payload: {
  name: 'Sala para los del caja',
  members: {
   'Grupo3': true,
   'piz87UphFDYXHzidJkRx': true,
},
  problems: {
    'Problema 33': true,
},
  password: 'secretitoiberico',
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