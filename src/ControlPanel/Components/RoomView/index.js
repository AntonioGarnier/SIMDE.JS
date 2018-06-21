import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import Loading from '../Loading'
import {
    openSnackBar,
    openPopUp,
    getMembers,
    getProblems,
} from '../../Actions'
import RoomInfo from './roomInfo'


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openSnackBar,
        openPopUp,
        getMembers,
        getProblems,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.controlPanel.user,
        userList: state.controlPanel.userList,
        shouldRedirect: state.controlPanel.shouldRedirect,
        singleRooms: state.controlPanel.singleRooms,
        groupRooms: state.controlPanel.groupRooms,
        groups: state.controlPanel.groups,
        problems: state.controlPanel.problems,
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


    if (room.type === 'single') {
        if (room.members.hasOwnProperty(props.user.uid)/* || props.user.rol === 'admin'*/) {
            const hasAllMembers = Object.keys(room.members).every(member => props.userList[member])
            const hasAllProblems = Object.keys(room.problems).every(problem => props.problems.hasOwnProperty(problem))
            if (!hasAllMembers || !hasAllProblems) {
                if (!hasAllMembers)
                    props.getMembers(Object.keys(room.members))
                if (!hasAllProblems)
                    props.getProblems(Object.keys(room.problems))
            }
            if (hasAllMembers && hasAllProblems)
                return(
                    <RoomInfo 
                        roomName={room.name}
                        roomType={room.type}
                        roomId={props.match.params.room}
                        problemsId={Object.keys(room.problems)}
                        members={Object.keys(room.members)}
                    />
                )
            return <Loading />
        }
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
        if (isMember /*|| props.user.rol === 'admin'*/) {
            // Para cada lider de cada grupo se tiene que cumplir que todos los lideres esten en userList
            const hasAllMembers = Object.keys(room.members).every(member => props.userList[props.groups[member].leader])
            const hasAllProblems = Object.keys(room.problems).every(problem => props.problems.hasOwnProperty(problem))
            if (!hasAllMembers || !hasAllProblems) {
                if (!hasAllMembers) {
                    let leaders = Object.keys(room.members).map(member => props.groups[member].leader)
                    props.getMembers(leaders)
                }
                if (!hasAllProblems)
                    props.getProblems(Object.keys(room.problems))
            }
            if (hasAllMembers && hasAllProblems)
                return(
                    <RoomInfo 
                        roomName={room.name}
                        roomType={room.type}
                        roomId={props.match.params.room}
                        problemsId={Object.keys(room.problems)}
                        members={Object.keys(room.members)}
                    />
                )
                return <Loading />
        }
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
    groups: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    problems: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    activeGroup: PropTypes.string.isRequired,
    userGroups: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsView)