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
    FETCHING_HISTORY,
    FETCH_ALL_HISTORY,
    //GOT_ADD_HISTORY,
    REMOVE_ALL_HISTORY,
    //GOT_REMOVE_HISTORY,
    //GOT_UPDATE_HISTORY,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const historyAdd$ = new Subject()
const historyUpdate$ = new Subject()
const historyRemove$ = new Subject()

export const subscribeHistory = () => (querySnapshot) => {
    let updateType
    let history = {}
    let historyOrdered = []
    querySnapshot.docChanges().forEach((data) => {
        historyOrdered.push(data.doc.id)
        history[data.doc.id] = data.doc.data()
        updateType = data.type
    })
    switch (updateType) {
        case 'added':
            historyAdd$.next({ history, historyOrdered })
            break
        case 'modified':
            historyUpdate$.next({ history, historyOrdered })
            break
        case 'removed':
            historyRemove$.next({ history, historyOrdered })
            break
        default:
            break
    }
}

export const listenHistory = firestore.collection('history')
    

export const historyEpic = action$ =>
    action$.pipe(
        ofType(FETCHING_HISTORY),
        //tap(v => console.log('Antes de flat: ', v)),        
        flatMap(() => (
            historyAdd$.pipe(
                tap(v => console.log('add: ', v)),
                map(({ history, historyOrdered }) => {
                    const hist = history[historyOrdered[0]]
                    return {
                        type: FETCH_ALL_HISTORY,
                        payload: {
                            history: hist,
                        },
                    }
                }),
                merge(historyRemove$.pipe(
                    tap(v => console.log('remove: ', v)),
                    map(({ history, historyOrdered }) => {
                            return {
                                type: REMOVE_ALL_HISTORY,
                            }
                    }),
                    merge(historyUpdate$.pipe(
                        tap(v => console.log('update: ', v)),
                        map(({ history, historyOrdered }) => {
                            const hist = history[historyOrdered[0]]
                            return {
                                type: FETCH_ALL_HISTORY,
                                payload: {
                                    history: hist,
                                },
                            }
                        }),
                    ))
                ))
            )
        )),
        //tap(v => console.log('despues de flat: ', v))       
    )