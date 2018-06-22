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
import GroupInfo from './groupInfo'


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
        groups: state.controlPanel.groups,
        groupsOrdered: state.controlPanel.groupsOrdered,
    }
}

const GroupView = (props) => {
    if (!props.groups[props.match.params.group]) {
        props.openSnackBar('WARNING: This group does not exist or has been deleted', 'warning')
        return (
            <Redirect to="/group-list" />
        )
    }
    if (props.groups[props.match.params.group].members.hasOwnProperty(props.user.uid) || props.groups[props.match.params.group].leader === props.user.uid || props.user.rol === 'admin')
        return(
            <GroupInfo 
                groupName={props.groups[props.match.params.group].name}
                leader={props.groups[props.match.params.group].leader}
                members={Object.keys(props.groups[props.match.params.group].members)}
                groupId={props.match.params.group}
            />
        )
    if (!props.shouldRedirect) {
        props.openPopUp('Request join group', 'group', props.match.params.group, props.groups[props.match.params.group].name)
        return <Loading />
    }
    if (props.shouldRedirect) {
        return <Redirect to="/group-list" />
    }
}

GroupView.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            group: PropTypes.string,
        }).isRequired,
    }).isRequired,
    openSnackBar: PropTypes.func.isRequired,
    openPopUp: PropTypes.func.isRequired,
    shouldRedirect: PropTypes.bool.isRequired,
    groups: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    groupsOrdered: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupView)