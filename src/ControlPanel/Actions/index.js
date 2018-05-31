import {
    USER_LOGIN,
    USER_LOGGING_IN,
    USER_LOGOUT,
    OPEN_SIDE_BAR,
    CLOSE_SIDE_BAR,
    CHECKING_USER,
    CHECKED_USER,
    FETCHING_ALL_ROOMS,
    FETCHING_ROOM,
} from '../Constants'


export function fetchingAllRooms(rooms) {
    return {
        type: FETCHING_ALL_ROOMS,
        payload: {
            rooms,
        }
    }
}

export function fetchingRoom(room) {
    return {
        type: FETCHING_ROOM,
        payload: {
            room,
        }
    }
}

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
    return {
        type: USER_LOGGING_IN,
    }
}

export function logout() {
    return {
        type: USER_LOGOUT,
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
