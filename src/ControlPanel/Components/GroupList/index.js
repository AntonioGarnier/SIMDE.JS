import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CustomList from '../CustomList'


const mapStateToProps = (state) => { 
    return {
        user: state.controlPanel.user,
        groups: state.controlPanel.groups,
        groupsOrdered: state.controlPanel.groupsOrdered,
    }
}

const GroupList = ({ 
    groups,
    groupsOrdered,
}) => {
    return (
        <div style={{ display: 'flex' }} >
            <CustomList
                title="Groups"
                path="/group-list/"
                iconType="group"
                itemList={groups}
                orderedList={groupsOrdered}
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
