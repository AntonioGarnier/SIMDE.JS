import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Toggle from 'material-ui/Toggle'
import Check from 'material-ui/svg-icons/navigation/check'
import ArrowFordward from 'material-ui/svg-icons/navigation/arrow-forward'
import Add from 'material-ui/svg-icons/content/add'
import {
    addRoom,
} from '../../Actions/'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addRoom,
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

class CreateRoom extends React.Component {

    state = {
        loading: false,
        finished: false,
        stepIndex: 0,
        roomName: '',
        roomPassword: '',
        roomType: 'single',
        roomVisibility: true,
        selectedProblems: [],
    }

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
        this.asyncTimer = setTimeout(cb, 500)
        })
    }

    handleNext = () => {
        const {stepIndex} = this.state
        if (!this.state.loading) {
        this.dummyAsync(() => this.setState({
            loading: false,
            stepIndex: stepIndex + 1,
            finished: stepIndex >= MAX_STEPS,
        }))
        }
    }

    handlePrev = () => {
        const {stepIndex} = this.state
        if (!this.state.loading) {
        this.dummyAsync(() => this.setState({
            loading: false,
            stepIndex: stepIndex - 1,
        }))
        }
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

    handleOnChangeRoomName = (event, value) => {
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

    handleCreateRoom = () => {
        let problems = {}
        this.state.selectedProblems.forEach((problem) => (
            problems[problem] = true
        ))
        if (this.state.roomName.length < 3 ||  this.state.roomPassword.length < 3)
            console.log('ERROR: Could not create the room. Check the room name or password')
        else
            this.props.addRoom({
                name: this.state.roomName,
                members: {},
                problems: problems,
                visibility: this.state.roomVisibility,
                type: this.state.roomType,
                password: this.state.roomPassword,
            })
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
        case 0:
            return (
            <div>
                <h3>
                    Add a room name.
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
                <div style={{ display: 'flex' }} >
                    <Paper className="listStyle" >
                        <List>
                            <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Problems</Subheader>
                            <Divider />
                                {
                                    Object.keys(this.props.problems).map((id) => (
                                            <ListItem
                                                key={id}
                                                disabled={this.state.selectedProblems.includes(id)}
                                                leftIcon={this.state.selectedProblems.includes(id) ? <Check/> : <Add/>}
                                                onClick={() => this.handleOnClickProblem(id)}
                                            >
                                                {this.props.problems[id].name}
                                            </ListItem>
                                    ))
                                }
                        </List>
                    </Paper>
                    <div>
                        <ArrowFordward style={{marginTop: '63px'}} />
                    </div>
                    <Paper className="listStyle" >
                        <List>
                            <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Selected Problems</Subheader>
                            <Divider />
                                {
                                    this.state.selectedProblems.length > 0
                                    ? this.state.selectedProblems.map(id => (
                                        <ListItem
                                            key={id}
                                            leftIcon={<Check/>}
                                            onClick={() => this.handleOnClickSelectedProblem(id)}
                                        >
                                            {this.props.problems[id].name}
                                        </ListItem>
                                    ))
                                    : null
                                }
                        </List>
                    </Paper>
                </div>
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
                        Room name:
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.roomName}</p>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Room problems:
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
                        Room type: 
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.roomType}</p>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Room visibility: 
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.roomVisibility ? 'True' : 'False'}</p>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Room password: 
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.roomPassword}</p>
                </div>
            )
        default:
            return 'No more steps!'
        }
    }

    renderContent() {
        const {finished, stepIndex} = this.state
        const contentStyle = {margin: '0 16px', overflow: 'hidden'}

        if (finished) {
            return (
                <div style={contentStyle}>
                    <p>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault()
                                this.setState({stepIndex: 0, finished: false})
                            }}
                        >
                            Click here
                        </a> to reset the example.
                    </p>
                </div>
            )
        }

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
                    />
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
                        <StepLabel>Problems</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Properties</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Overview</StepLabel>
                    </Step>
                </Stepper>
                <ExpandTransition loading={loading} open={true}>
                    {this.renderContent()}
                </ExpandTransition>
            </div>
        )
    }
}

CreateRoom.propTypes = {
    problems: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    addRoom: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)