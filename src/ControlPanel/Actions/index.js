import {
    USER_LOGIN,
    USER_LOGGING_IN,
    USER_LOGOUT,
    CHANGE_PATH,
    OPEN_SIDE_BAR,
    CLOSE_SIDE_BAR,
    CHECKING_USER,
    CHECKED_USER,
    ADD_ROOM,
    REMOVE_ROOM,
    UPDATE_NAME_ROOM,
    UPDATE_PROBLEMS_ROOM,
    UPDATE_VISIBILITY_ROOM,
    CLOSE_SNACK_BAR,
    OPEN_SNACK_BAR,
    ADD_PROBLEM,
    UPDATE_INSTANCES_PROBLEM,
    UPDATE_NAME_PROBLEM,
    REMOVE_PROBLEM,
    UPDATE_DEFINITION_PROBLEM,
    ADD_GROUP,
    REMOVE_GROUP,
    REMOVE_INSTANCE,
    ADD_INSTANCE,
} from '../Constants'


export function addInstance(instance) {
    return {
        type: ADD_INSTANCE,
        payload: {
            name: instance.name,
            initial: instance.initial,
            final: instance.final,
        }
    }
}

export function removeInstance(id) {
    return {
        type: REMOVE_INSTANCE,
        payload: {
            id,
        }
    }
}

export function removeGroup(id, leader) {
    return {
        type: REMOVE_GROUP,
        payload: {
            id,
            leader,
        }
    }
}

export function addGroup(group) {
    return {
        type: ADD_GROUP,
        payload: {
            name: group.name,
            password: group.password,
            leader: group.leader,
            members: {},
        }
    }
}

export function closeSnackBar() {
    return {
        type: CLOSE_SNACK_BAR,
    }
}

export function openSnackBar(message, type) {
    return {
        type: OPEN_SNACK_BAR,
        payload: {
            message,
            type,
        }
    }
}

export function updateDefinitionProblem(id, definition) {
    return {
        type: UPDATE_DEFINITION_PROBLEM,
        payload: {
            id,
            definition,
        }
    }
}

export function updateInstancesProblem(id, instances) {
    return {
        type: UPDATE_INSTANCES_PROBLEM,
        payload: {
            id,
            instances,
        }
    }
}

export function updateNameProblem(id, name) {
    return {
        type: UPDATE_NAME_PROBLEM,
        payload: {
            id,
            name,
        }
    }
}

export function removeProblem(id) {
    return {
        type: REMOVE_PROBLEM,
        payload: {
            id,
        }
    }
}

export function addProblem(problem) {
    return {
        type: ADD_PROBLEM,
        payload: {
            name: problem.name,
            instances: problem.instances,
            definition: problem.definition,
        }
    }
}

export function updateProblemsRoom(id, problems) {
    return {
        type: UPDATE_PROBLEMS_ROOM,
        payload: {
            id,
            problems,
        }
    }
}

export function updateVisibilityRoom(id, visibility) {
    return {
        type: UPDATE_VISIBILITY_ROOM,
        payload: {
            id,
            visibility,
        }
    }
}

export function updateNameRoom(id, name) {
    return {
        type: UPDATE_NAME_ROOM,
        payload: {
            id,
            name,
        }
    }
}

export function removeRoom(id) {
    return {
        type: REMOVE_ROOM,
        payload: {
            id,
        }
    }
}

export function addRoom(room) {
    return {
        type: ADD_ROOM,
        payload: {
            name: room.name,
            members: {},
            problems: room.problems,
            visibility: room.visibility,
            type: room.type,
            password: room.password,
        }
    }
}

export function changePath(path) {
    return {
        type: CHANGE_PATH,
        payload: {
            path,
        }
    }
}
/*export function addGroupRoom(rooms) {
    return {
        type: ADD_GROUP_ROOM,
        payload: {
            rooms,
        }
    }
}

export function removeSingleRoom(rooms) {
    return {
        type: REMOVE_SINGLE_ROOM,
        payload: {
            rooms,
        }
    }
}

export function removeGroupRoom(rooms) {
    return {
        type: REMOVE_GROUP_ROOM,
        payload: {
            rooms,
        }
    }
}

export function updateSingleRoom(room) {
    return {
        type: UPDATE_SINGLE_ROOM,
        payload: {
            room,
        }
    }
}

export function updateGroupRoom(room) {
    return {
        type: UPDATE_GROUP_ROOM,
        payload: {
            room,
        }
    }
}*/

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
