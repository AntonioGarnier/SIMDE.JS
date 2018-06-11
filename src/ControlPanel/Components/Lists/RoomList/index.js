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


export const RoomSingleList = (props) => {
    return (
        <Paper className="listStyle" >
            <List>
                <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Single Rooms</Subheader>
                <Divider />
                    {
                        Object.keys(props.rooms).map((id) => (
                            <NavLink
                                to={`/room-list/${id}`}
                                style={{ textDecoration: 'none' }}
                                key={id}
                            >
                                <ListItem
                                    leftIcon={<Person />}
                                >
                                    {props.rooms[id].name}
                                </ListItem>
                            </NavLink>
                        ))
                    }
            </List>
        </Paper>
    )
}

export const RoomGroupList = (props) => {
    return (
        <Paper className="listStyle" >
            <List>
                <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Group Rooms</Subheader>
                <Divider />
                    { 
                        Object.keys(props.rooms).map((id) => {
                            return            
                                <NavLink
                                    to={`/room-list/${id}`}
                                    style={{ textDecoration: 'none' }}
                                    key={id}
                                >
                                    <ListItem
                                        leftIcon={<Group />}
                                    >
                                        {props.rooms[id].name}
                                    </ListItem>
                                </NavLink>
                        })
                    }
            </List>
        </Paper>
    )
}

RoomSingleList.propTypes = {
    rooms: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

RoomGroupList.propTypes = {
    rooms: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}


