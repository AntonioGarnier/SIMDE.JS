import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import {
    openSnackBar,
} from '../../Actions'
import ProblemInfo from './problemInfo'


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        problems: state.controlPanel.problems,
        problemsOrdered: state.controlPanel.problemsOrdered,
    }
}

const ProblemView = (props) => {
    if (!props.problems.hasOwnProperty(props.match.params.problem))
        return <Redirect to="/problem-list" />
    return (
        <ProblemInfo 
            problemId={props.match.params.problem}
        />
    )   
}

ProblemView.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            instance: PropTypes.string,
        }).isRequired,
    }).isRequired,
    openSnackBar: PropTypes.func.isRequired,
    problems: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemView)