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
//import './style.css'


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

    const userGroups = []
    for ( var groupId in groups )
        if (groups[groupId].members.hasOwnProperty(user.uid))
            userGroups.push(groupId)

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
                <Paper className="listStyle" >
                    <List>
                        <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Single Rooms</Subheader>
                        <Divider />
                            {
                                Object.keys(singleRooms).map((id) => {
                                    if (singleRooms[id].members.hasOwnProperty(user.uid))
                                        return (
                                            <NavLink
                                                to={`/room-list/${id}`}
                                                style={{ textDecoration: 'none' }}
                                                key={id}
                                            >
                                                <ListItem
                                                    leftIcon={<Person />}
                                                >
                                                    {singleRooms[id].name}
                                                </ListItem>
                                            </NavLink>)
                                    return null
                                })
                            }
                    </List>
                </Paper>
                <Paper className="listStyle" >
                    <List>
                        <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Group Rooms</Subheader>
                        <Divider />
                            { // group room tiene un grupo cuyo miembro sea user ID?  metelo
                                Object.keys(groupRooms).map((id) => {
                                    //console.log('groupRooms[id].members: ', groupRooms[id].members)
                                    //console.log('userGroups: ', userGroups)
                                    //console.log('Include: ', Object.keys(groupRooms[id].members).includes())
                                    //userGroups.includes(groupRooms[id].members)
                                    let domGroup = null
                                    userGroups.forEach((element) => {
                                        //console.log('element: ', Object.keys(groupRooms[id].members).includes(Object.keys(element)[0]))
                                        if (Object.keys(groupRooms[id].members).includes(element))
                                            domGroup = (
                                                <NavLink
                                                    to={`/room-list/${id}`}
                                                    style={{ textDecoration: 'none' }}
                                                    key={id}
                                                >
                                                    <ListItem
                                                        leftIcon={<Group />}
                                                    >
                                                        {groupRooms[id].name}
                                                    </ListItem>
                                                </NavLink>)
                                    })
                                    return domGroup
                                })
                            }
                    </List>
                </Paper>
                <Paper className="listStyle" >
                    <List>
                        <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Groups</Subheader>
                        <Divider />
                            {
                                Object.keys(groups).map((id) => {
                                    //console.log('id: ', id)
                                    //console.log('Groups: ', groups[id].members.hasOwnProperty(user.uid))
                                    if (groups[id].members.hasOwnProperty(user.uid))
                                        return (
                                            <NavLink
                                                to={`/group-list/${id}`}
                                                style={{ textDecoration: 'none' }}
                                                key={id}
                                            >
                                                <ListItem
                                                    leftIcon={<Group />}
                                                >
                                                    {groups[id].name}
                                                </ListItem>
                                            </NavLink>)
                                    return null
                                    
                                })
                            }
                    </List>
                </Paper>
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
