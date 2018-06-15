import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { debounce } from 'throttle-debounce'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Toggle from 'material-ui/Toggle'
import SelectProblems from '../../SelectProblems'
import {
    addRoom,
    openSnackBar,
} from '../../../Actions/'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addRoom,
        openSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.controlPanel.user,
        problems: state.controlPanel.problems,
        problemsOrdered: state.controlPanel.problemsOrdered,
    }
}

const MAX_STEPS = 3

class CreateRoom extends React.Component {

    state = {
        stepIndex: 0,
        roomName: '',
        roomPassword: '',
        roomType: 'single',
        roomVisibility: true,
        selectedProblems: [],
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

    handleOnClickSelectedProblem = (problemId) => {
        this.setState({
            selectedProblems: this.state.selectedProblems.filter(id => (
                problemId !== id
            ))
        })
    }

    handleOnClickProblem = (problemId) => {
        this.setState({
            selectedProblems: this.state.selectedProblems.concat([problemId])
        })
    }

    handleOnChangeRoomName = debounce (
        300,
        async (event, value) => {
            this.setState({
                roomName: value,
            })
        }
    )
    
    handleOnChangePassword = debounce (
        300,
        async (event, value) => {
            this.setState({
                roomPassword: value,
            })
        }
    )
    
    handleOnChangeRoomType = debounce (
        300,
        async (event, value) => {
            this.setState({
                roomType: value,
            })
        }
    )

    handleOnToggleVisibility = (event, value) => {
        this.setState({
            roomVisibility: value,
        })
    }

    restartState = () => {
        this.setState({
            stepIndex: 0,
            roomName: '',
            roomPassword: '',
            roomType: 'single',
            roomVisibility: true,
            selectedProblems: [],
        })
    }

    handleCreateRoom = () => {
        let problems = {}
        this.state.selectedProblems.forEach((problem) => (
            problems[problem] = true
        ))
        if (this.state.roomName.length <= 3 ||  this.state.roomPassword.length <= 3)
            this.props.openSnackBar('WARNING: Name and password length should be > 3', 'warning')
        else {
            this.props.addRoom({
                name: this.state.roomName,
                members: {},
                problems: problems,
                visibility: this.state.roomVisibility,
                type: this.state.roomType,
                password: this.state.roomPassword,
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
                    style={{marginTop: 0}}
                    floatingLabelText="Room Name"
                    onChange={this.handleOnChangeRoomName}
                />
            </div>
            )
        case 1:
            return (
            <div>
                <h3>
                    Select which problems will be in the room.
                </h3>
                <SelectProblems
                    problems={this.props.problemsOrdered}
                    selectedProblems={this.state.selectedProblems}
                    handleOnClickSelectedProblem={this.handleOnClickSelectedProblem}
                    handleOnClickProblem={this.handleOnClickProblem}
                />
            </div>
            )
        case 2:
            return (
                <div  >
                    <h3>
                        Set up the room properties
                    </h3>
                    <div style={{ maxWidth: '250px' }} >
                        <h4>Type:</h4>
                        <RadioButtonGroup
                            style={{ marginLeft: '50px' }}
                            labelPosition="left"
                            name="shipSpeed"
                            defaultSelected="single"
                            onChange={this.handleOnChangeRoomType}
                        >
                            <RadioButton
                                value="single"
                                label="Single Room"
                            />
                            <RadioButton
                                value="group"
                                label="Group Room"
                            />
                        </RadioButtonGroup>
                        <Divider style={{marginTop: '15px', marginBottom: '15px'}} />
                        <Toggle
                            defaultToggled
                            label="Visibility"
                            onToggle={this.handleOnToggleVisibility}
                        />
                        <TextField 
                            style={{marginTop: 0}}
                            floatingLabelText="Password"
                            onChange={this.handleOnChangePassword}
                        />
                    </div>
                </div>
            )
        case 3:
            return (
                <div>
                    <h2>
                        Check the room information and click finish if it is all right.
                    </h2>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Name:
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.roomName}</p>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Problems:
                    </h3> 
                        {
                            this.state.selectedProblems.length > 0
                            ? this.state.selectedProblems.map(id => (
                                <li
                                    key={id}
                                    style={{ marginLeft: '15px', marginTop: '10px' }}
                                >
                                    {this.props.problems[id].name}
                                </li>
                            ))
                            : 'No se asignaron problemas'             
                        }
                    
                    <h3 style={{ fontWeight: 'bold' }} >
                        Type: 
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.roomType}</p>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Visibility: 
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.roomVisibility ? 'True' : 'False'}</p>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Password: 
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.roomPassword}</p>
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
                        onClick={stepIndex === MAX_STEPS ? this.handleCreateRoom : this.handleNext}
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
                        <StepLabel>Problems</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Properties</StepLabel>
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

CreateRoom.propTypes = {
    problems: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    addRoom: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)