import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import { HEADER_BAR_TITLE } from '../../Constants'
import {
    logout,
    openSideBar,
} from '../../Actions'
import { ListItem } from 'material-ui/List';
//import './style.css'


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout,
        openSideBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: {
            displayName: state.controlPanel.user.displayName,
            picture: state.controlPanel.user.picture,
            rol: state.controlPanel.user.rol,
            uid: state.controlPanel.user.uid,
        },
    }
}

const HeaderControlPanel = (props) => {
    return (
        <AppBar
            title={<Link to="/" style={{ textDecoration: 'none', color: 'white' }} >{HEADER_BAR_TITLE}</Link>}
            style={{ position: 'fixed', top: '0px' }}
            showMenuIconButton
            onLeftIconButtonClick={props.openSideBar}
            iconElementRight={
                <div style={{ display: 'flex', alignItems: 'center', color: 'white' }} >
                    <ListItem
                        style={{ color: 'white' }}
                        disabled
                        leftAvatar= {
                            <Avatar style={{ marginRight: '20px' }} src={props.user.picture} />
                        }
                    >
                        {props.user.displayName}
                    </ListItem>
                    <IconButton
                        style={{ marginLeft: '20px' }}
                        onClick={() => props.logout(props.user.uid, props.user.rol)}
                    >
                        <ActionPowerSettingsNew color="white" />
                    </IconButton>
                </div>
            }
        />
    )
}

HeaderControlPanel.propTypes = {
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
    openSideBar: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderControlPanel)
