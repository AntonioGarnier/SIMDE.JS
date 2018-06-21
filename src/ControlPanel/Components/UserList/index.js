import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import Person from 'material-ui/svg-icons/social/person'
import PersonOut from 'material-ui/svg-icons/social/person-outline'
import Build from 'material-ui/svg-icons/action/build'
import Error from 'material-ui/svg-icons/alert/error'
import { List, ListItem } from 'material-ui/List'

const mapStateToProps = (state) => {
    return {
        userList: state.controlPanel.userList,
        userListOrdered: state.controlPanel.userListOrdered,
    }
}


const UserList = ({
    userList,
    userListOrdered
}) => {

    const selectIcon = (type) => {
        switch (type) { 
            case 'userOn':
                return <Person/> 
            case 'userOff':
                return <PersonOut/> 
            case 'admin':
                return <Build/> 
            default:
                return <Error/> 
        }
    }
    const connectedUsers = userListOrdered.filter((id) => userList[id].connected && userList[id].rol === 'student')
    const disconnectedUsers = userListOrdered.filter((id) => !userList[id].connected && userList[id].rol === 'student')
    const adminUsers = userListOrdered.filter((id) => userList[id].rol === 'admin')

    return (
        <div style={{ display: 'flex' }} >
            <Paper className="listStyle" >
                <List>
                    <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Connected Users</Subheader>
                    <Divider />
                        {
                            connectedUsers
                                .map(user => (
                                    <ListItem
                                        disabled
                                        key={user}
                                        leftAvatar={<Avatar src={userList[user].picture} />}
                                        rightIcon={selectIcon('userOn')}
                                    >
                                        {userList[user].name}
                                    </ListItem>
                                ))
                        }
                </List>
            </Paper>
            <Paper className="listStyle" >
                <List>
                    <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Disconnected Users</Subheader>
                    <Divider />
                        {
                            disconnectedUsers
                                .map(user => (
                                    <ListItem
                                        disabled
                                        key={user}
                                        leftAvatar={<Avatar src={userList[user].picture} />}
                                        rightIcon={selectIcon('userOff')}
                                    >
                                        {userList[user].name}
                                    </ListItem>
                                ))
                        }
                </List>
            </Paper>
            <Paper className="listStyle" >
                <List>
                    <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Admins</Subheader>
                    <Divider />
                        {
                            adminUsers
                                .map(user => (
                                    <ListItem
                                        disabled
                                        key={user}
                                        leftAvatar={<Avatar src={userList[user].picture} />}
                                        rightIcon={selectIcon('admin')}
                                    >
                                        {userList[user].name}
                                    </ListItem>
                                ))
                        }
                </List>
            </Paper>
        </div>
    )
}

UserList.propTypes = {
    userList: PropTypes.shape(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
            rol: PropTypes.string.isRequired,
            connected: PropTypes.bool.isRequired,
        }).isRequired,
    ).isRequired,
    userListOrdered: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(UserList)


