import { OpcodesNames } from './Opcodes';
export class Instruction {
    constructor() {
        this._breakPoint = false;
        this._color = 'white';
        this._operands = new Array(3);
        this._operandsString = new Array(3);
    }
    copy(other) {
        this._id = other.id;
        this._basicBlock = other.basicBlock;
        this._opcode = other.opcode;
        this._operands = other.operands.slice();
        this._operandsString = other.operandsString.slice();
        this._breakPoint = other.breakPoint;
        this._color = other.color;
    }
    toString() {
        let aux = '';
        if (this._operandsString[1]) {
            aux += ' ' + this._operandsString[1];
        }
        if (this._operandsString[2]) {
            aux += ' ' + this._operandsString[2];
        }
        return `${OpcodesNames[this._opcode]} ${this._operandsString[0]} ${aux}`;
    }
    setOperand(index, value, valueString) {
        this._operands[index] = value;
        this.operandsString[index] = valueString;
    }
    getOperand(index) {
        return this._operands[index];
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get basicBlock() {
        return this._basicBlock;
    }
    set basicBlock(value) {
        this._basicBlock = value;
    }
    set opcode(value) {
        this._opcode = value;
    }
    set breakPoint(value) {
        this._breakPoint = value;
    }
    set color(value) {
        this._color = value;
    }
    get opcode() {
        return this._opcode;
    }
    get breakPoint() {
        return this._breakPoint;
    }
    get color() {
        return this._color;
    }
    get operands() {
        return this._operands;
    }
    set operands(value) {
        this._operands = value;
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    get operandsString() {
        return this._operandsString;
    }
    set operandsString(value) {
        this._operandsString = value;
    }
}
