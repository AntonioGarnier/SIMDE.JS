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
    FETCHING_PROBLEMS,
    FETCH_ALL_PROBLEMS,
    GOT_ADD_PROBLEM,
    REMOVE_ALL_PROBLEMS,
    GOT_REMOVE_PROBLEM,
    GOT_UPDATE_PROBLEM,
    GOT_UPDATE_SOME_PROBLEMS,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const problemAdd$ = new Subject()
const problemUpdate$ = new Subject()
const problemRemove$ = new Subject()

export const subscribeProblem = () => (querySnapshot) => {
    let updateType
    let problems = {}
    let problemsOrdered = [] 
    querySnapshot.docChanges().forEach((problem) => {
        problemsOrdered.push(problem.doc.id)
        problems[problem.doc.id] = problem.doc.data()
        updateType = problem.type
    })
    switch (updateType) {
        case 'added':
            problemAdd$.next({ problems, problemsOrdered })
            break
        case 'modified':
            problemUpdate$.next({ problems, problemsOrdered })
            break
        case 'removed':
            problemRemove$.next({ problems, problemsOrdered })
            break
        default:
            break
    }
}

export const listenProblem = firestore.collection('problems')
    .orderBy('createdAt', 'desc')

export const problemsEpic = action$ =>
action$.pipe(
    ofType(FETCHING_PROBLEMS),
    //tap(v => console.log('Antes de flat: ', v)),        
    flatMap(() => (
        problemAdd$.pipe(
            //tap(v => console.log('add: ', v)),
            map(({ problems, problemsOrdered }) => {
                if (problemsOrdered.length > 1)
                    return {
                        type: FETCH_ALL_PROBLEMS,
                        payload: {
                            problems,
                            problemsOrdered,
                        }
                    }
                const problem = problems[problemsOrdered[0]]
                return {
                    type: GOT_ADD_PROBLEM,
                    payload: {
                        id: problemsOrdered[0],
                        name: problem.name,
                        instances: problem.instances,
                        definition: problem.definition,
                        createdAt: problem.createdAt,
                    },
                }
            }),
            merge(problemRemove$.pipe(
                //tap(v => console.log('remove: ', v)),
                map(({ problems, problemsOrdered }) => {
                    if (problemsOrdered.length > 1)
                        return {
                            type: REMOVE_ALL_PROBLEMS,
                        }
                    return {
                        type: GOT_REMOVE_PROBLEM,
                        payload: {
                            id: problemsOrdered[0],
                        },
                    }
                }),
                merge(problemUpdate$.pipe(
                    //tap(v => console.log('update: ', v)),
                    map(({ problems, problemsOrdered }) => {
                        if (problemsOrdered.length > 1)
                            return {
                                type: GOT_UPDATE_SOME_PROBLEMS,
                                payload: {
                                    problems,
                                }
                            }
                        const problem = problems[problemsOrdered[0]]
                        return {
                            type: GOT_UPDATE_PROBLEM,
                            payload: {
                                id: problemsOrdered[0],
                                name: problem.name,
                                instances: problem.instances,
                                definition: problem.definition,
                                createdAt: problem.createdAt,
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


