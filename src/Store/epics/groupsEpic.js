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
    FETCHING_GROUPS,
    FETCH_ALL_GROUPS,
    GOT_GROUP,
    REMOVE_ALL_GROUPS,
    GOT_REMOVE_GROUP,
    GOT_UPDATE_GROUP,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const groupAdd$ = new Subject()
const groupUpdate$ = new Subject()
const groupRemove$ = new Subject()

export const subscribeGroups = () => (querySnapshot) => {
    let updateType
    let groups = {}
    querySnapshot.docChanges().forEach((group) => {
        groups[group.doc.id] = group.doc.data()
        updateType = group.type
    })
    switch (updateType) {
        case 'added':
            groupAdd$.next(groups)
            break
        case 'modified':
            groupUpdate$.next(groups)
            break
        case 'removed':
            groupRemove$.next(groups)
            break
        default:
            break
    }
}

export const listenGroups = firestore.collection('groups')
    .orderBy('createdAt')

export const groupsEpic = action$ =>
    action$.pipe(
        ofType(FETCHING_GROUPS),
        //tap(v => console.log('Antes de flat: ', v)),        
        flatMap(() => (
            groupAdd$.pipe(
                //tap(v => console.log('add: ', v)),
                map((groups) => {
                    if (Object.keys(groups).length > 1)
                        return {
                            type: FETCH_ALL_GROUPS,
                            payload: {
                                groups,
                            }
                        }
                    const group = Object.values(groups).shift()
                    return {
                        type: GOT_GROUP,
                        payload: {
                            name: group.name,
                            id: Object.keys(groups).shift(),
                            members: group.members,
                            leader: group.leader,
                            createdAt: group.createdAt,
                        },
                    }
                }),
                merge(groupRemove$.pipe(
                    //tap(v => console.log('remove: ', v)),
                    map((groups) => {
                        if (Object.keys(groups).length > 1)
                            return {
                                type: REMOVE_ALL_GROUPS,
                            }
                        return {
                            type: GOT_REMOVE_GROUP,
                            payload: {
                                id: Object.keys(groups).shift(),
                            },
                        }
                    }),
                    merge(groupUpdate$.pipe(
                        //tap(v => console.log('update: ', v)),
                        map((groups) => {
                            const group = Object.values(groups).shift()
                            return {
                                type: GOT_UPDATE_GROUP,
                                payload: {
                                    name: group.name,
                                    id: Object.keys(groups).shift(),
                                    members: group.members,
                                    leader: group.leader,
                                    createdAt: group.createdAt,
                                },
                            }
                        }),
                    ))
                ))
            )
        )),
        //tap(v => console.log('despues de flat: ', v))       
    )


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