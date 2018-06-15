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
import {
    addGroup,
    openSnackBar,
} from '../../../Actions/'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addGroup,
        openSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.controlPanel.user,
    }
}

const MAX_STEPS = 2

class CreateGroup extends React.Component {

    state = {
        stepIndex: 0,
        groupName: '',
        groupPassword: '',
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
                groupName: value,
            })
        }
    )

    handleOnChangePassword = debounce (
        300,
        (event, value) => {
            this.setState({
                groupPassword: value,
            })
        }
    )

    restartState = () => {
        this.setState({
            stepIndex: 0,
            groupName: '',
            groupPassword: '',
        })
    }

    handleCreateGroup = () => {
        if (this.state.groupName.length <= 3 ||  this.state.groupPassword.length <= 3)
            this.props.openSnackBar('WARNING: Group name or password length > 3', 'warning')
        else {
            this.props.addGroup({
                name: this.state.groupName,
                password: this.state.groupPassword,
                leader: this.props.user.uid,
                members: {},
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
                        floatingLabelText="Group Name"
                        onChange={this.handleOnChangeName}
                    />
                </div>
            )
        case 1:
            return (
                <div>
                    <h3>
                        Add a password.
                    </h3>
                    <TextField
                        key="fieldPassword"
                        style={{marginTop: 0}}
                        floatingLabelText="Password"
                        onChange={this.handleOnChangePassword}
                    />
            </div>
            )
        case 2:
            return (
                <div>
                    <h2>
                        Check the group information and click finish if it is all right.
                    </h2>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Name:
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.groupName}</p>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Leader: 
                    </h3>
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.props.user.displayName}</p>
                    <h3 style={{ fontWeight: 'bold' }} >
                        Password:
                    </h3> 
                        <p style={{ marginLeft: '15px', marginTop: '10px' }} >{this.state.groupPassword}</p>
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
                        onClick={stepIndex === MAX_STEPS ? this.handleCreateGroup : this.handleNext}
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
                        <StepLabel>Password</StepLabel>
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

CreateGroup.propTypes = {
    addGroup: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)