import { Register } from './Register';
import { FunctionalUnit, FUNCTIONALUNITTYPESQUANTITY, FunctionalUnitType } from './FunctionalUnit';
import { Memory } from './Memory';
import { MachineStatus } from './MachineStatus';
import { MACHINE_REGISTER_SIZE } from '../Constants';
export class Machine {
    constructor() {
        this.functionalUnitLatencies = Machine.LAT_DEF.slice();
        this.functionalUnitNumbers = Machine.NUF_DEF.slice();
        this.memoryFailLatency = Machine.MEMORYFAILLATENCYDEF;
        // Init val
        this.status = new MachineStatus();
        this.memory = new Memory();
        this._gpr = new Register();
        this._fpr = new Register();
        this.functionalUnit = new Array(FUNCTIONALUNITTYPESQUANTITY);
        this.functionalUnit.fill(null);
        // this.init(true);
    }
    init(reset) {
        this.pc = 0;
        this.functionalUnit.fill(null);
        for (let i = 0; i < FUNCTIONALUNITTYPESQUANTITY; i++) {
            this.functionalUnit[i] = new Array(this._functionalUnitNumbers[i]);
            for (let j = 0; j < this.functionalUnitNumbers[i]; j++) {
                this.functionalUnit[i][j] = new FunctionalUnit();
                this.functionalUnit[i][j].type = FunctionalUnitType[FunctionalUnitType[i]];
                this.functionalUnit[i][j].latency = this.functionalUnitLatencies[i];
            }
        }
        this.status.cycle = 0;
        this.status.breakPoint = false;
        this.status.executing = false;
        if (reset) {
            this.reset();
        }
    }
    execute() {
        this.status.executing = true;
        this.status.breakPoint = false;
    }
    stop() {
        this.status.executing = false;
    }
    reset() {
        this._gpr.content.fill(0);
        this._fpr.content.fill(0);
        this.memory.setMem(0);
        this.memory.fail.fill(false);
    }
    getTotalFunctionalUnit() {
        let sum = 0;
        for (let i = 0; i < FUNCTIONALUNITTYPESQUANTITY; i++) {
            sum += this.functionalUnitNumbers[i];
        }
        return sum;
    }
    get functionalUnitNumbers() {
        return this._functionalUnitNumbers;
    }
    set functionalUnitNumbers(value) {
        this._functionalUnitNumbers = value;
    }
    get functionalUnitLatencies() {
        return this._functionalUnitLatencies;
    }
    set functionalUnitLatencies(value) {
        this._functionalUnitLatencies = value;
    }
    get memoryFailLatency() {
        return this._memoryFailLatency;
    }
    set memoryFailLatency(value) {
        this._memoryFailLatency = value;
    }
    getGpr(index) {
        return (index >= Machine.NGP || index < 0) ? -1 : this._gpr.getContent(index);
    }
    setGpr(index, value) {
        if (index < Machine.NGP && index >= 0) {
            this._gpr.setContent(index, value, false);
        }
    }
    getFpr(index) {
        return (index >= Machine.NGP || index < 0) ? -1 : this._fpr.getContent(index);
    }
    setFpr(index, value) {
        if (index < Machine.NGP && index >= 0) {
            this._fpr.setContent(index, value, false);
        }
    }
    get functionalUnit() {
        return this._functionalUnit;
    }
    set functionalUnit(value) {
        this._functionalUnit = value;
    }
    get memory() {
        return this._memory;
    }
    set memory(value) {
        this._memory = value;
    }
    get pc() {
        return this._pc;
    }
    set pc(value) {
        this._pc = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get gpr() {
        return this._gpr;
    }
    get fpr() {
        return this._fpr;
    }
    setFunctionalUnitNumber(index, quantity) {
        this.functionalUnitNumbers[index] = quantity;
    }
    setFunctionalUnitLatency(index, latency) {
        this.functionalUnitLatencies[index] = latency;
    }
}
// Const properties
Machine.LAT_MAX = [100, 100, 100, 100, 100, 100];
Machine.LAT_MIN = [1, 1, 1, 1, 1, 1];
Machine.LAT_DEF = [1, 2, 4, 6, 4, 2];
Machine.NUF_MAX = [10, 10, 10, 10, 10, 10];
Machine.NUF_MIN = [1, 1, 1, 1, 1, 1];
Machine.NUF_DEF = [2, 2, 2, 2, 2, 1];
Machine.MEMORYFAILLATENCYDEF = 9;
Machine.MEMORYFAILLATENCYMIN = 0;
Machine.MEMORYFAILLATENCYMAX = 100;
Machine.WORD_SIZE = 32;
Machine.NGP = MACHINE_REGISTER_SIZE;
Machine.NFP = MACHINE_REGISTER_SIZE;
