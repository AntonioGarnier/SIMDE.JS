import { MACHINE_REGISTER_SIZE } from '../Constants';
export class Register {
    constructor() {
        this.busy = new Array(Register.REGISTRY_NUMBER);
        this.content = new Array(Register.REGISTRY_NUMBER);
        this.bufferIn = new Array(Register.REGISTRY_NUMBER);
    }
    get content() {
        return this._content;
    }
    set content(value) {
        this._content = value;
    }
    get bufferIn() {
        return this._bufferIn;
    }
    set bufferIn(value) {
        this._bufferIn = value;
    }
    get busy() {
        return this._busy;
    }
    set busy(value) {
        this._busy = value;
    }
    setContent(index, value, useBuffer) {
        if (useBuffer) {
            this.bufferIn[index] = value;
            this.busy[index] = true;
        }
        else {
            this.content[index] = value;
        }
    }
    getContent(index) {
        return this.content[index];
    }
    getRegistryNumber() {
        return Register.REGISTRY_NUMBER;
    }
    setBusy(index, value) {
        this.busy[index] = value;
    }
    setAllBusy(value) {
        this.busy.fill(value);
    }
    setAllContent(value) {
        this.content.fill(value);
        this.setAllBusy(false);
    }
    tic() {
        for (let i = 0; i < Register.REGISTRY_NUMBER; i++) {
            if (this.busy[i]) {
                this.busy[i] = false;
                this.content[i] = this.bufferIn[i];
            }
        }
    }
}
Register.REGISTRY_NUMBER = MACHINE_REGISTER_SIZE;
