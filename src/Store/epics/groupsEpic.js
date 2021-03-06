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
    FETCHING_GROUPS,
    FETCH_ALL_GROUPS,
    GOT_ADD_GROUP,
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
    let groupsOrdered = []
    querySnapshot.docChanges().forEach((group) => {
        groupsOrdered.push(group.doc.id)
        groups[group.doc.id] = group.doc.data()
        updateType = group.type
    })
    switch (updateType) {
        case 'added':
            groupAdd$.next({ groups, groupsOrdered })
            break
        case 'modified':
            groupUpdate$.next({ groups, groupsOrdered })
            break
        case 'removed':
            groupRemove$.next({ groups, groupsOrdered })
            break
        default:
            break
    }
}

export const listenGroups = firestore.collection('groups')
    .orderBy('createdAt', 'desc')

export const groupsEpic = action$ =>
    action$.pipe(
        ofType(FETCHING_GROUPS),
        //tap(v => console.log('Antes de flat: ', v)),        
        flatMap(() => (
            groupAdd$.pipe(
                //tap(v => console.log('add: ', v)),
                map(({ groups, groupsOrdered }) => {
                    if (groupsOrdered.length > 1)
                        return {
                            type: FETCH_ALL_GROUPS,
                            payload: {
                                groups,
                                groupsOrdered,
                            }
                        }
                     
                    const group = groups[groupsOrdered[0]]
                    return {
                        type: GOT_ADD_GROUP,
                        payload: {
                            id: groupsOrdered[0],
                            name: group.name,
                            members: group.members,
                            leader: group.leader,
                            createdAt: group.createdAt,
                        },
                    }
                }),
                merge(groupRemove$.pipe(
                    //tap(v => console.log('remove: ', v)),
                    map(({ groups, groupsOrdered }) => {
                        if (groupsOrdered.length > 1)
                            return {
                                type: REMOVE_ALL_GROUPS,
                            }
                        return {
                            type: GOT_REMOVE_GROUP,
                            payload: {
                                id: groupsOrdered[0],
                            },
                        }
                    }),
                    merge(groupUpdate$.pipe(
                        //tap(v => console.log('update: ', v)),
                        map(({ groups, groupsOrdered }) => {
                            const group = groups[groupsOrdered[0]]
                            return {
                                type: GOT_UPDATE_GROUP,
                                payload: {
                                    id: groupsOrdered[0],
                                    name: group.name,
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