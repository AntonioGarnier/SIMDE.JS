// Action INIT
export const INITIALIZE_APP = 'INITIALIZE_APP'

// Action SNACKBAR
export const CLOSE_SNACK_BAR = 'CLOSE_SNACK_BAR'
export const OPEN_SNACK_BAR = 'OPEN_SNACK_BAR'

// Action POPUP
export const OPEN_POP_UP = 'OPEN_POP_UP'
export const CLOSE_POP_UP = 'CLOSE_POP_UP'

// Action SIDEBAR
export const OPEN_SIDE_BAR = 'OPEN_SIDE_BAR'
export const CLOSE_SIDE_BAR = 'CLOSE_SIDE_BAR'

// Action ERRORS
export const ERROR_POPUP_OPEN = 'ERROR_POPUP_OPEN'

// Action Path
export const CHANGE_PATH = 'CHANGE_PATH'

// Action change active group
export const CHANGE_ACTIVE_GROUP = 'CHANGE_ACTIVE_GROUP'

// INITIALIZE_APP dispatch all the FETCH actions
    // Action when USER_LOGIN
    export const FETCHING_SINGLE_ROOMS = 'FETCHING_SINGLE_ROOMS'
    export const FETCHING_GROUP_ROOMS = 'FETCHING_GROUP_ROOMS'

// Action User
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGGING_IN = 'USER_LOGGING_IN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const CHECKING_USER = 'CHECKING_USER'
export const CHECKED_USER = 'CHECKED_USER'

// Action request
export const REQUEST_JOIN_FAILED = 'REQUEST_JOIN_FAILED'

// Other constants
export const HEADER_BAR_TITLE = 'SIMDE'

// Actions for ROOMS
    // Middleware
    export const CHECK_ROOM_PASSWORD = 'CHECK_ROOM_PASSWORD'
    export const JOIN_ROOM = 'JOIN_ROOM'
    export const LEAVE_ROOM = 'LEAVE_ROOM'
    export const ADD_ROOM = 'ADD_ROOM'
    export const REMOVE_ROOM = 'REMOVE_ROOM'
    export const UPDATE_NAME_ROOM = 'UPDATE_NAME_ROOM'
    export const UPDATE_PROBLEMS_ROOM = 'UPDATE_PROBLEMS_ROOM'
    export const UPDATE_VISIBILITY_ROOM = 'UPDATE_VISIBILITY_ROOM'
    // Epic
    export const FETCHING_ROOMS = 'FETCHING_ROOMS'
    export const FETCH_ALL_ROOMS = 'FETCH_ALL_ROOMS'
    export const REMOVE_ALL_ROOMS = 'REMOVE_ALL_ROOMS'
    export const GOT_ADD_ROOM = 'GOT_ADD_ROOM'
    export const GOT_REMOVE_ROOM = 'GOT_REMOVE_ROOM'
    export const GOT_UPDATE_ROOM = 'GOT_UPDATE_ROOM'

// Action Groups
    // MiddleWare
    export const GET_MEMBERS_FROM_GROUP = 'GET_MEMBERS_FROM_GROUP'
    export const GOT_MEMBER_TO_USERLIST = 'GOT_MEMBER_TO_USERLIST'
    export const CHECK_GROUP_PASSWORD = 'CHECK_GROUP_PASSWORD'
    export const ADD_GROUP = 'ADD_GROUP'
    export const REMOVE_GROUP = 'REMOVE_GROUP'
    export const UPDATE_NAME_GROUP = 'UPDATE_NAME_GROUP'
    export const UPDATE_LEADER_GROUP = 'UPDATE_LEADER_GROUP'
    export const JOIN_GROUP = 'JOIN_GROUP'
    export const LEAVE_GROUP = 'LEAVE_GROUP'
    // Epic
    export const FETCHING_GROUPS = 'FETCHING_GROUPS'
    export const FETCH_ALL_GROUPS = 'FETCH_ALL_GROUPS'
    export const GOT_ADD_GROUP = 'GOT_ADD_GROUP'
    export const REMOVE_ALL_GROUPS = 'REMOVE_ALL_GROUPS'
    export const GOT_REMOVE_GROUP = 'GOT_REMOVE_GROUP'
    export const GOT_UPDATE_GROUP = 'GOT_UPDATE_GROUP'

// Actions for PROBLEMS
    // Middleware
    export const ADD_PROBLEM = 'ADD_PROBLEM'
    export const UPDATE_DEFINITION_PROBLEM = 'UPDATE_DEFINITION_PROBLEM'
    export const UPDATE_INSTANCES_PROBLEM = 'UPDATE_INSTANCES_PROBLEM'
    export const UPDATE_NAME_PROBLEM = 'UPDATE_NAME_PROBLEM'
    export const REMOVE_PROBLEM = 'REMOVE_PROBLEM'
    // Epic
    export const FETCHING_PROBLEMS = 'FETCHING_PROBLEMS'
    export const FETCH_ALL_PROBLEMS = 'FETCH_ALL_PROBLEMS'
    export const REMOVE_ALL_PROBLEMS = 'REMOVE_ALL_PROBLEMS'
    export const GOT_ADD_PROBLEM = 'GOT_ADD_PROBLEM'
    export const GOT_REMOVE_PROBLEM = 'GOT_REMOVE_PROBLEM'
    export const GOT_UPDATE_PROBLEM = 'GOT_UPDATE_PROBLEM'

// Actions for INSTANCES
    // Middleware
    export const ADD_INSTANCE = 'ADD_INSTANCE'
    export const REMOVE_INSTANCE = 'REMOVE_INSTANCE'
    // Epic
    export const FETCHING_INSTANCES = 'FETCHING_INSTANCES'
    export const FETCH_ALL_INSTANCES = 'FETCH_ALL_INSTANCES'
    export const GOT_INSTANCE = 'GOT_INSTANCE'
    export const REMOVE_ALL_INSTANCES = 'REMOVE_ALL_INSTANCES'
    export const GOT_REMOVE_INSTANCE = 'GOT_REMOVE_INSTANCE'
    export const GOT_UPDATE_INSTANCE = 'GOT_UPDATE_INSTANCE'


// Action for user single rooms
export const FETCHING_USER_SINGLE_ROOMS = 'FETCHING_USER_SINGLE_ROOMS'
export const FETCH_ALL_USER_SINGLE_ROOMS = 'FETCH_ALL_USER_SINGLE_ROOMS'
export const GOT_USER_SINGLE_ROOM = 'GOT_USER_SINGLE_ROOM'
export const REMOVE_ALL_USER_SINGLE_ROOMS = 'REMOVE_ALL_USER_SINGLE_ROOMS'
export const GOT_REMOVE_USER_SINGLE_ROOM = 'GOT_REMOVE_USER_SINGLE_ROOM'
export const GOT_UPDATE_USER_SINGLE_ROOM = 'GOT_UPDATE_USER_SINGLE_ROOM'