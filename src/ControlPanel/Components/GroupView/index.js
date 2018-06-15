import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton'
import GenericList from '../GenericList'
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
        groups: state.controlPanel.groups,
        groupsOrdered: state.controlPanel.groupsOrdered,
    }
}

const GroupView = (props) => {
    console.log('PROPS: ', props)
    console.log('groupID: ', props.match.params.group)
    console.log('props.user.uid: ', props.user.uid)
    console.log('props.groups: ', props.groups)
    console.log('TRUE O FALSE: ', props.groups[props.match.params.group].leader === props.user.uid)
    if (props.groups[props.match.params.group]) {
        if (props.groups[props.match.params.group].members.hasOwnProperty(props.user.uid) || props.groups[props.match.params.group].leader === props.user.uid)
            return(
                <div>VISTA</div>
            )
        else {
            props.openPopUp('Request join group')
            return <Loading />
        }
            


    }
    else {
        props.openSnackBar('This group does not exist or has been deleted', 'warning')
        return (
            <Redirect to="/group-list" />
        )
    }
    
}

GroupView.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            group: PropTypes.string,
        }).isRequired,
    }).isRequired,
    openSnackBar: PropTypes.func.isRequired,
    groups: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    groupsOrdered: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupView)