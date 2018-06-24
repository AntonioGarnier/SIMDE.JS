import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import RichEditor from '../RichEditor'
import {
    openSnackBar,
    openPopUp,
} from '../../Actions'
import InstanceInfo from '../InstanceView/instanceInfo'


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openSnackBar,
        openPopUp,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.controlPanel.user,
        problems: state.controlPanel.problems,
        instances: state.controlPanel.instances,
        problemsOrdered: state.controlPanel.problemsOrdered,
    }
}

const ProblemInfo = (props) => {
    return (
        <div>
            <h1 style={{ fontWeight: 'bold' }} >
                {props.problems[props.problemId].name}
            </h1>
            <h3 style={{ fontWeight: 'bold' }} >
                Definition:
            </h3> 
                <RichEditor
                    content={props.problems[props.problemId].definition}
                    readOnly
                    hideToolbar
                />
            <h3 style={{ fontWeight: 'bold' }} >
                Instances: 
            </h3>
                <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }} >
                    {
                        Object.keys(props.problems[props.problemId].instances).length > 0
                        ? Object.keys(props.problems[props.problemId].instances).map(id => (
                            <InstanceInfo
                                key={id} 
                                name={props.instances[id].name}
                                initial={props.instances[id].initial}
                                final={props.instances[id].final}
                                showFinal={props.user.rol === 'admin'}
                            />
                        ))
                        : 'No instances yet'          
                    }
                </div>
        </div>
    )
}

ProblemInfo.propTypes = {
    problemId: PropTypes.string.isRequired,
    openSnackBar: PropTypes.func.isRequired,
    problems: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    problemsOrdered: PropTypes.array.isRequired,
    instances: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemInfo)