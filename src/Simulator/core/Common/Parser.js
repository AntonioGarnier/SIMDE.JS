import { LEX } from './Lexer';
import { Opcodes, OpcodesNames } from './Opcodes';
import { FunctionalUnitType } from './FunctionalUnit';
export class Parser {
    /*
    * PARSE STEPS
    */
    constructor(_lexer, checkLexema) {
        this._lexer = _lexer;
        this.checkLexema = checkLexema;
    }
    static opcodeToFunctionalUnitType(opcode) {
        /* tslint:disable:ter-indent */
        switch (opcode) {
            case Opcodes.ADD:
            case Opcodes.ADDI:
            case Opcodes.SUB:
            case Opcodes.OR:
            case Opcodes.AND:
            case Opcodes.NOR:
            case Opcodes.XOR:
            case Opcodes.SLLV:
            case Opcodes.SRLV: return FunctionalUnitType.INTEGERSUM;
            case Opcodes.ADDF:
            case Opcodes.SUBF: return FunctionalUnitType.FLOATINGSUM;
            case Opcodes.MULT: return FunctionalUnitType.INTEGERMULTIPLY;
            case Opcodes.MULTF: return FunctionalUnitType.FLOATINGMULTIPLY;
            case Opcodes.SW:
            case Opcodes.SF:
            case Opcodes.LW:
            case Opcodes.LF: return FunctionalUnitType.MEMORY;
            case Opcodes.BNE:
            case Opcodes.BEQ:
            case Opcodes.BGT: return FunctionalUnitType.JUMP;
            default: return FunctionalUnitType.INTEGERSUM;
        }
        /* tslint:enable:ter-indent */
    }
    parseNooP(instruction) {
        instruction.setOperand(0, 0, '');
        instruction.setOperand(1, 0, '');
        instruction.setOperand(2, 0, '');
    }
    parseOperationWithTwoGeneralRegisters(index, instruction) {
        let lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(2, this.stringToRegister(lexema.yytext), lexema.yytext);
    }
    parseOperationWithTwoFloatingRegisters(index, instruction) {
        let lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGFP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGFP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGFP, index);
        instruction.setOperand(2, this.stringToRegister(lexema.yytext), lexema.yytext);
    }
    parseOperationWithGeneralRegisterAndInmediate(index, instruction) {
        let lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.INMEDIATE, index);
        instruction.setOperand(2, this.stringToInmediate(lexema.yytext), lexema.yytext);
    }
    parseGeneralLoadStoreOperation(index, instruction) {
        let lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.ADDRESS, index);
        let result = this.stringToAddress(lexema.yytext);
        instruction.setOperand(1, result[0], lexema.yytext);
        instruction.setOperand(2, result[1], '');
    }
    parseFloatingLoadStoreOperation(index, instruction) {
        let lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGFP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.ADDRESS, index);
        let result2 = this.stringToAddress(lexema.yytext);
        instruction.setOperand(1, result2[0], lexema.yytext);
        instruction.setOperand(2, result2[1], '');
    }
    parseJumpOperation(index, instruction, actual, checkLabel) {
        let lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.ID, index);
        instruction.setOperand(2, checkLabel(lexema.yytext, actual), lexema.yytext);
    }
    stringToOpcode(stringOpcode) {
        let opcode = OpcodesNames.indexOf(stringOpcode);
        if (opcode !== -1) {
            return opcode;
        }
        else {
            return Opcodes.OPERROR;
        }
    }
    stringToAddress(stringAddress) {
        let result = new Array(2);
        let position = stringAddress.indexOf('(');
        if (position === 0) {
            result[0] = 0;
        }
        else {
            result[0] = +stringAddress.substring(0, position);
        }
        result[1] = this.stringToRegister(stringAddress.substr(position + 1, stringAddress.length - position - 2));
        return result;
    }
    stringToRegister(stringRegister) {
        return +stringRegister.substring(1, stringRegister.length);
    }
    stringToInmediate(stringInmediate) {
        return +stringInmediate.substring(1, stringInmediate.length);
    }
}
