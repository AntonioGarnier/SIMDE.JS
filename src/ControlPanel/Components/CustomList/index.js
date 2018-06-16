import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Person from 'material-ui/svg-icons/social/person'
import Group from 'material-ui/svg-icons/social/group'
import Problem from 'material-ui/svg-icons/action/extension'
import Code from 'material-ui/svg-icons/action/code'
import GroupWork from 'material-ui/svg-icons/action/group-work'
import Error from 'material-ui/svg-icons/alert/error'
import { List, ListItem } from 'material-ui/List'
import { NavLink } from 'react-router-dom'


const CustomList = (props) => {
    const selectIcon = (type) => {
        switch (type) {
            case 'singleRoom':
                return <Person/> 
            case 'groupRoom':
                return <Group/> 
            case 'group':
                return <GroupWork/> 
            case 'problem':
                return <Problem/> 
            case 'instance':
                return <Code/> 
            default:
                return <Error/> 
        }
    }

    return (
        <Paper className="listStyle" >
            <List>
                <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >{props.title}</Subheader>
                <Divider />
                    {
                        props.orderedList.map(id => (
                            props.itemList.hasOwnProperty(id)
                                ? <NavLink
                                    to={`${props.path}${id}`}
                                    style={{ textDecoration: 'none' }}
                                    key={id}
                                >
                                    <ListItem
                                        leftIcon={selectIcon(props.iconType)}
                                    >
                                        {props.itemList[id].name}
                                    </ListItem>
                                </NavLink>
                                : null
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
    orderedList: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
}

export default CustomList


