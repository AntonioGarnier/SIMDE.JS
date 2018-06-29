import 'firebase/firestore'
import { ofType } from 'redux-observable'
import { Subject } from 'rxjs'
import {
    map,
    flatMap,
    tap,
    merge,
    throttleTime,
} from 'rxjs/operators'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    FETCHING_RANKINGS,
    FETCH_ALL_RANKINGS,
    GOT_ADD_RANKING,
    REMOVE_ALL_RANKINGS,
    GOT_REMOVE_RANKING,
    GOT_UPDATE_RANKING,
    SEND_RESULTS_TO_RANK,
    OPEN_SNACK_BAR,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const rankingAdd$ = new Subject()
const rankingUpdate$ = new Subject()
const rankingRemove$ = new Subject()

export const subscribeRanking = () => (querySnapshot) => {
    let updateType
    let ranking = {}
    querySnapshot.docChanges().forEach((rank) => {
        ranking[rank.doc.id] = rank.doc.data()
        updateType = rank.type
    })
    switch (updateType) {
        case 'added':
            rankingAdd$.next(ranking)
            break
        case 'modified':
            rankingUpdate$.next(ranking)
            break
        case 'removed':
            rankingRemove$.next(ranking)
            break
        default:
            break
    }
}

export const listenRanking = firestore.collection('ranking')

export const sendResultsToRankEpic = action$ => 
    action$.pipe (
        ofType(SEND_RESULTS_TO_RANK),
        throttleTime(60000),
        flatMap((action) => (
            firestore.collection('ranking').doc(action.payload.room)
                .set({
                    [action.payload.member]: {
                        [action.payload.problem]: action.payload.cycles,
                    },
                }, { merge: true })
                .then(() => ({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'SUCCESS: Results sent!',
                        type: 'success',
                    }
                }))
                .catch(() => ({
                    type: OPEN_SNACK_BAR,
                    payload: {
                        message: 'ERROR: Could not update ranking! (DataBase - Problem)',
                        type: 'error',
                    }
                }))
        )),
    )

export const rankingEpic = action$ =>
    action$.pipe(
        ofType(FETCHING_RANKINGS),
        //tap(v => console.log('Antes de flat: ', v)),        
        flatMap(() => (
            rankingAdd$.pipe(
                tap(v => console.log('add: ', v)),
                map((ranking) => {
                    if (Object.keys(ranking).length > 1)
                        return {
                            type: FETCH_ALL_RANKINGS,
                            payload: {
                                ranking,
                            }
                        }
                     
                    const rank = Object.keys(ranking)
                    return {
                        type: GOT_ADD_RANKING,
                        payload: {
                            id: rank[0],
                            ranking: ranking[rank],
                        },
                    }
                }),
                merge(rankingRemove$.pipe(
                    tap(v => console.log('remove: ', v)),
                    map((ranking) => {
                        if (Object.keys(ranking).length > 1)
                            return {
                                type: REMOVE_ALL_RANKINGS,
                            }
                        return {
                            type: GOT_REMOVE_RANKING,
                            payload: {
                                id: Object.keys(ranking)[0],
                            },
                        }
                    }),
                    merge(rankingUpdate$.pipe(
                        tap(v => console.log('update: ', v)),
                        map((ranking) => {
                            const rank = Object.keys(ranking)
                            return {
                                type: GOT_UPDATE_RANKING,
                                payload: {
                                    id: rank[0],
                                    ranking: ranking[rank],
                                },
                            }
                        }),
                    ))
                ))
            )
        )),
        //tap(v => console.log('despues de flat: ', v))       
    )
