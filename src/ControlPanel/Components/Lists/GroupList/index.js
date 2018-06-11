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


const GroupList = (props) => {
    return (
        <div className="infoStyle" >
            <div style={{ display: 'flex' }} >
                <Paper className="listStyle" >
                    <List>
                        <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Groups</Subheader>
                        <Divider />
                            {
                                Object.keys(props.groups).map((id) => (
                                    <NavLink
                                        to={`/group-list/${id}`}
                                        style={{ textDecoration: 'none' }}
                                        key={id}
                                    >
                                        <ListItem
                                            leftIcon={<Group />}
                                        >
                                            {props.groups[id].name}
                                        </ListItem>
                                    </NavLink>
                                ))
                            }
                    </List>
                </Paper>
            </div>
        </div>
    )
}

GroupList.propTypes = {
    groups: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default GroupList
