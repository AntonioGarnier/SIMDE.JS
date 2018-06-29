import 'firebase/firestore'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import firebase from './Components/FirebaseProvider/firebase'
import { AnonymousRoutes, LoggedRoutes, AdminRoutes } from './Routes'
import Loading from './Components/Loading'
import SnackBarMessage from './Components/SnackBarMessage'
import PopUp from './Components/PopUp'
import {
    setUser,
    checkingUser,
    checkedUser,
    changePath,
    userNotConnected,
} from './Actions'


const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setUser,
        checkingUser,
        checkedUser,
        changePath,
        userNotConnected,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.controlPanel.user,
        isLoading: state.controlPanel.isLoading
    }
}

class Panel extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.props.checkingUser()
            if (user) {
                const  adminRef = firestore.collection('admins').doc(user.uid)
                adminRef.get().then((doc) => {
                    let rol = 'student'
                    if (doc.exists)
                        rol = 'admin'
                    this.props.setUser({
                        displayName: user.providerData[0].displayName,
                        email: user.email,
                        picture: user.photoURL,
                        creationTime: user.metadata.creationTime,
                        lastSignInTime: user.metadata.lastSignInTime,
                        uid: user.uid,
                        rol,
                    })
                    this.props.checkedUser()
                }).catch(((error) => console.log('Error when checking user rol: ', error)))
            } else {
                this.props.userNotConnected()
            }
            
        })
    }

    componentDidUpdate(prevProps){
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.changePath(this.props.location.pathname)
        }
    }

    render() {
        if (this.props.isLoading)
            return <Loading />
        return (
            <div style={{ height: '100%' }} >
                {
                    this.props.user
                        ? this.props.user.rol === 'admin' ? <AdminRoutes /> : <LoggedRoutes />
                        : <AnonymousRoutes />
                }
                <SnackBarMessage/>
                <PopUp/>
            </div>
        )
    }
}

Panel.propTypes = {
    setUser: PropTypes.func.isRequired,
    checkingUser: PropTypes.func.isRequired,
    checkedUser: PropTypes.func.isRequired,
    changePath: PropTypes.func.isRequired,
    user: PropTypes.any,
}

Panel.defaultProps = {
    user: null,
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Panel)
