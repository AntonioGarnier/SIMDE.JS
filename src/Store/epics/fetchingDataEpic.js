import 'firebase/firestore'
import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import {
    flatMap,
} from 'rxjs/operators'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import {
    USER_LOGIN,
    FETCHING_ROOMS,
    FETCHING_GROUPS,
    FETCHING_PROBLEMS,
    FETCHING_INSTANCES,
    FETCHING_HISTORY,
    FETCHING_RANKINGS,
} from '../../ControlPanel/Constants'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })


const fetchingDataEpic = action$ =>
    action$.pipe(
        ofType(USER_LOGIN),
        flatMap(() => (
            of(
                {
                    type: FETCHING_GROUPS,
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

export default fetchingDataEpic
