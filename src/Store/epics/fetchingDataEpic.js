import 'firebase/firestore'
import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import {
    flatMap,
} from 'rxjs/operators'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    FETCHING_ROOMS,
    FETCHING_GROUPS,
    FETCHING_PROBLEMS,
    FETCHING_INSTANCES,
    FETCHING_HISTORY,
    FETCHING_RANKINGS,
    FETCHING_USERS,
    STUDENT_LOGIN,
    ADMIN_LOGIN,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })


export const fetchingDataEpicStudent = action$ =>
    action$.pipe(
        ofType(STUDENT_LOGIN),
        flatMap(() => (
            of(
                {
                    type: FETCHING_GROUPS,
                },
                {
                    type: FETCHING_USERS,
                },
                {
                    type: FETCHING_INSTANCES,
                },
                {
                    type: FETCHING_HISTORY,
                },
                {
                    type: FETCHING_RANKINGS,
                },
                {
                    type: FETCHING_ROOMS,
                },
            )
        ))
    )
export const fetchingDataEpicAdmin = action$ =>
    action$.pipe(
        ofType(ADMIN_LOGIN),
        flatMap(() => (
            of(
                {
                    type: FETCHING_GROUPS,
                },
                {
                    type: FETCHING_USERS,
                },
                {
                    type: FETCHING_INSTANCES,
                },
                {
                    type: FETCHING_PROBLEMS,
                },
                {
                    type: FETCHING_HISTORY,
                },
                {
                    type: FETCHING_RANKINGS,
                },
                {
                    type: FETCHING_ROOMS,
                },
            )
        ))
    )
