import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { debounce } from 'throttle-debounce'
import PropTypes from 'prop-types'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { ContentIntegration } from '../../../../Simulator/integration/content-integration';
import {
    addInstance,
    openSnackBar,
} from '../../../Actions/'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addInstance,
        openSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.controlPanel.user,
    }
}

const MAX_STEPS = 2

class CreateInstance extends React.Component {

    state = {
        stepIndex: 0,
        instanceName: '',
        instanceInitialData: {},
        instanceFinalData: {},
    }

    handleNext = () => {
        const {stepIndex} = this.state
        this.setState({
            stepIndex: stepIndex + 1,
        })
    }

    handlePrev = () => {
        const {stepIndex} = this.state
        this.setState({
            stepIndex: stepIndex - 1,
        })
    }

    handleOnChangeName = debounce (
        300,
        (event, value) => {
            this.setState({
                instanceName: value,
            })
        }
    )

    handleOnChangeInitial = debounce (
        300,
        (event, value) => {
            try {
                this.setState({
                    instanceInitialData: new ContentIntegration(value),
                }) 
            }
            catch (error) {
                this.setState({
                    instanceInitialData: {}
                }) 
                this.props.openSnackBar(`ERROR: ${error.message}`, 'error')
            }
        }
    )

    handleOnChangeFinal = debounce (
        300,
        (event, value) => {
            try {
                this.setState({
                    instanceFinalData: new ContentIntegration(value)
                }) 
            }
            catch (error) {
                this.setState({
                    instanceFinalData: {}
                })
                this.props.openSnackBar(`ERROR: ${error.message}`, 'error')
            }        
        }
    )


    restartState = () => {
        this.setState({
            stepIndex: 0,
            instanceName: '',
            instancePassword: '',
        })
    }

    handleCreateInstance = () => {
        if (this.state.instanceName.length <= 3 || Object.keys(this.state.instanceInitialData).length === 0 || Object.keys(this.state.instanceFinalData).length === 0)
            this.props.openSnackBar('WARNING: Name length > 3. Initial & final state must not be empty', 'warning')
        else {
            let initial = {
                FPRContent: this.state.instanceInitialData.FPRContent,
                GPRContent: this.state.instanceInitialData.GPRContent,
                MEMContent: this.state.instanceInitialData.MEMContent,
                currentContent: this.state.instanceInitialData.currentContent,
                input: this.state.instanceInitialData.input,
            }
            let final = {
                FPRContent: this.state.instanceFinalData.FPRContent,
                GPRContent: this.state.instanceFinalData.GPRContent,
                MEMContent: this.state.instanceFinalData.MEMContent,
                currentContent: this.state.instanceFinalData.currentContent,
                input: this.state.instanceFinalData.input,
            }


            this.props.addInstance({
                name: this.state.instanceName,
                initial: this.state.instanceInitialData.input,
                final: this.state.instanceFinalData.input,
            })
            this.restartState()
        }
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
        case 0:
            return (
                <div>
                    <h3>
                        Add a name.
                    </h3>
                    <TextField
                        key="fieldName"
                        style={{marginTop: 0}}
                        floatingLabelText="Instance Name"
                        onChange={this.handleOnChangeName}
                    />
                </div>
            )
        case 1:
            return (
                <div>
                    <h3>
                        Add a initil and final data.
                    </h3>
                    <p>Initial: </p>
                    {console.log('Content: ', this.state.instanceInitialData)}
                    <TextField
                        key="init"
                        style={{marginTop: 0}}
                        floatingLabelText="#FPR #GPR #MEM"
                        onChange={this.handleOnChangeInitial}
                        multiLine
                    />
                    <p>Final: </p>
                    <TextField
                        key="final"
                        style={{marginTop: 0}}
                        floatingLabelText="#FPR #GPR #MEM"
                        onChange={this.handleOnChangeFinal}
                        multiLine
                    />
                </div>
            )
        case 2:
            return (
                <div>
                    <h2>
                        Check the instance information and click finish if it is all right.
                    </h2>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Name:
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.instanceName}</p>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Initial: 
                    </h3>
                        <pre style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.instanceInitialData.input}</pre>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Final:
                    </h3> 
                        <pre style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.instanceFinalData.input}</pre>                        
                </div>
            )
        default:
            return 'No more steps!'
        }
    }

    renderContent() {
        const { stepIndex} = this.state
        const contentStyle = {margin: '0 16px', overflow: 'hidden'}
        return (
            <div style={contentStyle}>
                <div style={{marginTop: 24, marginBottom: 12}}>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label={stepIndex === MAX_STEPS ? 'Finish' : 'Next'}
                        primary={true}
                        onClick={stepIndex === MAX_STEPS ? this.handleCreateInstance : this.handleNext}
                    >
                    </RaisedButton>
                </div>
                <div>{this.getStepContent(stepIndex)}</div>
            </div>
        )
    }

    render() {
        const { stepIndex } = this.state
        return (
            <div style={{width: '100%', margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Name</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>GPR, FPR & MEM</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Overview</StepLabel>
                    </Step>
                </Stepper>
                {this.renderContent()}
            </div>
        )
    }
}

CreateInstance.propTypes = {
    addInstance: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInstance)