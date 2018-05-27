import { Status } from './Status';
export var FunctionalUnitType;
(function (FunctionalUnitType) {
    FunctionalUnitType[FunctionalUnitType["INTEGERSUM"] = 0] = "INTEGERSUM";
    FunctionalUnitType[FunctionalUnitType["INTEGERMULTIPLY"] = 1] = "INTEGERMULTIPLY";
    FunctionalUnitType[FunctionalUnitType["FLOATINGSUM"] = 2] = "FLOATINGSUM";
    FunctionalUnitType[FunctionalUnitType["FLOATINGMULTIPLY"] = 3] = "FLOATINGMULTIPLY";
    FunctionalUnitType[FunctionalUnitType["MEMORY"] = 4] = "MEMORY";
    FunctionalUnitType[FunctionalUnitType["JUMP"] = 5] = "JUMP";
})(FunctionalUnitType || (FunctionalUnitType = {}));
export const FUNCTIONALUNITTYPESQUANTITY = FunctionalUnitType.JUMP - FunctionalUnitType.INTEGERSUM + 1;
export class FunctionalUnit {
    constructor() {
        this._flow = null;
        this._status = new Status();
        this._status.lastInstruction = 0;
        this._status.stall = 0;
        this._status.instructionNumber = 0;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get latency() {
        return this._latency;
    }
    set latency(value) {
        this._latency = value;
        this._status.lastInstruction = value - 1;
        this._status.instructionNumber = 0;
        this._flow = new Array(value);
        this._flow.fill(null);
    }
    get flow() {
        return this._flow;
    }
    set flow(value) {
        this._flow = value;
    }
    tic() {
        if (this._status.stall === 0) {
            if (this._flow[this._status.lastInstruction] != null) {
                this._flow[this._status.lastInstruction] = null;
                this._status.instructionNumber--;
            }
            this._status.lastInstruction = (this._latency + this._status.lastInstruction - 1) % this._latency;
        }
        else {
            this._status.stall--;
        }
    }
    fillFlow(instruction) {
        this._flow[(this._status.lastInstruction + 1) % this._latency] = instruction;
        if (instruction != null) {
            this._status.instructionNumber++;
        }
        return (this._status.lastInstruction + 1) % this._latency;
    }
    clean() {
        this._flow = new Array(this._latency);
        this._flow.fill(null);
        this._status.lastInstruction = this._latency - 1;
        this._status.stall = 0;
        this._status.instructionNumber = 0;
    }
    isFree() {
        return (this.flow[(this.status.lastInstruction + 1) % this.latency] == null);
    }
    getTopInstruction() {
        return this._flow[this._status.lastInstruction];
    }
    getInstructionByIndex(index) {
        return this._flow[(this._status.lastInstruction + index + 1) % this._latency];
    }
    getLast() {
        return this._status.lastInstruction;
    }
}
