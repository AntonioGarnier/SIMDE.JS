import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import InstanceInfo from './instanceInfo'


const mapStateToProps = (state) => {
    return {
        instances: state.controlPanel.instances,
    }
}

const InstanceView = (props) => {
    if (!props.instances.hasOwnProperty(props.match.params.instance))
        return <Redirect to="/instance-list" />
    return (
        <div>
            <h1>Instance</h1>
            <InstanceInfo 
                name={props.instances[props.match.params.instance].name}
                initial={props.instances[props.match.params.instance].initial}
                final={props.instances[props.match.params.instance].final}
            />
        </div>
    )
}

InstanceView.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            instance: PropTypes.string,
        }).isRequired,
    }).isRequired,
    instances: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default connect(mapStateToProps)(InstanceView)