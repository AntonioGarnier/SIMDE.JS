import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { debounce } from 'throttle-debounce'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { CardHeader } from 'material-ui/Card'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import IconButton from 'material-ui/IconButton'
import {
    Step,
    Stepper,
    StepLabel,
  } from 'material-ui/Stepper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Loading from '../Loading'
import {
    openSnackBar,
    openPopUp,
    getMembers,
    updateRankingResults,
    openSideBarRank
} from '../../Actions'
import ProblemInfo from '../ProblemView/problemInfo'
import SuperescalarIntegration from '../../../Simulator/integration/superescalar-integration'
import RankingView from '../RankingView';


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openSnackBar,
        openPopUp,
        getMembers,
        updateRankingResults,
        openSideBarRank
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        cycle: state.cycle,
        userList: state.controlPanel.userList,
        problems: state.controlPanel.problems,
        instances: state.controlPanel.instances,
        ranking: state.controlPanel.ranking,
        toggleSideBarRank: state.controlPanel.toggleSideBarRank,
    }
}

// Values -> example: [ 2, 5, 3, 6 ]
const rankingSum = (values, bonus) => bonus - values.reduce((a, b) => a + b, 0)
const average = (values) => values.reduce((a, b) => a + b, 0) / values.length

class RoomInfo extends React.Component {

    state = {
        stepIndex: 0,
        code: {},
        results: {},
        scores: {},
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

    handleOnChangeFinal = debounce (
        300,
        (event, value) => {
            this.setState({
                code: {
                    ...this.state.code,
                    [this.props.problemsId[this.state.stepIndex]]: value,
                }
            }) 
        }
    )

    calculateRankingScore = () => {
        const { roomId, ranking } = this.props
        let membersResult = {}
        Object.keys(ranking[roomId]).map((member) => (
            membersResult[member] = Object.keys(ranking[roomId][member]).map((problem) => (
                ranking[roomId][member][problem]
            ))
        ))
        let maxNumCycle = Math.max(...Object.keys(membersResult).map((member) => (
            Math.max(...membersResult[member])
        )))
        let scores = {}
        Object.keys(membersResult).map((member) => (
            scores[member] = rankingSum(membersResult[member], maxNumCycle * membersResult[member].length)
        ))
        /*this.setState({
            scores,
        })*/
        return scores

        /*console.log('membersResult: ', membersResult)
        console.log('maxNumCycle: ', maxNumCycle)
        console.log('scores: ', scores)*/
    }

    handleTestCodeWithAllInstances = () => {
        const { problems, problemsId, instances } = this.props
        const { stepIndex } = this.state
        let result = []
        Object.keys(problems[problemsId[stepIndex]].instances).forEach((instanceId) => {
            result.push(this.handleTestCodeWithSelectedInstance(instances[instanceId].initial, this.state.code[problemsId[stepIndex]]))
        })
        this.setState({
            results: {
                ...this.state.results,
                [problemsId[stepIndex]]: average(result)
            }
        })
        //console.log('Result: ', result)
        // Necesito el tipo de sala aqui pasado por props para hacer cosas segun sea una sala u otra
    }

    handleTestCodeWithSelectedInstance = (instanceInput, codeInput) => {
        /* Testea el codigo con la instancia seleccionada*/
        return SuperescalarIntegration.testCodeWithInstance(instanceInput, codeInput)
    }

    handleFinish = () => {
    
    }

    getStepContent = (stepIndex) => (
        <div>
            <div>
                <ProblemInfo 
                    problemId={this.props.problemsId[stepIndex]}
                />
                <h2>Code:{this.props.cycle}</h2>
                <TextField
                    key="code"
                    rows={10}
                    style={{marginTop: 0}}
                    floatingLabelText="Write your code here!"
                    onChange={this.handleOnChangeCode}
                    multiLine
                />
            </div>
            {console.log('Scoreiros: ', this.state.scores)}
            
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
        const contentStyle = {
            transition: 'margin-right 450ms cubic-bezier(0.23, 1, 0.32, 1)',
            marginRight: '0px',
            padding: '5%',
            margin: 'auto'
        }
        console.log('this.props.toggleSideBarRank: ', this.props.toggleSideBarRank)
        if (this.props.toggleSideBarRank)
            contentStyle.marginRight = '250px'
        else
            contentStyle.marginRight = '0px'
        console.log('Results: ', this.state.results)
        return (
            <div>
                <RankingView 
                    type='single'
                    scores={this.calculateRankingScore()}
                />
                <h1>{roomName}</h1>
                <RaisedButton 
                    primary
                    label="Show Ranking"
                    onClick={this.props.openSideBarRank}
                />

                <div style={contentStyle}>
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
                            onClick={stepIndex === problemsId.length - 1 ? this.handleTestCodeWithAllInstances : this.handleTestCodeWithAllInstances}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

RoomInfo.propTypes = {
    roomName: PropTypes.string.isRequired,
    roomType: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    problemsId: PropTypes.array.isRequired,
    instances: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    openSnackBar: PropTypes.func.isRequired,
    updateRankingResults: PropTypes.func.isRequired,
    openSideBarRank: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo)