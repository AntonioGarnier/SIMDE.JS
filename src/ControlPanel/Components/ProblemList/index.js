import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CustomList from '../CustomList'


const mapStateToProps = (state) => { 
    return {
        user: state.controlPanel.user,
        problems: state.controlPanel.problems,
        problemsOrdered: state.controlPanel.problemsOrdered,
    }
}

const ProblemList = ({ 
    problems,
    problemsOrdered,
}) => {
    return (
        <div style={{ display: 'flex' }} >
            <CustomList
                title="Problems"
                path="/problem-list/"
                iconType="problem"
                itemList={problems}
                orderedList={problemsOrdered}
            />
        </div>
    )
}

ProblemList.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
        lastSignInTime: PropTypes.string.isRequired,
    }).isRequired,
}

export default connect(mapStateToProps)(ProblemList)
