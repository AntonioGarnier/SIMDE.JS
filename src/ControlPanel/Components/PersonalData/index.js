import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'
import { CardHeader } from 'material-ui/Card'
import Remove from 'material-ui/svg-icons/content/remove'
//import './style.css'


const mapStateToProps = (state) => {
    return { user: state.user }
}

const PersonalData = ({ user }) => {
    return (
        <div className="infoStyle" >
            <Paper zDepth={5} style={{ display: 'flex' }} >
                <CardHeader
                    style={{ width: '50%' }}
                    className="header"
                    titleColor="white"
                    subtitleColor="white"
                    title={user.displayName}
                    subtitle={user.email}
                    avatar={user.picture}
                />
                <CardHeader
                    style={{ width: '50%' }}
                    className="header"
                    titleColor="white"
                    subtitleColor="white"
                    title={`Creation time:  ${user.creationTime}`}
                    subtitle={`Last sign in time:  ${user.lastSignInTime}`}
                />
            </Paper>
            <Divider />
            <div style={{ display: 'flex' }} >
                <Paper className="listStyle" >
                    <List>
                        <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Rooms</Subheader>
                        <Divider />
                        <ListItem primaryText="Room 1" leftIcon={<Remove />} />
                        <ListItem primaryText="Room 2" leftIcon={<Remove />} />
                        <ListItem primaryText="Room 3" leftIcon={<Remove />} />
                    </List>
                </Paper>
                <Paper className="listStyle" >
                    <List>
                        <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Groups</Subheader>
                        <Divider />
                        <ListItem primaryText="Group de Mañana" leftIcon={<Remove />} />
                        <ListItem primaryText="Group de Tarde" leftIcon={<Remove />} />
                        <ListItem primaryText="Group 2" leftIcon={<Remove />} />
                    </List>
                </Paper>
            </div>
        </div>
    )
}

PersonalData.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
        lastSignInTime: PropTypes.string.isRequired,
    }).isRequired,
}

export default connect(mapStateToProps)(PersonalData)
