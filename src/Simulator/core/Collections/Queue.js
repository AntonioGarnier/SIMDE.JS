export class Queue {
    constructor(size) {
        if (size) {
            this.size = size + 1;
            this.elements = new Array(size + 1);
            this.elements.fill(null);
        }
        else {
            this.size = 0;
            this.elements = null;
        }
        this.last = 0;
        this.first = 0;
    }
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
    }
    get last() {
        return this._last;
    }
    set last(value) {
        this._last = value;
    }
    get first() {
        return this._first;
    }
    set first(value) {
        this._first = value;
    }
    top() {
        return this._elements[this.first];
    }
    isEmpty() {
        return this.first === this.last;
    }
    isFull() {
        return ((this.last + 1) % this.size === this.first);
    }
    getCount() {
        return (this.last >= this.first) ? (this.last - this.first) : (this.last + this.size - this.first);
    }
    end() {
        return this.last;
    }
    nextIterator(i) {
        return (i + 1) % this.size;
    }
    init(n) {
        this.size = n + 1;
        this._elements = new Array(n + 1);
        this._elements.fill(null);
        this.first = 0;
        this.last = 0;
    }
    add(value) {
        if (this.isFull()) {
            return -1;
        }
        let oldLast = this.last;
        this._elements[this.last] = value;
        this.last = (this.last + 1) % this.size;
        return oldLast;
    }
    remove(position) {
        if (position != null) {
            if (position === this.first) {
                return this.removeFirst();
            }
            if ((position >= this.last) || (position < this.first)) {
                return null;
            }
            let element = this._elements[position];
            this.last = (this.last > position) ? this.last : this.last + this.size;
            for (let i = position; i < this.last; i++) {
                this._elements[i % this.size] = this._elements[(i + 1) % this.size];
            }
            this.last = (this.last - 1) % this.size;
            return element;
        }
        else {
            return this.removeFirst();
        }
    }
    get elements() {
        return this._elements;
    }
    set elements(elements) {
        this._elements = elements;
    }
    getElement(index) {
        return (index >= this.size) ? null : this.elements[index];
    }
    removeFirst() {
        if (this.isEmpty()) {
            return null;
        }
        let element = this._elements[this.first];
        this._elements[this.first] = null;
        this.first = (this.first + 1) % this.size;
        return element;
    }
}
