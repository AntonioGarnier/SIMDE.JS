import * as React from 'react';
import { OpcodesNames } from '../../core/Common/Opcodes';
import { translate } from 'react-i18next';
import SuperescalarIntegration from '../../integration/superescalar-integration';
class CodeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorPalette: [
                'blue',
                'green',
                'yellow',
                'pink'
            ]
        };
        this.setBreakpoint = this.setBreakpoint.bind(this);
    }
    setBreakpoint(index) {
        SuperescalarIntegration.superescalar.code.instructions[index].breakPoint = !SuperescalarIntegration.superescalar.code.instructions[index].breakPoint;
        SuperescalarIntegration.superescalar.code.instructions = [...SuperescalarIntegration.superescalar.code.instructions];
        this.props.toggleBreakPoint(SuperescalarIntegration.superescalar.code.instructions);
    }
    render() {
        console.log('nada aqui estamos', this.props.code)
        console.log('oh que paso mi niño', this.props.code.map((row, i) => console.log('Row: ', row, 'i: ', i)))
        return (<div className='smd-code panel panel-default'>
                <div className='panel-heading'>
                    Code
            </div>
                <div className='panel-body'>
                    <div className='smd-table'>
                        <div className='smd-table-header'>
                            <div className='smd-table-header_title'>#</div>
                            <div className='smd-table-header_title'>OPCODE</div>
                            <div className='smd-table-header_title'>OP1</div>
                            <div className='smd-table-header_title'>OP2</div>
                            <div className='smd-table-header_title'>OP3</div>
                        </div>
                        <div className='smd-table-body'>
                            {this.props.code && this.props.code.map((row, i) => <div className='smd-table_row' key={`${'Code' + i}`} onClick={(e) => { this.setBreakpoint(i); }}>
                                        <div className={`smd-table_cell ${row.breakPoint ? 'smd-breakpoint' : ''}`}>{row.label} {i}</div>
                                        <div className={`smd-table_cell ${this.props.colorBasicBlocks ? this.state.colorPalette[row.basicBlock % this.state.colorPalette.length] : ''}`}>{OpcodesNames[row.opcode]}</div>
                                        <div className={`smd-table_cell ${this.props.colorBasicBlocks ? this.state.colorPalette[row.basicBlock % this.state.colorPalette.length] : ''}`}>{row.operandsString[0]}</div>
                                        <div className={`smd-table_cell ${this.props.colorBasicBlocks ? this.state.colorPalette[row.basicBlock % this.state.colorPalette.length] : ''}`}>{row.operandsString[1]}</div>
                                        <div className={`smd-table_cell ${this.props.colorBasicBlocks ? this.state.colorPalette[row.basicBlock % this.state.colorPalette.length] : ''}`}>{row.operandsString[2]}</div>
                                    </div>)}
                        </div>
                    </div>
                </div>
            </div>);
    }
}
export default translate('common', { wait: true })(CodeComponent);
