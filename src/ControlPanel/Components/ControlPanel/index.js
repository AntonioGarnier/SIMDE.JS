import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HeaderControlPanel from '../HeaderControlPanel'
import AdminSideBar from '../Elements/AdminSideBar'


const mapStateToProps = (state) => {
    return {
        toggleSideBar: state.controlPanel.toggleSideBar,
        actualPath: state.controlPanel.actualPath,
    }
}

const ControlPanel = ({
    toggleSideBar,
    actualPath,
    children,
}) => {
    const contentStyle = {
        transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)',
        marginLeft: '0px',
        padding: '5%',
    }
    if (actualPath === '/simulator') {
        contentStyle.padding = '0%'
        contentStyle.top = '64px'
        contentStyle.position = 'relative'
    }
    if (toggleSideBar)
        contentStyle.marginLeft = '250px'
    else
        contentStyle.marginLeft = '0px'
    return (
        <div>
            <HeaderControlPanel />
            <AdminSideBar />
            <div style={contentStyle} >
                {children}
            </div>
        </div>
    )
}

ControlPanel.propTypes = {
    children: PropTypes.any.isRequired,
    toggleSideBar: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(ControlPanel)
