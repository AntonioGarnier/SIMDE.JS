import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CustomList from '../CustomList'


const mapStateToProps = (state) => {
    let single = {}
    Object.keys(state.controlPanel.singleRooms).forEach(element =>
        single[element] = state.controlPanel.singleRooms[element].name
    )
    let group = {}
    Object.keys(state.controlPanel.groupRooms).forEach(element =>
        group[element] = state.controlPanel.groupRooms[element].name
    )
    return {
        user: state.controlPanel.user,
        singleRooms: single,
        groupRooms: group,
    }
}

const RoomList = ({ 
    singleRooms,
    groupRooms,
}) => {
    return (
        <div style={{ display: 'flex' }} >
            <CustomList
                title="Single Rooms"
                path="/room-list/"
                iconType="single"
                itemList={singleRooms}
            />
            <CustomList
                title="Group Rooms"
                path="/room-list/"
                iconType="group"
                itemList={groupRooms}
            />
        </div>
    )
}

RoomList.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
        lastSignInTime: PropTypes.string.isRequired,
    }).isRequired,
}

export default connect(mapStateToProps)(RoomList)
