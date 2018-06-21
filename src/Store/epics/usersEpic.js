import 'firebase/firestore'
import { ofType } from 'redux-observable'
import { Subject } from 'rxjs'
import {
    map,
    flatMap,
    //tap,
    merge,
} from 'rxjs/operators'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    FETCHING_USERS,
    FETCH_ALL_USERS,
    GOT_ADD_USER,
    REMOVE_ALL_USERS,
    GOT_REMOVE_USER,
    GOT_UPDATE_USER,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const userAdd$ = new Subject()
const userUpdate$ = new Subject()
const userRemove$ = new Subject()

export const subscribeUsers = () => (querySnapshot) => {
    let updateType
    let users = {}
    let usersOrdered = []
    querySnapshot.docChanges().forEach((user) => {
        usersOrdered.push(user.doc.id)
        users[user.doc.id] = user.doc.data()
        updateType = user.type
    })
    switch (updateType) {
        case 'added':
            userAdd$.next({ users, usersOrdered })
            break
        case 'modified':
            userUpdate$.next({ users, usersOrdered })
            break
        case 'removed':
            userRemove$.next({ users, usersOrdered })
            break
        default:
            break
    }
}

export const listenUsers = firestore.collection('userList')
    .orderBy('name', 'desc')

export const usersEpic = action$ =>
    action$.pipe(
        ofType(FETCHING_USERS),
        //tap(v => console.log('Antes de flat: ', v)),        
        flatMap(() => (
            userAdd$.pipe(
                //tap(v => console.log('add: ', v)),
                map(({ users, usersOrdered }) => {
                    if (usersOrdered.length > 1)
                        return {
                            type: FETCH_ALL_USERS,
                            payload: {
                                users,
                                usersOrdered,
                            }
                        }
                     
                    return {
                        type: GOT_ADD_USER,
                        payload: {
                            users,   
                            id: usersOrdered[0],
                        },
                    }
                }),
                merge(userRemove$.pipe(
                    //tap(v => console.log('remove: ', v)),
                    map(({ users, usersOrdered }) => {
                        if (usersOrdered.length > 1)
                            return {
                                type: REMOVE_ALL_USERS,
                            }
                        return {
                            type: GOT_REMOVE_USER,
                            payload: {
                                id: usersOrdered[0],
                            },
                        }
                    }),
                    merge(userUpdate$.pipe(
                        //tap(v => console.log('update: ', v)),
                        map(({ users, usersOrdered }) => {
                            return {
                                type: GOT_UPDATE_USER,
                                payload: {
                                    users,
                                    id: usersOrdered[0],
                                },
                            }
                        }),
                    ))
                ))
            )
        )),
        //tap(v => console.log('despues de flat: ', v))       
    )
