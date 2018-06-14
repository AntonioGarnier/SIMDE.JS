import { NEXT_PREFETCH_CYCLE, NEXT_DECODER_CYCLE, NEXT_JUMP_TABLE_CYCLE, FUNCTIONAL_UNIT_CYCLE, NEXT_RESERVE_STATION_CYCLE, NEXT_REORDER_BUFFER_MAPPER_CYCLE, NEXT_REORDER_BUFFER_CYCLE, NEXT_REGISTERS_CYCLE, NEXT_MEMORY_CYCLE, NEXT_CYCLE, SUPERESCALAR_LOAD, VIEW_BASIC_BLOCKS, COLOR_CELL } from '../actions';
import { TOGGLE_LOAD_MODAL, TOGGLE_AUTHOR_MODAL, TOGGLE_OPTIONS_MODAL, TOGGLE_SUPER_CONFIG_MODAL, TOGGLE_LOAD_CONTENT_MODAL, TOGGLE_BATCH_MODAL, DISPLAY_BATCH_RESULTS, CLEAR_BATCH_RESULTS } from '../actions/modals';
import { ADD_ROB_FPR_INTERVAL, ADD_ROB_GPR_INTERVAL, REMOVE_ROB_FPR_INTERVAL, REMOVE_ROB_GPR_INTERVAL, ADD_MEMORY_INTERVAL, REMOVE_MEMORY_INTERVAL, ADD_GENERAL_REGISTERS_INTERVAL, REMOVE_GENERAL_REGISTERS_INTERVAL, ADD_FLOATING_REGISTERS_INTERVAL, REMOVE_FLOATING_REGISTERS_INTERVAL } from '../actions/intervals-actions';
import { PUSH_HISTORY, TAKE_HISTORY, RESET_HISTORY } from '../actions/history';
import { colorHistoryInstruction } from './color';
import { removeInterval, addInterval } from './interval';
import {
    USER_LOGIN,
    USER_LOGOUT,
    OPEN_SIDE_BAR,
    CLOSE_SIDE_BAR,
    CHECKING_USER,
    CHECKED_USER,
    CHANGE_PATH,
    FETCH_ALL_ROOMS,
    GOT_ADD_ROOM,
    REMOVE_ALL_ROOMS,
    GOT_REMOVE_ROOM,
    GOT_UPDATE_ROOM,
    FETCH_ALL_GROUPS,
    GOT_ADD_GROUP,
    REMOVE_ALL_GROUPS,
    GOT_REMOVE_GROUP,
    GOT_UPDATE_GROUP,
    FETCH_ALL_PROBLEMS,
    GOT_ADD_PROBLEM,
    REMOVE_ALL_PROBLEMS,
    GOT_REMOVE_PROBLEM,
    GOT_UPDATE_PROBLEM,

    FETCH_ALL_INSTANCES,
    GOT_INSTANCE,
    REMOVE_ALL_INSTANCES,
    GOT_REMOVE_INSTANCE,
    GOT_UPDATE_INSTANCE,
    OPEN_SNACK_BAR,
    CLOSE_SNACK_BAR,
} from '../../../ControlPanel/Constants'
import { initialState } from '../../../Store'


