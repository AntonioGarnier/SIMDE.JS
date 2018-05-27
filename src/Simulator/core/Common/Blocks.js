export class BasicBlock {
    constructor(_id, _lineNumber, _next, _successor) {
        this._id = _id;
        this._lineNumber = _lineNumber;
        this._next = _next;
        this._successor = _successor;
    }
    get lineNumber() {
        return this._lineNumber;
    }
    set lineNumber(value) {
        this._lineNumber = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get next() {
        return this._next;
    }
    set next(value) {
        this._next = value;
    }
    get successor() {
        return this._successor;
    }
    set successor(value) {
        this._successor = value;
    }
}
export class SuccessorBlock {
    get block() {
        return this._block;
    }
    set block(value) {
        this._block = value;
    }
    get next() {
        return this._next;
    }
    set next(value) {
        this._next = value;
    }
}
