import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Person from 'material-ui/svg-icons/social/person'
import Group from 'material-ui/svg-icons/social/group'
import { List, ListItem } from 'material-ui/List'
import { NavLink } from 'react-router-dom'
import { CardHeader } from 'material-ui/Card'
import CustomList from '../CustomList'


const mapStateToProps = (state) => {
    return {
        user: state.controlPanel.user,
        singleRooms: state.controlPanel.singleRooms,
        groupRooms: state.controlPanel.groupRooms,
        groups: state.controlPanel.groups,
    }
}

const PersonalData = ({ 
    user,
    singleRooms,
    groupRooms,
    groups,
}) => {

    const userGroups = {}
    Object.keys(groups).map((id) => {
        if (groups[id].members.hasOwnProperty(user.uid))
            userGroups[id] = groups[id].name
    })
    console.log('userGroups: ', userGroups)
    let userSingleRooms = {}
    Object.keys(singleRooms).map((id) => {
        if (singleRooms[id].members.hasOwnProperty(user.uid))
            userSingleRooms[id] = singleRooms[id].name
    })

    let userGroupRooms = {}
    Object.keys(groupRooms).map((groupRoomId) => {
        Object.keys(userGroups).map((userGroupId) => {
            if (groupRooms[groupRoomId].members.hasOwnProperty(userGroupId))
                userGroupRooms[groupRoomId] = groupRooms[groupRoomId].name
        })
    })


    return (
        <div className="infoStyle" >
            <Paper zDepth={5} style={{ display: 'flex' }} >
                <CardHeader
                    style={{ width: '50%' }}
                    className="header"
                    titleColor="white"
                    subtitleColor="white"
                    title={user.displayName}
                    subtitle={user.email}
                    avatar={user.picture}
                />
                <CardHeader
                    style={{ width: '50%' }}
                    className="header"
                    titleColor="white"
                    subtitleColor="white"
                    title={`Creation time:  ${user.creationTime}`}
                    subtitle={`Last sign in time:  ${user.lastSignInTime}`}
                />
            </Paper>
            <Divider />
            <div style={{ display: 'flex' }} >
                {console.log('userGroupRooms: ', userGroupRooms)}
                <CustomList
                    title="Single Rooms"
                    path="/room-list/"
                    iconType="single"
                    itemList={userSingleRooms}
                />
                <CustomList
                    title="Group Rooms"
                    path="/room-list/"
                    iconType="group"
                    itemList={userGroupRooms}
                />
                <CustomList 
                    title="Groups"
                    path="/group-list/"
                    iconType="group"
                    itemList={userGroups}
                />
            </div>
        </div>
    )
}

PersonalData.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
        lastSignInTime: PropTypes.string.isRequired,
    }).isRequired,
}

export default connect(mapStateToProps)(PersonalData)
