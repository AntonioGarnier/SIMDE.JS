import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { debounce } from 'throttle-debounce'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { CardHeader } from 'material-ui/Card'
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
        code: '',
    }
    
    render() {

    }
        
}

RoomInfo.propTypes = {
    roomName: PropTypes.string.isRequired,
    roomType: PropTypes.string.isRequired,
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