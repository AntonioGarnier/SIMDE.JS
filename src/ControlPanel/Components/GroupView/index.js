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
    /*console.log('PROPS: ', props)
    console.log('groupID: ', props.match.params.group)
    console.log('props.user.uid: ', props.user.uid)
    console.log('props.groups: ', props.groups)
    console.log('TRUE O FALSE: ', props.groups[props.match.params.group].leader === props.user.uid)*/
    // console.log('PROPS: ', props)
    if (!props.groups[props.match.params.group]) {
        props.openSnackBar('WARNING: This group does not exist or has been deleted', 'warning')
        return (
            <Redirect to="/group-list" />
        )
    }
    if (props.groups[props.match.params.group].members.hasOwnProperty(props.user.uid) /*|| props.groups[props.match.params.group].leader === props.user.uid || props.user.rol === 'admin'*/)
        return(
            <div>VISTA</div>
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