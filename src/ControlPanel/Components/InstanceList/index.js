import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CustomList from '../CustomList'


const mapStateToProps = (state) => { 
    return {
        user: state.controlPanel.user,
        instances: state.controlPanel.instances,
        instancesOrdered: state.controlPanel.instancesOrdered,
    }
}

const InstanceList = ({ 
    instances,
    instancesOrdered,
}) => {
    return (
        <div style={{ display: 'flex' }} >
            <CustomList
                title="Instances"
                path="/instance-list/"
                iconType="instance"
                itemList={instances}
                orderedList={instancesOrdered}
            />
        </div>
    )
}

InstanceList.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
        lastSignInTime: PropTypes.string.isRequired,
    }).isRequired,
}

export default connect(mapStateToProps)(InstanceList)
