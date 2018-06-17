import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { CardHeader } from 'material-ui/Card'
import {
    Step,
    Stepper,
    StepLabel,
  } from 'material-ui/Stepper'
  import RaisedButton from 'material-ui/RaisedButton'
import Loading from '../Loading'
import {
    openSnackBar,
    openPopUp,
    getMembers,
    updateRankingResults,
} from '../../Actions'
import ProblemInfo from '../ProblemView/problemInfo'
import SuperescalarIntegration from '../../../Simulator/integration/superescalar-integration'


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openSnackBar,
        openPopUp,
        getMembers,
        updateRankingResults,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        userList: state.controlPanel.userList,
        problems: state.controlPanel.problems,
        instances: state.controlPanel.instances,
    }
}

class RoomInfo extends React.Component {

    state = {
        stepIndex: 0,
    }
    
    handleNext = () => {
        const {stepIndex} = this.state
        this.setState({
            stepIndex: stepIndex + 1,
        })
    }
    
    handlePrev = () => {
        const {stepIndex} = this.state
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1})
        }
    }

    handleTestCodeWithAllInstances = () => {
        // Necesito el tipo de sala aqui pasado por props para hacer cosas segun sea una sala u otra
    }

    handleTestCodeWithSelectedInstance = () => {
        /* Testea el codigo con la instancia seleccionada*/
        // SuperescalarIntegration.testCodeWithInstance()

    }

    handleFinish = () => {
    
    }

    getStepContent = (stepIndex) => (
        <div>
            <div>
                <ProblemInfo 
                    problemId={this.props.problemsId[stepIndex]}
                />
            </div>


        </div>
    )
    
    render() {
        const {
            problemsId,
            userList,
            leader,
            problems,
            instances,
            members,
            getMembers,
            roomName,
        } = this.props
        const {finished, stepIndex} = this.state
        return (
            <div>
                <h1>{roomName}</h1>

                <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                    <Stepper activeStep={stepIndex}>
                        {
                            problemsId.map((problem) => (
                                <Step key={problem}>
                                    <StepLabel>{problems[problem].name}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>
                    {this.getStepContent(stepIndex)}
                    <div style={{marginTop: 12}}>
                        <RaisedButton
                            label="Back"
                            disabled={stepIndex === 0}
                            onClick={this.handlePrev}
                            style={{marginRight: 12}}
                        />
                        <RaisedButton
                            label={stepIndex === problemsId.length - 1 ? 'Finish' : 'Send Results'}
                            primary={true}
                            onClick={stepIndex === problemsId.length - 1 ? this.handleFinish : this.handleNext}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

RoomInfo.propTypes = {
    roomName: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    problemsId: PropTypes.array.isRequired,
    instances: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    openSnackBar: PropTypes.func.isRequired,
    updateRankingResults: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo)