import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import firebase from './Components/FirebaseProvider/firebase'
import { AnonymousRoutes, LoggedRoutes } from './Routes'
import Loading from './Components/Loading'
import {
    setUser,
    checkingUser,
    checkedUser,
} from './Actions'



const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setUser,
        checkingUser,
        checkedUser,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        isLoading: state.isLoading
    }
}

class Panel extends Component {
    componentDidMount() {
        this.props.checkingUser()
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
            this.props.checkedUser()
        })
    }

    render() {
        if (this.props.isLoading)
            return <Loading />
        console.log('********', this.props.user)
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
