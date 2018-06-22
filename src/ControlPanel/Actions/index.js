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
    GET_PROBLEMS,
    UPDATE_INSTANCES_PROBLEM,
    UPDATE_NAME_PROBLEM,
    REMOVE_PROBLEM,
    UPDATE_DEFINITION_PROBLEM,
    ADD_GROUP,
    REMOVE_GROUP,
    REMOVE_INSTANCE,
    ADD_INSTANCE,
    OPEN_POP_UP,
    CLOSE_POP_UP,
    REQUEST_JOIN_FAILED,
    CHECK_GROUP_PASSWORD,
    CHECK_ROOM_PASSWORD,
    CHANGE_ACTIVE_GROUP,
    GET_MEMBERS,
    UPDATE_RANKING_RESULTS,
    OPEN_SIDE_BAR_RANK,
    CLOSE_SIDE_BAR_RANK,
    SAVE_INSTANCE_RESULT,
    RESET_INSTANCE_RESULT,
    SEND_RESULTS_TO_RANK,
    SAVE_CODE_TO_HISTORY,
    ADMIN_LOGIN,
    STUDENT_LOGIN,
    ACTIVATE_LISTENERS,
    USER_NOT_CONNECTED,
    LEAVE_ROOM,
    LEAVE_GROUP,
} from '../Constants'


export function leaveGroup(id, leader) {
    return {
        type: LEAVE_GROUP,
        payload: {
            id,
            leader,
        }
    }
}

export function leaveRoom(id, member) {
    return {
        type: LEAVE_ROOM,
        payload: {
            id,
            member,
        }
    }
}

export function activateListeners() {
    return {
        type: ACTIVATE_LISTENERS,
    }
}

export function adminLogin() {
    return {
        type: ADMIN_LOGIN,
    }
}

export function studentLogin() {
    return {
        type: STUDENT_LOGIN,
    }
}

export function saveCodeToHistory({ user, room, roomName, problemId, problem, code }) {
    return {
        type: SAVE_CODE_TO_HISTORY,
        payload: {
            user,
            room,
            roomName,
            problemId,
            problem,
            code,
        }
    }
}

export function sendResultsToRank({ room, member, problem, cycles }) {
    return {
        type: SEND_RESULTS_TO_RANK,
        payload: {
            room,
            member,
            problem,
            cycles,
        }
    }
}

export function resetInstanceResult(room, problem) {
    return {
        type: RESET_INSTANCE_RESULT,
        payload: {
            room,
            problem,
        }
    }
}

export function saveInstanceResult({ room, problem, instance, isCorrect, cycles }) {
    return {
        type: SAVE_INSTANCE_RESULT,
        payload: {
            room,
            problem,
            instance,
            isCorrect,
            cycles,
        }
    }
}

export function updateRankingResults(id, member, result) {
    return {
        type: UPDATE_RANKING_RESULTS,
        payload: {
            id,
            member,
            result,
        }
    }
}

export function getMembers(members) {
    return {
        type: GET_MEMBERS,
        payload: {
            members,
        }
    }
}

export function getProblems(problems) {
    return {
        type: GET_PROBLEMS,
        payload: {
            problems,
        }
    }
}

export function changeActiveGroup(id) {
    return {
        type: CHANGE_ACTIVE_GROUP,
        payload: {
            id,
        }
    }
}

export function checkGroupPassword(id, password) {
    return {
        type: CHECK_GROUP_PASSWORD,
        payload: {
            id,
            password,
        }
    }
}

export function checkRoomPassword(id, password, member) {
    return {
        type: CHECK_ROOM_PASSWORD,
        payload: {
            id,
            password,
            member,
        }
    }
}

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

export function requestJoinFailed() {
    return {
        type: REQUEST_JOIN_FAILED,
    }
}

export function closePopUp() {
    return {
        type: CLOSE_POP_UP,
    }
}

export function openPopUp(title, type, id, name, member = '') {
    return {
        type: OPEN_POP_UP,
        payload: {
            title,
            type,
            id,
            name,
            member,
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

export function userNotConnected() {
    return {
        type: USER_NOT_CONNECTED,
    }
}

export function logout() {
    return {
        type: USER_LOGOUT,
    }
}

export function openSideBarRank() {
    return {
        type: OPEN_SIDE_BAR_RANK,
    }
}

export function closeSideBarRank() {
    return {
        type: CLOSE_SIDE_BAR_RANK,
    }
}

export function openSideBar() {
    return {
        type: OPEN_SIDE_BAR,
    }
}

export function closeSideBar() {
    return {
        type: CLOSE_SIDE_BAR,
    }
}
