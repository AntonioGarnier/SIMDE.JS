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
    }
}


const CustomList = ({
    userList,
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

    return (
        <div style={{ display: 'flex' }} >
            <Paper className="listStyle" >
                <List>
                    <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Connected Users</Subheader>
                    <Divider />
                        {
                            Object.keys(userList)
                                .filter(user => userList[user].connected && userList[user].rol === 'student')
                                .map(user => (
                                    <ListItem
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
                            Object.keys(userList)
                            .filter(user => !userList[user].connected && userList[user].rol === 'student')
                            .map(user => (
                                <ListItem
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
                            Object.keys(userList)
                            .filter(user => userList[user].rol === 'admin')
                            .map(user => (
                                <ListItem
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

CustomList.propTypes = {
    UserList: PropTypes.shape(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
            rol: PropTypes.string.isRequired,
            connected: PropTypes.bool.isRequired,
        }).isRequired,
    ).isRequired,
}

export default connect(mapStateToProps)(CustomList)


