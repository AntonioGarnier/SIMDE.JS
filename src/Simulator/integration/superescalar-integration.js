import { Superescalar } from '../core/Superescalar/Superescalar';
import { ExecutionStatus } from '../main-consts';
import { store } from '../../Store';
import { nextPrefetchCycle, nextDecoderCycle, nextJumpTableCycle, nextFunctionalUnitCycle, nextReserveStationCycle, nextReorderBufferCycle, nextRegistersCycle, nextMemoryCycle, nextReorderBufferMapperCycle, nextCycle, superescalarLoad, batchActions, colorCell } from '../interface/actions';
import { pushHistory, takeHistory, resetHistory } from '../interface/actions/history';
import { MAX_HISTORY_SIZE } from '../interface/reducers';
import { t } from 'i18next';
import { Code } from '../core/Common/Code';
import { SuperescalarStatus } from '../core/Superescalar/SuperescalarEnums';
import { displayBatchResults } from '../interface/actions/modals';
import { MachineIntegration } from './machine-integration';
import { ContentIntegration } from './content-integration';
import {
    OPEN_SNACK_BAR,
} from '../../ControlPanel/Constants'

export class SuperescalarIntegration extends MachineIntegration {
    constructor() {
        super(...arguments);
        // Global objects for binding React to the View
        this.superescalar = new Superescalar();
        this.codeLoaded = false;
        this.interval = null;
        this.backStep = 0;
        this.stopCondition = ExecutionStatus.EXECUTABLE;
        this.finishedExecution = false;
        this.executing = false;
        this.replications = 1;
        this.cacheFailPercentage = 0;
        this.cacheFailLatency = 0;
        /*
        * This call all the components to update the state
        * if there is a step param, the components will use
        * their history to set the appropiate content
        */
        this.dispatchAllSuperescalarActions = (step) => {
            // Code should only be setted on the first iteration
            store.dispatch(batchActions(nextJumpTableCycle(this.superescalar.jumpPrediction),
                nextPrefetchCycle(this.superescalar.prefetchUnit),
                nextDecoderCycle(this.superescalar.decoder),
                nextFunctionalUnitCycle([...this.superescalar.functionalUnit, this.superescalar.aluMem]),
                nextReserveStationCycle([{
                    data: this.superescalar.reserveStationEntry[0],
                    size: this.superescalar.getReserveStationSize(0)
                },
                {
                    data: this.superescalar.reserveStationEntry[1],
                    size: this.superescalar.getReserveStationSize(1)
                },
                {
                    data: this.superescalar.reserveStationEntry[2],
                    size: this.superescalar.getReserveStationSize(2)
                },
                {
                    data: this.superescalar.reserveStationEntry[3],
                    size: this.superescalar.getReserveStationSize(3)
                },
                {
                    data: this.superescalar.reserveStationEntry[4],
                    size: this.superescalar.getReserveStationSize(4)
                },
                {
                    data: this.superescalar.reserveStationEntry[5],
                    size: this.superescalar.getReserveStationSize(5)
                }]),
                nextReorderBufferMapperCycle([this.superescalar.ROBGpr, this.superescalar.ROBFpr]),
                nextReorderBufferCycle(this.superescalar.reorderBuffer.elements),
                nextRegistersCycle([this.superescalar.gpr.content, this.superescalar.fpr.content]),
                nextMemoryCycle(this.superescalar.memory.data),
                nextCycle(this.superescalar.status.cycle),
                pushHistory()));
        };
        this.superExe = (reset = true) => {
            this.superescalar.init(reset);
        };
        this.stepForward = () => {
            if (!this.superescalar.code) {
                return;
            }
            if (this.backStep > 0) {
                this.backStep--;
                store.dispatch(takeHistory(this.backStep));
            }
            else {
                if (this.finishedExecution) {
                    this.finishedExecution = false;
                    let code = Object.assign(new Code(), this.superescalar.code);
                    this.superExe();
                    this.superescalar.code = code;
                    // Load memory content
                    if (this.contentIntegration) {
                        this.setFpr(this.contentIntegration.FPRContent);
                        this.setGpr(this.contentIntegration.GPRContent);
                        this.setMemory(this.contentIntegration.MEMContent);
                    }
                }
                let machineStatus = this.superescalar.tic();
                this.dispatchAllSuperescalarActions();
                return machineStatus;
            }
        };
        this.loadCode = (code) => {
            this.superescalar.code = code;
            this.resetMachine();
            // There is no need to update the code with the rest,
            // it should remain the same during all the program execution
            store.dispatch(superescalarLoad(code.instructions));
        };
        this.play = () => {
            if (!this.superescalar.code) {
                return;
            }
            this.stopCondition = ExecutionStatus.EXECUTABLE;
            this.backStep = 0;
            this.executing = true;
            let speed = this.calculateSpeed();
            // Check if the execution has finished
            if (this.finishedExecution) {
                this.finishedExecution = false;
                let code = Object.assign(new Code(), this.superescalar.code);
                this.superExe();
                this.superescalar.code = code;
                // Load memory content
                if (this.contentIntegration) {
                    this.setFpr(this.contentIntegration.FPRContent);
                    this.setGpr(this.contentIntegration.GPRContent);
                    this.setMemory(this.contentIntegration.MEMContent);
                }
            }
            if (speed) {
                this.executionLoop(speed);
            }
            else {
                // tslint:disable-next-line:no-empty
                while (this.superescalar.tic() !== SuperescalarStatus.SUPER_ENDEXE) { }
                this.dispatchAllSuperescalarActions();
                this.finishedExecution = true;
                alert(t('execution.finished'));
            }
        };
        this.makeBatchExecution = () => {
            if (!this.superescalar.code) {
                return;
            }
            const results = [];
            this.clearBatchStateEffects();
            for (let i = 0; i < this.replications; i++) {
                let code = Object.assign(new Code(), this.superescalar.code);
                this.superExe();
                this.superescalar.code = code;
                this.superescalar.memory.failProbability = this.cacheFailPercentage;
                this.superescalar.memoryFailLatency = this.cacheFailLatency;
                // Load memory content
                if (this.contentIntegration) {
                    this.setFpr(this.contentIntegration.FPRContent);
                    this.setGpr(this.contentIntegration.GPRContent);
                    this.setMemory(this.contentIntegration.MEMContent);
                }
                
                // tslint:disable-next-line:no-empty
                while (this.superescalar.tic() !== SuperescalarStatus.SUPER_ENDEXE) { }
                results.push(this.superescalar.status.cycle);
            }
            
            const statistics = this.calculateBatchStatistics(results);
            store.dispatch(displayBatchResults(statistics));
        };
        this.pause = () => {
            this.stopCondition = ExecutionStatus.PAUSE;
            this.executing = false;
        };
        this.stop = () => {
            if (!this.superescalar.code) {
                return;
            }
            // In normal execution I have to avoid the asynchrnous way of
            // js entering in the interval, the only way I have is to using a semaphore
            this.stopCondition = ExecutionStatus.STOP;
            if (!this.executing) {
                this.executing = false;
                this.resetMachine();
            }
        };
        this.colorCell = (instructionId, color) => {
            this.superescalar.reorderBuffer.elements.filter(e => e != null && e.instruction.id === +instructionId)[0].instruction.color = color.hex;
            this.superescalar.reserveStationEntry = this.superescalar.reserveStationEntry.map(ree => ree.map(reserveStationEntry => {
                if (reserveStationEntry.instruction.id === +instructionId) {
                    reserveStationEntry.instruction.color = color.hex;
                }
                return reserveStationEntry;
            }));
            this.superescalar.functionalUnit = this.superescalar.functionalUnit.map(functionalUnit => functionalUnit.map(fu => {
                fu.flow = fu.flow.map(instruction => {
                    if (instruction && instruction.id === +instructionId) {
                        instruction.color = color.hex;
                    }
                    return instruction;
                });
                return fu;
            }));
            store.dispatch(batchActions(nextReorderBufferCycle(this.superescalar.reorderBuffer.elements), nextFunctionalUnitCycle([...this.superescalar.functionalUnit, this.superescalar.aluMem]), nextReserveStationCycle([{
                    data: this.superescalar.reserveStationEntry[0],
                    size: this.superescalar.getReserveStationSize(0)
                },
                {
                    data: this.superescalar.reserveStationEntry[1],
                    size: this.superescalar.getReserveStationSize(1)
                },
                {
                    data: this.superescalar.reserveStationEntry[2],
                    size: this.superescalar.getReserveStationSize(2)
                },
                {
                    data: this.superescalar.reserveStationEntry[3],
                    size: this.superescalar.getReserveStationSize(3)
                },
                {
                    data: this.superescalar.reserveStationEntry[4],
                    size: this.superescalar.getReserveStationSize(4)
                },
                {
                    data: this.superescalar.reserveStationEntry[5],
                    size: this.superescalar.getReserveStationSize(5)
                }]), colorCell(instructionId, color.hex)));
        };
        this.stepBack = () => {
            // There is no time travelling for batch mode and initial mode
            if (this.superescalar.status.cycle > 0 && this.backStep < MAX_HISTORY_SIZE &&
                (this.superescalar.status.cycle - this.backStep > 0)) {
                this.backStep++;
                store.dispatch(takeHistory(this.backStep));
            }
        };
        this.setMemory = (data) => {
            if (this.superescalar.status.cycle > 0) {
                return;
            }
            Object.keys(data).forEach(key => {
                this.superescalar.memory.setDatum(+key, data[key]);
            });
        };
        this.setFpr = (data) => {
            if (this.superescalar.status.cycle > 0) {
                return;
            }
            Object.keys(data).forEach(key => {
                this.superescalar.fpr.setContent(+key, data[key], false);
            });
        };
        this.setGpr = (data) => {
            if (this.superescalar.status.cycle > 0) {
                return;
            }
            Object.keys(data).forEach(key => {
                this.superescalar.gpr.setContent(+key, data[key], false);
            });
        };
        this.executionLoop = (speed) => {
            if (!this.stopCondition) {
                setTimeout(() => {
                    let machineStatus = this.stepForward();
                    if (!(machineStatus === SuperescalarStatus.SUPER_BREAKPOINT || machineStatus === SuperescalarStatus.SUPER_ENDEXE)) {
                        this.executionLoop(speed);
                    }
                    else {
                        if (machineStatus === SuperescalarStatus.SUPER_BREAKPOINT) {
                            alert(t('execution.stopped'));
                        }
                        else if (machineStatus === SuperescalarStatus.SUPER_ENDEXE) {
                            this.finishedExecution = true;
                            alert(t('execution.finished'));
                        }
                    }
                }, speed);
            }
            else if (this.stopCondition === ExecutionStatus.STOP) {
                this.resetMachine();
            }
        };
        this.saveSuperConfig = (superConfig) => {
            const superConfigKeys = Object.keys(superConfig);
            for (let i = 0; i < (superConfigKeys.length - 2); i++) {
                if (i % 2 === 0) {
                    this.superescalar.setFunctionalUnitNumber(i, +superConfig[superConfigKeys[i]]);
                }
                else {
                    this.superescalar.setFunctionalUnitLatency(i, +superConfig[superConfigKeys[i]]);
                }
            }
            this.superescalar.issue = +superConfig.issueGrade;
        };
        this.setBatchMode = (replications, cacheFailLatency, cacheFailPercentage) => {
            this.replications = replications;
            this.cacheFailLatency = cacheFailLatency;
            this.cacheFailPercentage = cacheFailPercentage;
        };
    }
    resetMachine() {
        let code = Object.assign(new Code(), this.superescalar.code);
        this.superExe(true);
        this.superescalar.code = code;
        // Reload memory content
        if (this.contentIntegration) {
            this.setFpr(this.contentIntegration.FPRContent);
            this.setGpr(this.contentIntegration.GPRContent);
            this.setMemory(this.contentIntegration.MEMContent);
        }
        this.dispatchAllSuperescalarActions();
        store.dispatch(resetHistory());
    }
    calculateBatchStatistics(results) {
        const average = (results.reduce((a, b) => a + b) / results.length);
        return {
            replications: this.replications,
            average: average.toFixed(2),
            standardDeviation: this.calculateStandardDeviation(average, results).toFixed(2),
            worst: Math.max(...results),
            best: Math.min(...results)
        };
    }
    clearBatchStateEffects() {
        // Post launch machine clean
        this.superescalar.memory.failProbability = 0;
        this.superescalar.memoryFailLatency = 0;
        this.resetMachine();
    }
    loadInstance(instanceDataInitial) {
        try {
            const contentIntegration = new ContentIntegration(instanceDataInitial);
            this.contentIntegration = contentIntegration;
        }
        catch (error) {
            store.dispatch({
                type: OPEN_SNACK_BAR,
                payload: {
                    message: `ERROR(loadInstance): ${error.message}`,
                    type: 'error',
                }
            })
        }
    }
    loadCodeFromPanel(codeData) {
        try {
            let code = new Code();
            code.load(codeData);
            this.loadCode(code);
        }
        catch (error) {
            store.dispatch({
                type: OPEN_SNACK_BAR,
                payload: {
                    message: `ERROR(loadCodeFromPanel): ${error.message}`,
                    type: 'error',
                }
            })
        }
    }
    checkResult(instanceDataFinal) {
        try {
            const contentIntegration = new ContentIntegration(instanceDataFinal);
            return Object.keys(contentIntegration.MEMContent).every((memPosition) => (
                contentIntegration.MEMContent[memPosition] === this.superescalar.memory.data[memPosition]
            ))
        }
        catch (error) {
            store.dispatch({
                type: OPEN_SNACK_BAR,
                payload: {
                    message: `ERROR(checkResult): ${error.message}`,
                    type: 'error',
                }
            })
        }
    }
}
export default new SuperescalarIntegration();
