import 'firebase/firestore'
import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import {
    flatMap,
    map,
    tap,
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
    USER_LOGIN,
    ACTIVATE_STUDENT_LISTENERS,
    ACTIVATE_ADMIN_LISTENERS,
    DEACTIVATE_ADMIN_LISTENERS,
    DEACTIVATE_STUDENT_LISTENERS,
    USER_LOGOUT,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })




export const userLoginOutEpic = (action$) =>
    action$.pipe(
        ofType(USER_LOGOUT),
        tap(v => console.log('***: ', v)),
        map((action) => (
            action.payload.rol === 'admin'
                ? { type: DEACTIVATE_ADMIN_LISTENERS }
                : { type: DEACTIVATE_STUDENT_LISTENERS }
        )),
        tap(v => console.log('---- ', v))
    ) 

export const checkUserRolEpic = action$ =>
    action$.pipe(
        ofType(USER_LOGIN),
        flatMap((action) => (
            action.payload.rol === 'admin'
                ? of (
                    { type: ADMIN_LOGIN },
                    { type: ACTIVATE_ADMIN_LISTENERS },
                )
                : of (
                    { type: STUDENT_LOGIN },
                    { type: ACTIVATE_STUDENT_LISTENERS },
                )
        )),
    ) 

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
