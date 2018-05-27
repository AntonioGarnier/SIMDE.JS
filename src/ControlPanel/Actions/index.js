import { signIn, signOut } from '../Components/FirebaseProvider'
import { removeState } from '../../LocalStorage'
import {
    USER_LOGIN,
    USER_LOGOUT,
    OPEN_SIDE_BAR,
    CLOSE_SIDE_BAR,
    CHECKING_USER,
    CHECKED_USER,
} from '../Constants'


export function checkingUser() {
    return {
        type: CHECKING_USER,
        payload: true,
    }
}

export function checkedUser() {
    return {
        type: CHECKED_USER,
        payload: false,
    }
}

export function setUser(user) {
    return {
        type: USER_LOGIN,
        payload: user,
    }
}

export function logingOut() {
    return {
        type: USER_LOGOUT,
    }
}

export function login() {
    return () => {
        const user = signIn()
        console.log(user)
    }
}

export function logout() {
    return (dispatch) => {
        dispatch(logingOut())
        removeState()
        signOut()
    }
}

export function openSideBar() {
    return {
        type: OPEN_SIDE_BAR,
        payload: true,
    }
}

export function closeSideBar() {
    return {
        type: CLOSE_SIDE_BAR,
        payload: false,
    }
}
