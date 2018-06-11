import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CustomList from '../CustomList'


const mapStateToProps = (state) => {
    let groups = {}
    Object.keys(state.controlPanel.groups).forEach(element =>
        groups[element] = state.controlPanel.groups[element].name
    )
    return {
        user: state.controlPanel.user,
        groups,
    }
}

const GroupList = ({ 
    groups,
}) => {
    return (
        <div style={{ display: 'flex' }} >
            <CustomList
                title="Groups"
                path="/group-list/"
                iconType="group"
                itemList={groups}
            />
        </div>
    )
}

GroupList.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
        lastSignInTime: PropTypes.string.isRequired,
    }).isRequired,
}

export default connect(mapStateToProps)(GroupList)
