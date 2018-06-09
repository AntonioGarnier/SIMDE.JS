import 'firebase/firestore'
import {
    singleRoomAdd$,
    singleRoomRemove$,
    singleRoomUpdate$,
} from './manageSingleRoomEpic'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export const singleRoomListener = firestore.collection('singleRooms')
    .orderBy('createdAt')
    .onSnapshot((querySnapshot) => {
        let updateType
        let rooms = {}
        console.log('Single: ', querySnapshot.docChanges())
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
    })