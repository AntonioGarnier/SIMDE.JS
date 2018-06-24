import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import Person from 'material-ui/svg-icons/social/person'
import PersonOut from 'material-ui/svg-icons/social/person-outline'
import PeopleOut from 'material-ui/svg-icons/social/people-outline'
import Group from 'material-ui/svg-icons/social/group'
import Problem from 'material-ui/svg-icons/action/extension'
import Code from 'material-ui/svg-icons/action/code'
import GroupWork from 'material-ui/svg-icons/action/group-work'
import Error from 'material-ui/svg-icons/alert/error'
import CheckBoxIn from 'material-ui/svg-icons/toggle/check-box'
import CheckBoxOut from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import { List, ListItem } from 'material-ui/List'
import { NavLink } from 'react-router-dom'
import {
    openSnackBar,
    changeActiveGroup,
} from '../../Actions'

const mapStateToProps = (state) => {
    return {
        activeGroup: state.controlPanel.activeGroup,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openSnackBar,
        changeActiveGroup,
    }, dispatch)
}


const CustomList = (props) => {

    const handleChangeActive = (id) => {
        props.changeActiveGroup(id)
    }

    const selectIcon = (type, list, id) => {
        if (type === 'singleRoom')
         if (!list[id].visibility)
            return <PersonOut />
        if (type === 'groupRoom')
         if (!list[id].visibility)
            return <PeopleOut />

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
        <Paper style={{ marginTop: '50px', width: '100%' }} >
            <List>
                <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >{props.title}</Subheader>
                <Divider />
                    {
                        props.orderedList.map(id => (
                            props.itemList.hasOwnProperty(id)
                                ? <div style={{ display: 'flex' }} key={`${id}div`} >
                                        <NavLink
                                            to={`${props.path}${id}`}
                                            style={{ textDecoration: 'none', width: '100%'}}
                                            key={`${id}`}
                                        >
                                            <ListItem
                                                leftIcon={selectIcon(props.iconType, props.itemList, id)}
                                            >
                                                {props.itemList[id].name}
                                            </ListItem>
                                        </NavLink>
                                        {
                                            props.active
                                                ? <IconButton
                                                    key={`${id}icon`}
                                                    onClick={() => handleChangeActive(id)}
                                                >
                                                    {props.activeGroup === id ? <CheckBoxIn /> : <CheckBoxOut />}
                                                </IconButton>
                                                : null
                                        }
                                </div>
                                : null
                        ))
                    }
            </List>
        </Paper>
    )
}

CustomList.defaultProps = {
    active: false,
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
    active: PropTypes.bool,
    changeActiveGroup: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomList)


