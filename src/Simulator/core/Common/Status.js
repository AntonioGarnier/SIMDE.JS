export class Status {
    get instructionNumber() {
        return this._instructionNumber;
    }
    set instructionNumber(value) {
        this._instructionNumber = value;
    }
    get lastInstruction() {
        return this._lastInstruction;
    }
    set lastInstruction(value) {
        this._lastInstruction = value;
    }
    get stall() {
        return this._stall;
    }
    set stall(value) {
        this._stall = value;
    }
}
