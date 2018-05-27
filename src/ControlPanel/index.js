import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import firebase from './Components/FirebaseProvider/firebase'
import { AnonymousRoutes, LoggedRoutes } from './Routes'
import { setUser } from './Actions'



const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setUser,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return { user: state.user }
}

class Panel extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.setUser({
                    displayName: user.providerData[0].displayName,
                    email: user.email,
                    picture: user.photoURL,
                    creationTime: user.metadata.creationTime,
                    lastSignInTime: user.metadata.lastSignInTime,
                })
            }
        })
    }

    render() {
        return (
            this.props.user
                ? <LoggedRoutes />
                : <AnonymousRoutes />
        )
    }
}

Panel.propTypes = {
    setUser: PropTypes.func.isRequired,
    user: PropTypes.any,
}

Panel.defaultProps = {
    user: null,
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Panel)
