export class MachineStatus {
    get cycle() {
        return this._cycle;
    }
    set cycle(value) {
        this._cycle = value;
    }
    get executing() {
        return this._executing;
    }
    set executing(value) {
        this._executing = value;
    }
    get breakPoint() {
        return this._breakPoint;
    }
    set breakPoint(value) {
        this._breakPoint = value;
    }
}
