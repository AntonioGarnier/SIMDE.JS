import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Toggle from 'material-ui/Toggle'
import SelectInstances from '../../SelectInstances'
import RichEditor from '../../RichEditor'
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
        singleRooms: state.controlPanel.singleRooms,
        groupRooms: state.controlPanel.groupRooms,
        groups: state.controlPanel.groups,
    }
}

const MAX_STEPS = 3

class CreateProblem extends React.Component {

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

    handleOnChangeProblemName = (event, value) => {
        this.setState({
            roomName: value,
        })
    }

    handleOnChangePassword = (event, value) => {
        this.setState({
            roomPassword: value,
        })
    }

    handleOnChangeRoomType = (event, value) => {
        this.setState({
            roomType: value,
        })
    }

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

    handleCreateProblem = () => {
        let problems = {}
        this.state.selectedProblems.forEach((problem) => (
            problems[problem] = true
        ))
        if (this.state.roomName.length < 3 ||  this.state.roomPassword.length < 3)
            this.props.openSnackBar('ERROR: Could NOT create the room. Check the room name or password', 'error')
        else {
            this.props.addRoom({
                name: this.state.roomName,
                members: {},
                problems: problems,
                visibility: this.state.roomVisibility,
                type: this.state.roomType,
                password: this.state.roomPassword,
            })
            this.props.openSnackBar('SUCCESS: Room add!', 'success')
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
                    <RichEditor />
                </div>
            )
        case 2:
            return (
                <div>
                    <h3>
                        Select which problems will be in the room.
                    </h3>
                    <SelectInstances
                        problems={this.props.problems}
                        selectedProblems={this.state.selectedProblems}
                        handleOnClickSelectedProblem={this.handleOnClickSelectedProblem}
                        handleOnClickProblem={this.handleOnClickProblem}
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
                        Problem name:
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.roomName}</p>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Problem definition:
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
                        Problem instances: 
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.roomType}</p>
                    
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
        const {loading, stepIndex} = this.state
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
    problems: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    addRoom: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProblem)