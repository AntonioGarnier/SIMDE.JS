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
import SelectInstances from '../../SelectInstances'
import RichEditor from '../../RichEditor'
import {
    addProblem,
    openSnackBar,
} from '../../../Actions/'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addProblem,
        openSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.controlPanel.user,
        instances: state.controlPanel.instances,
    }
}

const MAX_STEPS = 3

class CreateProblem extends React.Component {

    state = {
        stepIndex: 0,
        problemName: '',
        problemDefinition: '',
        selectedInstances: [],
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

    handleOnClickSelectedInstance = (instanceId) => {
        this.setState({
            selectedInstances: this.state.selectedInstances.filter(id => (
                instanceId !== id
            ))
        })
    }

    handleOnClickInstance = (instanceId) => {
        this.setState({
            selectedInstances: this.state.selectedInstances.concat([instanceId])
        })
    }

    handleOnChangeProblemName = debounce (
        300,
        (event, value) => {
            this.setState({
                problemName: value,
            })
        }
    )


    handleChangeEditorContent = debounce (
        300,
        (value) => {
            this.setState({
                problemDefinition: value,
            })
        }
    )

    restartState = () => {
        this.setState({
            stepIndex: 0,
            problemName: '',
            problemDefinition: '',
            selectedInstances: [],
        })
    }

    handleCreateProblem = () => {
        let instances = {}
        this.state.selectedInstances.forEach((instance) => (
            instances[instance] = true
        ))
        if (this.state.problemName.length < 3 ||  this.state.problemDefinition.length < 3)
            this.props.openSnackBar('ERROR: Could NOT create the problem. Check the problem name or definition', 'error')
        else {
            this.props.addProblem({
                name: this.state.problemName,
                definition: this.state.problemDefinition,
                instances,
            })
            this.props.openSnackBar('SUCCESS: Problem created!', 'success')
            this.restartState()
        }
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
        case 0:
            return (
            <div>
                <h3>
                    Add a problem name.
                </h3>
                <TextField 
                    style={{marginTop: 0}}
                    floatingLabelText="Problem Name"
                    onChange={this.handleOnChangeProblemName}
                />
            </div>
            )
        case 1:
            return (
                <div  >
                    <h3>
                        Write the definition
                    </h3>
                    <RichEditor
                        content={this.state.problemDefinition}
                        handleChange={this.handleChangeEditorContent}
                    />
                </div>
            )
        case 2:
            return (
                <div>
                    <h3>
                        Select which instances will be in the room.
                    </h3>
                    <SelectInstances
                        instances={this.props.instances}
                        selectedInstances={this.state.selectedInstances}
                        handleOnClickSelectedInstance={this.handleOnClickSelectedInstance}
                        handleOnClickInstance={this.handleOnClickInstance}
                    />
                </div>
            )
        case 3:
            return (
                <div>
                    <h2>
                        Check the problem information and click finish if it is all right.
                    </h2>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Name:
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.problemName}</p>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Instances: 
                    </h3>
                        {
                            this.state.selectedInstances.length > 0
                            ? this.state.selectedInstances.map(id => (
                                <li
                                    key={id}
                                    style={{ marginLeft: '15px', marginTop: '10px' }}
                                >
                                    {this.props.instances[id].name}
                                </li>
                            ))
                            : 'No se asignaron instancias'          
                        }
                    <h3 style={{ fontWeight: 'bold' }} >
                        Definition:
                    </h3> 
                        <RichEditor
                            content={this.state.problemDefinition}
                            readOnly
                            hideToolbar
                        />
                    
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
                        onClick={stepIndex === MAX_STEPS ? this.handleCreateProblem : this.handleNext}
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
                        <StepLabel>Definition</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Instances</StepLabel>
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

CreateProblem.propTypes = {
    instances: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    addProblem: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProblem)