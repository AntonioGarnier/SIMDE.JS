import { MEMORY_SIZE, MACHINE_REGISTER_SIZE } from '../core/Constants';
export class ContentIntegration {
    constructor(input) {
        this.input = input;
        this.FPRContent = {};
        this.GPRContent = {};
        this.MEMContent = {};
        this.currentContent = '';
        input = this.normalizeBreakLines(input);
        this.proccessContent(input.split('\n'));
    }
    normalizeBreakLines(input) {
        return input.replace(/(?:\r\n|\r)/g, '\n');
    }
    proccessContent(lines) {
        this.currentContent = '';
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].match(/^#\w+/)) {
                this.parseContent(lines[i]);
            }
            else if (lines[i].match(/^\[\d+\]/)) {
                this.parseLine(lines[i]);
            } else throw new Error('Unexpected content type');
        }
    }
    parseContent(value) {
        switch (value) {
            case '#GPR':
                this.currentContent = 'GPRContent';
                break;
            case '#FPR':
                this.currentContent = 'FPRContent';
                break;
            case '#MEM':
                this.currentContent = 'MEMContent';
                break;
            default:
                throw new Error('Unexpected content type');
        }
    }
    parseLine(line) {
        if (this.currentContent === '') {
            throw new Error('The data has no content (MEM, REG) associated');
        }
        const startPosition = +line.match(/\[(\d+)\]/)[1];
        let values = line.split(' ');
        values.shift();
        this.validateInnerBounds(this.currentContent, startPosition, values.length);
        values = values.map(v => +v);
        for (let i = 0; i < values.length; i++) {
            this[this.currentContent][startPosition + i] = values[i];
        }
    }
    validateInnerBounds(currentContent, startPosition, valuesLength) {
        if ((currentContent === 'MEMContent' && startPosition + valuesLength >= MEMORY_SIZE) ||
            (currentContent !== 'MEMContent' && startPosition + valuesLength >= MACHINE_REGISTER_SIZE)) {
            throw new Error('Setted data out of bounds');
        }
    }
}
