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
    let instancesOrdered = []
    querySnapshot.docChanges().forEach((instance) => {
        instancesOrdered.push(instance.doc.id)
        instances[instance.doc.id] = instance.doc.data()
        updateType = instance.type
    })
    switch (updateType) {
        case 'added':
            instanceAdd$.next({ instances, instancesOrdered })
            break
        case 'modified':
            instanceUpdate$.next({ instances, instancesOrdered })
            break
        case 'removed':
            instanceRemove$.next({ instances, instancesOrdered })
            break
        default:
            break
    }
}

export const listenInstances = firestore.collection('instances')
    .orderBy('createdAt', 'desc')

export const instancesEpic = action$ =>
    action$.pipe(
        ofType(FETCHING_INSTANCES),
        //tap(v => console.log('Antes de flat: ', v)),        
        flatMap(() => (
            instanceAdd$.pipe(
                //tap(v => console.log('add: ', v)),
                map(({ instances, instancesOrdered }) => {
                    if (instancesOrdered.length > 1)
                        return {
                            type: FETCH_ALL_INSTANCES,
                            payload: {
                                instances,
                                instancesOrdered,
                            }
                        }
                    const instance = instances[instancesOrdered[0]]
                    return {
                        type: GOT_INSTANCE,
                        payload: {
                            id: instancesOrdered[0],
                            name: instance.name,
                            initGPR: instance.initGPR,
                            initFPR: instance.initFPR,
                            initMEM: instance.initMEM,
                            finalGPR: instance.finalGPR,
                            finalFPR: instance.finalFPR,
                            finalMEM: instance.finalMEM,
                            createdAt: instance.createdAt,
                        },
                    }
                }),
                merge(instanceRemove$.pipe(
                    //tap(v => console.log('remove: ', v)),
                    map(({ instances, instancesOrdered }) => {
                        if (instancesOrdered.length > 1)
                            return {
                                type: REMOVE_ALL_INSTANCES,
                            }
                        return {
                            type: GOT_REMOVE_INSTANCE,
                            payload: {
                                id: instancesOrdered[0],
                            },
                        }
                    }),
                    merge(instanceUpdate$.pipe(
                        //tap(v => console.log('update: ', v)),
                        map(({ instances, instancesOrdered }) => {
                            const instance = instances[instancesOrdered[0]]
                            return {
                                type: GOT_UPDATE_INSTANCE,
                                payload: {
                                    id: instancesOrdered[0],
                                    name: instance.name,
                                    initGPR: instance.initGPR,
                                    initFPR: instance.initFPR,
                                    initMEM: instance.initMEM,
                                    finalGPR: instance.finalGPR,
                                    finalFPR: instance.finalFPR,
                                    finalMEM: instance.finalMEM,
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