import { enableBatching } from '../Simulator/interface/reducers/batching';
import { applyMiddleware, createStore, compose } from 'redux'
import { SuperescalarReducers } from '../Simulator/interface/reducers';
import { generateRangeArray } from '../Simulator/interface/utils/interval';
import { MACHINE_REGISTER_SIZE, MEMORY_SIZE } from '../Simulator/core/Constants';
import { saveState, loadState } from '../LocalStorage'
import userLogin from './middleware'

export const initialState = {
    prefetchUnit: [],
    decoder: [],
    jumpPrediction: [],
    history: [],
    functionalUnitIntAdd: {},
    functionalUnitIntSub: {},
    functionalUnitFloAdd: {},
    functionalUnitFloSub: {},
    functionalUnitMemory: {},
    functionalUnitJump: {},
    functionalUnitAluMem: {},
    reserveStationIntAdd: [],
    reserveStationIntSub: [],
    reserveStationFloAdd: [],
    reserveStationFloSub: [],
    reserveStationMemory: [],
    reserveStationJump: [],
    ROBGpr: {
        data: [],
        visibleRangeValues: generateRangeArray(MACHINE_REGISTER_SIZE)
    },
    ROBFpr: {
        data: [],
        visibleRangeValues: generateRangeArray(MACHINE_REGISTER_SIZE)
    },
    reorderBuffer: [],
    generalRegisters: {
        data: [],
        visibleRangeValues: generateRangeArray(MACHINE_REGISTER_SIZE)
    },
    floatingRegisters: {
        data: [],
        visibleRangeValues: generateRangeArray(MACHINE_REGISTER_SIZE)
    },
    memory: {
        data: [],
        visibleRangeValues: generateRangeArray(MEMORY_SIZE)
    },
    cycle: 0,
    code: [],
    colorBasicBlocks: false,
    isLoadModalOpen: false,
    isAuthorModalOpen: false,
    isOptionsModalOpen: false,
    isSuperConfigModalOpen: false,
    isLoadContentModalOpen: false,
    isBatchModalOpen: false,
    isBatchResultsModalOpen: false,
    batchResults: {},
    controlPanel: {
        user: null,
        toggleSideBar: false,
        isLoading: true,
    }
};

const loadFromLocalStorage = () => (
    loadState()
        ? { ...initialState, controlPanel: loadState() }
        : initialState
)

export const store = createStore(
    enableBatching(SuperescalarReducers),
    loadFromLocalStorage(),
    compose(
        applyMiddleware(userLogin),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);

store.subscribe(() => {
    saveState(store.getState().controlPanel)
})
