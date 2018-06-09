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
    FETCHING_INSTANCES,
    FETCH_ALL_INSTANCES,
    GOT_INSTANCE,
    REMOVE_ALL_INSTANCES,
    GOT_REMOVE_INSTANCE,
    GOT_UPDATE_INSTANCE,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const instanceAdd$ = new Subject()
const instanceUpdate$ = new Subject()
const instanceRemove$ = new Subject()

export const subscribeInstances = () => (querySnapshot) => {
    let updateType
    let instances = {}
    querySnapshot.docChanges().forEach((instance) => {
        instances[instance.doc.id] = instance.doc.data()
        updateType = instance.type
    })
    switch (updateType) {
        case 'added':
            instanceAdd$.next(instances)
            break
        case 'modified':
            instanceUpdate$.next(instances)
            break
        case 'removed':
            instanceRemove$.next(instances)
            break
        default:
            break
    }
}

export const listenInstances = firestore.collection('instances')
    .orderBy('createdAt')

export const instancesEpic = action$ =>
    action$.pipe(
        ofType(FETCHING_INSTANCES),
        //tap(v => console.log('Antes de flat: ', v)),        
        flatMap(() => (
            instanceAdd$.pipe(
                //tap(v => console.log('add: ', v)),
                map((instances) => {
                    if (Object.keys(instances).length > 1)
                        return {
                            type: FETCH_ALL_INSTANCES,
                            payload: instances,
                        }
                    const instance = Object.values(instances).shift()
                    return {
                        type: GOT_INSTANCE,
                        payload: {
                            name: instance.name,
                            id: Object.keys(instances).shift(),
                            members: instance.members,
                            problems: instance.problems,
                            createdAt: instance.createdAt,
                        },
                    }
                }),
                merge(instanceRemove$.pipe(
                    //tap(v => console.log('remove: ', v)),
                    map((instances) => {
                        if (Object.keys(instances).length > 1)
                            return {
                                type: REMOVE_ALL_INSTANCES,
                            }
                        return {
                            type: GOT_REMOVE_INSTANCE,
                            payload: {
                                id: Object.keys(instances).shift(),
                            },
                        }
                    }),
                    merge(instanceUpdate$.pipe(
                        //tap(v => console.log('update: ', v)),
                        map((instances) => {
                            const instance = Object.values(instances).shift()
                            return {
                                type: GOT_UPDATE_INSTANCE,
                                payload: {
                                    name: instance.name,
                                    id: Object.keys(instances).shift(),
                                    members: instance.members,
                                    problems: instance.problems,
                                    createdAt: instance.createdAt,
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