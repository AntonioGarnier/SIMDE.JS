import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Person from 'material-ui/svg-icons/social/person'
import Group from 'material-ui/svg-icons/social/group'
import { List, ListItem } from 'material-ui/List'
import { NavLink } from 'react-router-dom'


const CustomList = (props) => {
    return (
        <Paper className="listStyle" >
            <List>
                <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >{props.title}</Subheader>
                <Divider />
                    {
                        Object.keys(props.itemList).map((id) => (
                            <NavLink
                                to={`${props.path}${id}`}
                                style={{ textDecoration: 'none' }}
                                key={id}
                            >
                                <ListItem
                                    leftIcon={props.iconType === 'single' ? <Person /> : <Group/>}
                                >
                                    {props.itemList[id]}
                                </ListItem>
                            </NavLink>
                        ))
                    }
            </List>
        </Paper>
    )
}


CustomList.propTypes = {
    itemList: PropTypes.shape(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
}

export default CustomList


