import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Paper from 'material-ui/Paper'
import CustomButton from '../Elements/CustomButton'
import { login } from '../../Actions'
//import './style.css'


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        login,
    }, dispatch)
}

const Login = (props) => {
    return (
        <div className="loginFull">
            <Paper style={{ borderRadius: '27px' }} zDepth={5} >
                <div className="loginStyle" >
                    <h1 className="title" >Bienvenido a SIMDE</h1>
                    <h1 className="title">Regístrate con Google utilizando tu cuenta institucional</h1>
                    <CustomButton
                        label="Sign in with Google"
                        backgroundColor="#e34e53"
                        colorText="white"
                        urlIcon="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        onClick={props.login}
                    />
                </div>
            </Paper>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Login)
