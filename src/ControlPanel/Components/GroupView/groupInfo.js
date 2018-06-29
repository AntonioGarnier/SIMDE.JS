import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Exit from 'material-ui/svg-icons/action/exit-to-app'
import Loading from '../Loading'
import {
    openSnackBar,
    openPopUp,
    getMembers,
    leaveGroup,
} from '../../Actions'


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openSnackBar,
        openPopUp,
        getMembers,
        leaveGroup,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        userList: state.controlPanel.userList,
        groups: state.controlPanel.groups,
    }
}

const GroupInfo = ({
    userList,
    groups,
    leader,
    members,
    getMembers,
    groupName,
    groupId,
    leaveGroup,
}) => {

    const handleClickLeaveButton = () => {
        leaveGroup(groupId, groups[groupId].leader)
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center'}} >
                <h1>{groupName}</h1>
                <IconButton
                    style={{ width: '48px', height: '48px', padding: '12px', marginTop: '11px' }}
                    iconStyle={{ width: '24px', height: '24px' }}
                    tooltip="Leave Group"
                    tooltipPosition="bottom-right"
                    touch
                    onClick={handleClickLeaveButton}
                >
                    <Exit />
                </IconButton>
            </div>
            {
                userList[leader]
                ? <Paper zDepth={5} style={{ display: 'flex', width: '25%', marginBottom: '30px' }} >
                    <CardHeader
                        style={{ width: '100%' }}
                        className="header"
                        titleColor="white"
                        subtitleColor="white"
                        title={userList[leader].name}
                        subtitle={`Leader - Rol: ${userList[leader].rol}`}
                        avatar={userList[leader].picture}
                    />
                </Paper>
                : getMembers([leader]) && <Loading />
            }
            {
                members.every((member) => userList[member])
                ? <Paper zDepth={5} style={{ display: 'flex', width: '25%', justifyContent: 'center' }} >
                    {
                        members.length > 0
                        ? members.map(member => (
                            <CardHeader
                                key={member}
                                style={{ width: '100%' }}
                                className="sub-header"
                                titleColor="white"
                                subtitleColor="white"
                                title={userList[member].name}
                                subtitle={`Member - Rol: ${userList[member].rol}`}
                                avatar={userList[member].picture}
                            />
                        ))
                        : <h3>No members yet</h3>
                    }
                </Paper>
                : getMembers(members) && <Loading />
            }
        </div>
    )
}

GroupInfo.propTypes = {
    groupName: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
    leader: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    leaveGroup: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo)