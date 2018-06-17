import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Loading from '../Loading'
import {
    openSnackBar,
    openPopUp,
} from '../../Actions'
import RoomInfo from './roomInfo'


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openSnackBar,
        openPopUp,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.controlPanel.user,
        shouldRedirect: state.controlPanel.shouldRedirect,
        singleRooms: state.controlPanel.singleRooms,
        groupRooms: state.controlPanel.groupRooms,
        userGroups: state.controlPanel.userGroups,
        activeGroup: state.controlPanel.activeGroup,
    }
}

const RoomsView = (props) => {
    if (!props.singleRooms[props.match.params.room] && !props.groupRooms[props.match.params.room]) {
        props.openSnackBar('WARNING: This room does not exist or has been deleted', 'warning')
        return (
            <Redirect to="/room-list" />
        )
    }
    const room = props.singleRooms[props.match.params.room]
        ? props.singleRooms[props.match.params.room]
        : props.groupRooms[props.match.params.room]


    console.log('room: ', room)
    console.log('userGroups: ', props.userGroups)
    if (room.type === 'single') {
    if (room.members.hasOwnProperty(props.user.uid)/* || props.user.rol === 'admin'*/)
        return(
            <RoomInfo 
            
            
            />
        )
        if (!props.shouldRedirect) {
            props.openPopUp('Request join room', 'room', props.match.params.room, room.name, props.user.uid)
            return <Loading />
        }
        if (props.shouldRedirect) {
            return <Redirect to="/room-list" />
        }
    }
    else if (room.type === 'group') {
        let members = Object.keys(room.members)
        let isMember = props.userGroups.some((currentValue) => (
            members.includes(currentValue)
        ))
        if (isMember /*|| props.user.rol === 'admin'*/)
            return(
                <div>VISTA GROUP</div>
            )
        if (props.activeGroup.length < 1) {
            props.openSnackBar('WARNING: You do not have an active group', 'warning')
            return <Redirect to="/room-list" />
        }
        if (!props.shouldRedirect) {
            props.openPopUp('Request join room', 'room', props.match.params.room, room.name, props.activeGroup)
            return <Loading />
        }
        if (props.shouldRedirect) {
            return <Redirect to="/room-list" />
        }
    }
}

RoomsView.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            room: PropTypes.string,
        }).isRequired,
    }).isRequired,
    openSnackBar: PropTypes.func.isRequired,
    openPopUp: PropTypes.func.isRequired,
    shouldRedirect: PropTypes.bool.isRequired,
    singleRooms: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    groupRooms: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    activeGroup: PropTypes.string.isRequired,
    userGroups: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsView)