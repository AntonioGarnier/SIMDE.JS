import 'firebase/firestore'
import { ofType } from 'redux-observable'
import { interval, of } from 'rxjs'
import {
    map,
    take,
    flatMap,
    tap,
    takeUntil,
    from,
} from 'rxjs/operators'
import firebase from '../../ControlPanel/Components/FirebaseProvider/firebase'
import { signIn, signOut } from '../../ControlPanel/Components/FirebaseProvider/auth'
import {
    USER_LOGGING_IN,
    USER_LOGIN,
    FETCHING_ROOM,
    FETCHING_ALL_ROOMS,
} from '../../ControlPanel/Constants'
import {
    login
} from '../../ControlPanel/Actions'

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

/* firestore.collection('tasks')
    .onSnapshot((querySnapshot) => {
        console.log('Current data: ', querySnapshot.docChanges())
        querySnapshot.docChanges().forEach((doc2) => {
            console.log('Current data2: ', doc2.doc.data())
        })
    }) */

export const fetchingData = action$ =>
    action$.pipe(
        ofType(USER_LOGIN),
        flatMap(() => (
            of(
                firestore.collection('admins')
                    .onSnapshot((querySnapshot) => {
                        querySnapshot.docChanges().length < 2
                            ? querySnapshot.docChanges().map((item) => (
                                {
                                    type: FETCHING_ROOM,
                                    payload: {
                                        room: item.doc.data(),
                                    }
                                }
                            ))
                            : querySnapshot.docChanges() //Array de objetos lanzar esto 
                                //En el payload de la action FETCH_ALL_ROOMS
                            
                            
                         
                        // console.log('Current data: ', querySnapshot.size)
                        
                        // console.log('Current data: ', querySnapshot.docChanges())
                        querySnapshot.docChanges().forEach((doc2) => {
                            console.log('Current data2: ', doc2.doc.data())
                        })
                    })
            )


        ))
        /* flatMap(() => (
            of(
                {
                    type: FETCHING_TASKS_FROM_FIREBASE,
                },
                {
                    type: TEST1,
                },
                {
                    type: TEST2,
                },
            )
        )) */
    )

export const fetchTasksFromFirebase = action$ =>
    action$.pipe(
        ofType(FETCHING_TASKS_FROM_FIREBASE),
        /* flatMap(() => (
            firestore.collection('tasks').get().then((querySnapshot) => {
                let tasks = Immutable.List()
                querySnapshot.forEach((doc) => {
                    tasks = tasks.push(Immutable.Map({
                        task: doc.data().task,
                        done: doc.data().done,
                        id: doc.id,
                    }))
                })
                return {
                    type: FETCH_TASKS_FROM_FIREBASE,
                    payload: {
                        tasks,
                    },
                }
            })
        )),
        tap(v => console.log('out', v)) */
    )

export const addTaskToFirebaseEpic = action$ =>
    action$.pipe(
        ofType(ADD_NEW_TASK),
        /* tap(v => console.log('Hey, lets go to add new task:', v.payload.task)),
        flatMap(action => (
            interval(3000).pipe(
                takeUntil(action$.ofType(ADD_NEW_TASK_CANCELLED)),
                takeUntil(action$.ofType(ADD_NEW_TASK)),
                take(5),
                map((act) => {
                    const newTaskRef = firestore.collection('tasks').doc()
                    newTaskRef.set({
                        task: `${action.payload.task} ${act}`,
                        done: false,
                    })
                    return {
                        type: GOT_NEW_TASK,
                        payload: {
                            task: `${action.payload.task} ${act}`,
                            done: false,
                            taskId: newTaskRef.id,
                        },
                    }
                }),
                tap(v => console.log('Sending task:', v.payload.task)),
            )

        )), */
    )