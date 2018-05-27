import { Instruction } from './Instruction';
import { BasicBlock, SuccessorBlock } from './Blocks';
import { LEX, Lexer } from './Lexer';
import { Label } from './Label';
import { Opcodes } from './Opcodes';
import { Parser } from './Parser';
export class Code {
    constructor() {
        this._labels = [];
        this._numberOfBlocks = 0;
        this._basicBlocks = null;
        this._instructions = [];
        this._lexer = new Lexer();
        this._parser = new Parser(this._lexer, this.checkLexema.bind(this));
    }
    checkLabel(str, actual) {
        let index = -1;
        let basicBlock;
        let nextSucessor = new SuccessorBlock();
        actual.successor = nextSucessor;
        actual.successor.next = null;
        // TODO Why + ':'?
        str += ':';
        for (let i = 0; i < this._labels.length; i++) {
            if (this._labels[i].name === str) {
                index = i;
                i = this._labels.length + 1;
            }
        }
        if (index !== -1) {
            basicBlock = this.labels[index].blocks;
        }
        else {
            basicBlock = new BasicBlock(null, -1, null, null);
            // Add the label
            let label = new Label();
            label.name = str;
            label.blocks = basicBlock;
            this._labels.push(label);
            index = this._labels.length - 1;
        }
        actual.successor.block = basicBlock;
        return index;
    }
    addLabel(str, lineNumber, actual) {
        let index = -1;
        let basicBlock;
        for (let i = 0; i < this._labels.length; i++) {
            if (this._labels[i].name === str) {
                index = i;
                // Break loop
                i = this._labels.length;
            }
        }
        if (index !== -1) {
            basicBlock = this.labels[index].blocks;
            if (basicBlock.lineNumber !== -1) {
                // Repeated label
                basicBlock = null;
            }
            else {
                basicBlock.lineNumber = lineNumber;
                basicBlock.id = this._numberOfBlocks - 1;
                actual.next = basicBlock;
            }
        }
        else {
            // New label, need to create a new basicBlock
            basicBlock = new BasicBlock(this.numberOfBlocks - 1, lineNumber, null, null);
            let label = new Label();
            label.name = str;
            label.blocks = basicBlock;
            this.labels.push(label);
            index = this.labels.length - 1;
            if (this._basicBlocks == null) {
                this._basicBlocks = basicBlock;
            }
            else {
                actual.next = basicBlock;
                let sucessor = new SuccessorBlock();
                sucessor.block = basicBlock;
                sucessor.next = actual.successor;
                actual.successor = sucessor;
            }
        }
        return basicBlock;
    }
    replaceLabels() {
        for (let i = 0; i < this._lines; i++) {
            if (this.isJump(this._instructions[i].opcode)) {
                let basicBlock = this._labels[this._instructions[i].getOperand(2)].blocks;
                if (basicBlock.lineNumber === -1) {
                    return -1;
                }
                this._instructions[i].setOperand(2, basicBlock.id, '');
            }
        }
    }
    load(input) {
        this._lexer.setInput(input);
        let lexema;
        let actual;
        let newBlock = true;
        // First we need the number of code lines
        lexema = this._lexer.lex();
        if (lexema.value !== LEX.LINESNUMBER) {
            throw new Error('Error parsing lines number');
        }
        this._lines = +lexema.yytext;
        this.instructions.length = this._lines;
        for (let i = 0; i < this._lines; i++) {
            this.instructions[i] = new Instruction();
            this.instructions[i].id = i;
            lexema = this._lexer.lex();
            if (lexema.value === LEX.LABEL) {
                this._numberOfBlocks++;
                this.instructions[i].label = lexema.yytext;
                actual = this.addLabel(lexema.yytext, i, actual);
                if (actual == null) {
                    throw new Error(`Error at line ${i + this.numberOfBlocks}, label ${lexema.yytext} already exists`);
                }
                lexema = this._lexer.lex();
            }
            else {
                this.instructions[i].label = '';
                if (newBlock) {
                    this._numberOfBlocks++;
                    let basicBlock = new BasicBlock(this._numberOfBlocks - 1, i, null, null);
                    if (this._basicBlocks == null) {
                        this._basicBlocks = actual = basicBlock;
                    }
                    else {
                        actual.next = basicBlock;
                        let successor = new SuccessorBlock();
                        successor.block = basicBlock;
                        successor.next = actual.successor;
                        actual.successor = successor;
                        actual = actual.next;
                    }
                }
            }
            newBlock = false;
            this.checkLexema(lexema, LEX.ID, i);
            let opcode = this._parser.stringToOpcode(lexema.yytext);
            this._instructions[i].opcode = opcode;
            this._instructions[i].basicBlock = this._numberOfBlocks - 1;
            switch (opcode) {
                case Opcodes.NOP:
                    this._parser.parseNooP(this._instructions[i]);
                    break;
                case Opcodes.ADD:
                case Opcodes.SUB:
                case Opcodes.MULT:
                case Opcodes.OR:
                case Opcodes.AND:
                case Opcodes.XOR:
                case Opcodes.NOR:
                case Opcodes.SLLV:
                case Opcodes.SRLV:
                    this._parser.parseOperationWithTwoGeneralRegisters(i, this._instructions[i]);
                    break;
                case Opcodes.ADDF:
                case Opcodes.SUBF:
                case Opcodes.MULTF:
                    this._parser.parseOperationWithTwoFloatingRegisters(i, this._instructions[i]);
                    break;
                case Opcodes.ADDI:
                    this._parser.parseOperationWithGeneralRegisterAndInmediate(i, this._instructions[i]);
                    break;
                case Opcodes.SW:
                case Opcodes.LW:
                    this._parser.parseGeneralLoadStoreOperation(i, this._instructions[i]);
                    break;
                case Opcodes.SF:
                case Opcodes.LF:
                    this._parser.parseFloatingLoadStoreOperation(i, this._instructions[i]);
                    break;
                case Opcodes.BNE:
                case Opcodes.BEQ:
                case Opcodes.BGT:
                    this._parser.parseJumpOperation(i, this._instructions[i], actual, this.checkLabel.bind(this));
                    newBlock = true;
                    break;
                case Opcodes.OPERROR:
                    throw new Error(`Error at line ${i + this.numberOfBlocks + 1} unknown opcode ${lexema.yytext}`);
                default:
                    throw new Error(`Error at line ${i + this.numberOfBlocks + 1} unknown opcode ${lexema.yytext}`);
            }
        }
        this.replaceLabels();
    }
    checkLexema(lexema, expectedLexema, i) {
        if (lexema.value !== expectedLexema) {
            throw new Error(`Error at line ${i + this.numberOfBlocks + 1}, expected: ${LEX[expectedLexema]} got: ${lexema.yytext}`);
        }
    }
    getBasicBlockInstruction(basicBlockIndex) {
        if (basicBlockIndex > this._numberOfBlocks) {
            return -1;
        }
        let actual = this._basicBlocks;
        for (let i = 0; i < basicBlockIndex; i++) {
            actual = actual.next;
        }
        return actual.lineNumber;
    }
    /*
    * SETTERS Y GETTERS
    */
    get instructions() {
        return this._instructions;
    }
    set instructions(value) {
        this._instructions = value;
    }
    get lines() {
        return this._lines;
    }
    set lines(value) {
        this._lines = value;
    }
    get labels() {
        return this._labels;
    }
    set labels(value) {
        this._labels = value;
    }
    get numberOfBlocks() {
        return this._numberOfBlocks;
    }
    set numberOfBlocks(value) {
        this._numberOfBlocks = value;
    }
    get basicBlocks() {
        return this._basicBlocks;
    }
    set basicBlocks(value) {
        this._basicBlocks = value;
    }
    isJump(opcode) {
        return (opcode === Opcodes.BEQ) || (opcode === Opcodes.BGT) || (opcode === Opcodes.BNE);
    }
}
