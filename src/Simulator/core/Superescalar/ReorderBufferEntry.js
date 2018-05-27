export class ReorderBufferEntry {
    get instruction() {
        return this._instruction;
    }
    set instruction(value) {
        this._instruction = value;
    }
    get ready() {
        return this._ready;
    }
    set ready(value) {
        this._ready = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get destinyRegister() {
        return this._destinyRegister;
    }
    set destinyRegister(value) {
        this._destinyRegister = value;
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    get superStage() {
        return this._superStage;
    }
    set superStage(value) {
        this._superStage = value;
    }
}