export const MAX_HISTORY_SIZE = 10;
export function SuperescalarReducers(state = initialState, action) {
    let items = {}
    switch (action.type) {
        case NEXT_PREFETCH_CYCLE:
            return (state = Object.assign({}, state, { prefetchUnit: action.value }));
        case NEXT_DECODER_CYCLE:
            return (state = Object.assign({}, state, { decoder: action.value }));
        case NEXT_JUMP_TABLE_CYCLE:
            return (state = Object.assign({}, state, { jumpPrediction: action.value }));
        case FUNCTIONAL_UNIT_CYCLE:
            return (state = Object.assign({}, state, { functionalUnitIntAdd: action.value[0], functionalUnitIntSub: action.value[1], functionalUnitFloAdd: action.value[2], functionalUnitFloSub: action.value[3], functionalUnitMemory: action.value[4], functionalUnitJump: action.value[5], functionalUnitAluMem: action.value[6] }));
        case NEXT_RESERVE_STATION_CYCLE:
            return (state = Object.assign({}, state, { reserveStationIntAdd: action.value[0], reserveStationIntSub: action.value[1], reserveStationFloAdd: action.value[2], reserveStationFloSub: action.value[3], reserveStationMemory: action.value[4], reserveStationJump: action.value[5] }));
        case NEXT_REORDER_BUFFER_MAPPER_CYCLE:
            return (state = Object.assign({}, state, { ROBGpr: Object.assign({}, state.ROBGpr, { data: [...action.value[0]] }), ROBFpr: Object.assign({}, state.ROBFpr, { data: [...action.value[1]] }) }));
        case NEXT_REORDER_BUFFER_CYCLE:
            return (state = Object.assign({}, state, { reorderBuffer: action.value }));
        case NEXT_REGISTERS_CYCLE:
            return (state = Object.assign({}, state, { generalRegisters: Object.assign({}, state.generalRegisters, { data: [...action.value[0]] }), floatingRegisters: Object.assign({}, state.floatingRegisters, { data: [...action.value[1]] }) }));
        case NEXT_MEMORY_CYCLE:
            return (state = Object.assign({}, state, { memory: Object.assign({}, state.memory, { data: action.value }) }));
        case NEXT_CYCLE:
            return (state = Object.assign({}, state, { cycle: action.value }));
        case SUPERESCALAR_LOAD:
            return (state = Object.assign({}, state, { code: action.value }));
        case TOGGLE_LOAD_MODAL:
            return (state = Object.assign({}, state, { isLoadModalOpen: action.value }));
        case TOGGLE_AUTHOR_MODAL:
            return (state = Object.assign({}, state, { isAuthorModalOpen: action.value }));
        case TOGGLE_OPTIONS_MODAL:
            return (state = Object.assign({}, state, { isOptionsModalOpen: action.value }));
        case TOGGLE_SUPER_CONFIG_MODAL:
            return (state = Object.assign({}, state, { isSuperConfigModalOpen: action.value }));
        case TOGGLE_BATCH_MODAL:
            return (state = Object.assign({}, state, { isBatchModalOpen: action.value }));
        case TOGGLE_LOAD_CONTENT_MODAL:
            return (state = Object.assign({}, state, { isLoadContentModalOpen: action.value }));
        case VIEW_BASIC_BLOCKS:
            return (state = Object.assign({}, state, { colorBasicBlocks: action.value }));
        case ADD_ROB_FPR_INTERVAL:
            return addInterval(state, 'ROBFpr', action.value);
        case ADD_ROB_GPR_INTERVAL:
            return addInterval(state, 'ROBGpr', action.value);
        case REMOVE_ROB_FPR_INTERVAL:
            return removeInterval(state, 'ROBFpr', action.value);
        case REMOVE_ROB_GPR_INTERVAL:
            return removeInterval(state, 'ROBGpr', action.value);
        case ADD_MEMORY_INTERVAL:
            return addInterval(state, 'memory', action.value);
        case REMOVE_MEMORY_INTERVAL:
            return removeInterval(state, 'memory', action.value);
        case ADD_GENERAL_REGISTERS_INTERVAL:
            return addInterval(state, 'generalRegisters', action.value);
        case REMOVE_GENERAL_REGISTERS_INTERVAL:
            return removeInterval(state, 'generalRegisters', action.value);
        case ADD_FLOATING_REGISTERS_INTERVAL:
            return addInterval(state, 'floatingRegisters', action.value);
        case REMOVE_FLOATING_REGISTERS_INTERVAL:
            return addInterval(state, 'floatingRegisters', action.value);
        case PUSH_HISTORY:
            return (state = Object.assign({}, state, { history: [
                    ...state.history,
                    {
                        prefetchUnit: state.prefetchUnit,
                        decoder: state.decoder,
                        jumpPrediction: state.jumpPrediction,
                        functionalUnitIntAdd: state.functionalUnitIntAdd,
                        functionalUnitIntSub: state.functionalUnitIntSub,
                        functionalUnitFloAdd: state.functionalUnitFloAdd,
                        functionalUnitFloSub: state.functionalUnitFloSub,
                        functionalUnitMemory: state.functionalUnitMemory,
                        functionalUnitJump: state.functionalUnitJump,
                        functionalUnitAluMem: state.functionalUnitAluMem,
                        reserveStationIntAdd: state.reserveStationIntAdd,
                        reserveStationIntSub: state.reserveStationIntSub,
                        reserveStationFloAdd: state.reserveStationFloAdd,
                        reserveStationFloSub: state.reserveStationFloSub,
                        reserveStationMemory: state.reserveStationMemory,
                        reserveStationJump: state.reserveStationJump,
                        ROBGpr: Object.assign({}, state.ROBGpr),
                        ROBFpr: Object.assign({}, state.ROBFpr),
                        reorderBuffer: state.reorderBuffer,
                        generalRegisters: state.generalRegisters,
                        floatingRegisters: state.floatingRegisters,
                        memory: state.memory,
                        cycle: state.cycle
                    }
                ].slice(-MAX_HISTORY_SIZE) }));
        case COLOR_CELL:
            let newState = Object.assign({}, state);
            newState.history = colorHistoryInstruction(newState.history, action.value[0], action.value[1]);
            return newState;
        case TAKE_HISTORY:
            return (state = Object.assign({}, state, state.history[state.history.length - 1 - action.value]));
        case RESET_HISTORY:
            return (state = Object.assign({}, state, { history: [] }));
        case DISPLAY_BATCH_RESULTS:
            return (state = Object.assign({}, state, { batchResults: action.value, isBatchResultsModalOpen: true }));
        case CLEAR_BATCH_RESULTS:
            return (state = Object.assign({}, state, { batchResults: {}, isBatchResultsModalOpen: false }));
        case USER_LOGIN:
            return { ...state, controlPanel: { ...state.controlPanel, user: action.payload} }
        case USER_LOGOUT:
            return initialState
        case OPEN_SIDE_BAR:
            return { ...state, controlPanel: { ...state.controlPanel, toggleSideBar: action.payload }}
        case CLOSE_SIDE_BAR:
            return { ...state, controlPanel: { ...state.controlPanel, toggleSideBar: action.payload }}
        case CHECKING_USER:
            return { ...state, controlPanel: { ...state.controlPanel, isLoading: true }}
        case CHECKED_USER:
            return { ...state, controlPanel: { ...state.controlPanel, isLoading: false }}
        case CHANGE_PATH:
            return { ...state, controlPanel: { ...state.controlPanel, actualPath: action.payload.path}}
        case FETCH_ALL_ROOMS:
            return { ...state, controlPanel: { ...state.controlPanel, singleRooms: action.payload.singleRooms, groupRooms: action.payload.groupRooms, roomsOrdered: action.payload.roomsOrdered}}
        case GOT_UPDATE_ROOM:
        case GOT_ADD_ROOM:
            let roomsOrdered = state.controlPanel.roomsOrdered.slice()
            if (roomsOrdered.indexOf(action.payload.id) === -1)
                roomsOrdered.unshift(action.payload.id)
            return {
                ...state,
                controlPanel: {
                    ...state.controlPanel,
                    [`${action.payload.type}Rooms`]: {
                        ...state.controlPanel[`${action.payload.type}Rooms`],
                        [action.payload.id]: {
                                name: action.payload.name,
                                members: action.payload.members,
                                type: action.payload.type,
                                visibility: action.payload.visibility,
                                problems: action.payload.problems,
                                createdAt: action.payload.createdAt,
                            }
                        },
                        roomsOrdered,
                    }
                }
        case REMOVE_ALL_ROOMS:
            return { ...state, controlPanel: { ...state.controlPanel, singleRooms: {}, groupRooms: {}, roomsOrdered: []}}
        case GOT_REMOVE_ROOM:
            items = {}
            Object.keys(state.controlPanel[`${action.payload.type}Rooms`]).forEach((element) => {
                if (element !== action.payload.id) {
                    items[element] = state.controlPanel[`${action.payload.type}Rooms`][element]
                }
            })
            return { ...state, controlPanel: { ...state.controlPanel, [`${action.payload.type}Rooms`]: items, roomsOrdered: state.controlPanel.roomsOrdered.filter(roomId => roomId !== action.payload.id)}}
        case FETCH_ALL_PROBLEMS:
            return { ...state, controlPanel: { ...state.controlPanel, problems: action.payload.problems, problemsOrdered: action.payload.problemsOrdered}}            
        case GOT_UPDATE_PROBLEM:
        case GOT_ADD_PROBLEM:
            let problemsOrdered = state.controlPanel.problemsOrdered.slice()
                if (problemsOrdered.indexOf(action.payload.id) === -1)
                    problemsOrdered.unshift(action.payload.id)
            return {
                ...state,
                controlPanel: {
                    ...state.controlPanel,
                    problems: {
                        ...state.controlPanel.problems,
                        [action.payload.id]: {
                            name: action.payload.name,
                            definition: action.payload.definition,
                            instances: action.payload.instances,
                            createdAt: action.payload.createdAt,
                        }
                    },
                    problemsOrdered,
                }
            }
        case REMOVE_ALL_PROBLEMS:
            return { ...state, controlPanel: { ...state.controlPanel, problems: {}, problemsOrdered: []}}
        case GOT_REMOVE_PROBLEM:
            items = {}
            Object.keys(state.controlPanel.problems).forEach((element) => {
                if (element !== action.payload.id) {
                    items[element] = state.controlPanel.problems[element]
                }
            })
            return { ...state, controlPanel: { ...state.controlPanel, problems: items, problemsOrdered: state.controlPanel.problemsOrdered.filter(problemId => problemId !== action.payload.id)}}
        case FETCH_ALL_GROUPS:
            return { ...state, controlPanel: { ...state.controlPanel, groups: action.payload.groups, groupsOrdered: action.payload.groupsOrdered}}
        case GOT_UPDATE_GROUP:
        case GOT_ADD_GROUP:
            let groupsOrdered = state.controlPanel.groupsOrdered.slice()
                if (groupsOrdered.indexOf(action.payload.id) === -1)
                    groupsOrdered.unshift(action.payload.id)    
            return {
                ...state,
                controlPanel: {
                    ...state.controlPanel,
                    groups: {
                        ...state.controlPanel.groups,
                        [action.payload.id]: {
                            name: action.payload.name,
                            members: action.payload.members,
                            leader: action.payload.leader,
                            createdAt: action.payload.createdAt,
                        }
                    },
                    groupsOrdered,
                }
            }
        case REMOVE_ALL_GROUPS:
            return { ...state, controlPanel: { ...state.controlPanel, groups: {}, groupsOrdered: []}}
        case GOT_REMOVE_GROUP:
            items = {}
            Object.keys(state.controlPanel.groups).forEach((element) => {
                if (element !== action.payload.id) {
                    items[element] = state.controlPanel.groups[element]
                }
            })
            return { ...state, controlPanel: { ...state.controlPanel, groups: items, groupsOrdered: state.controlPanel.groupsOrdered.filter(groupId => groupId !== action.payload.id)}}
        case FETCH_ALL_INSTANCES:
            return { ...state, controlPanel: { ...state.controlPanel, instances: action.payload, instancesOrdered: action.payload.instancesOrdered}}
        case GOT_UPDATE_INSTANCE:
        case GOT_INSTANCE:
            let instancesOrdered = state.controlPanel.instancesOrdered.slice()
                if (instancesOrdered.indexOf(action.payload.id) === -1)
                    instancesOrdered.unshift(action.payload.id)   
            return {
                ...state,
                controlPanel: {
                    ...state.controlPanel,
                    instances: {
                        ...state.controlPanel.instances,
                        [action.payload.id]: {
                            name: action.payload.name,
                            initialMem: action.payload.initialMem,
                            finalMem: action.payload.finalMem,
                            createdAt: action.payload.createdAt,
                        }
                    },
                    instancesOrdered,
                }
            }
        case REMOVE_ALL_INSTANCES:
            return { ...state, controlPanel: { ...state.controlPanel, instances: {}, instancesOrdered: []}}
        case GOT_REMOVE_INSTANCE:
            items = {}
            Object.keys(state.controlPanel.instance).forEach((element) => {
                if (element !== action.payload.id) {
                    items[element] = state.controlPanel.instance[element]
                }
            })
            return { ...state, controlPanel: { ...state.controlPanel, instances: items, instancesOrdered: state.controlPanel.instancesOrdered.filter(instanceId => instanceId !== action.payload.id)}}
        case OPEN_SNACK_BAR:
            return { ...state, controlPanel: { 
                ...state.controlPanel, snackBarData: {
                     ...state.controlPanel.snackBarData, open: true, message: action.payload.message, type: action.payload.type}}}
        case CLOSE_SNACK_BAR:
            return { ...state, controlPanel: { 
                ...state.controlPanel, snackBarData: {
                     ...state.controlPanel.snackBarData, open: false}}}
        default:
            return state
    }
}
