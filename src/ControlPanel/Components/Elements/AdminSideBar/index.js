import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { NavLink, withRouter } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import { Menu, MenuItem } from 'material-ui/Menu'
import { closeSideBar } from '../../../Actions'
import { sideBarElements, sideBarElementsAdmin } from './SideBarElements'
//import './style.css'


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeSideBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        toggleSideBar: state.controlPanel.toggleSideBar,
        userRol: state.controlPanel.user.rol,
    }
}

const AdminSideBar = (props) => {

    let sideBar = sideBarElements
    if (props.userRol === 'admin')
        sideBar = sideBarElementsAdmin

    return (
        <Drawer
            open={props.toggleSideBar}
            zDepth={0}
            docked
        >
            <AppBar
                title="Options"
                showMenuIconButton
                onLeftIconButtonClick={props.closeSideBar}
                style={{ height: '64px' }}
            />
            <Menu>
                { 
                    sideBar
                        .map((element) => {
                            return (
                                <NavLink
                                    to={element.to}
                                    style={{ textDecoration: 'none' }}
                                    activeClassName="activeMenuItem"
                                    key={element.name}
                                >
                                    <MenuItem
                                        leftIcon={element.leftIcon}
                                    >
                                        {element.name}
                                    </MenuItem>
                                </NavLink>
                            )
                        })
                }
            </Menu>
        </Drawer>
    )
}

AdminSideBar.propTypes = {
    toggleSideBar: PropTypes.bool.isRequired,
    userRol: PropTypes.string.isRequired,
    closeSideBar: PropTypes.func.isRequired,
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(AdminSideBar)

