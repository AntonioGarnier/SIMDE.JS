import { randomNumber } from '../Utils/Random';
import { MEMORY_SIZE } from '../Constants';
export class Memory {
    constructor() {
        this.data = new Array(Memory.MEMORY_NUMBER);
        this.fail = new Array(Memory.MEMORY_NUMBER);
        this.failProbability = 0;
    }
    getDatum(address) {
        if (address < 0) {
            address = 0;
        }
        let valueToReturn = {
            datum: this.data[address],
            got: true
        };
        let failValue = randomNumber(100);
        // There will be a fail only if there wasn't a previous fail on the same position
        if ((failValue < this.failProbability) && !this.fail[address]) {
            this.fail[address] = true;
            valueToReturn.got = false;
            return valueToReturn;
        }
        this.fail[address] = true;
        return valueToReturn;
    }
    setDatum(address, value) {
        if (address < 0) {
            address = 0;
        }
        this.data[address] = value;
    }
    setMem(datum) {
        this.data.fill(datum);
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    get fail() {
        return this._fail;
    }
    set fail(value) {
        this._fail = value;
    }
    get failProbability() {
        return this._failProbability;
    }
    set failProbability(value) {
        this._failProbability = value;
    }
}
Memory.MEMORY_NUMBER = MEMORY_SIZE;
