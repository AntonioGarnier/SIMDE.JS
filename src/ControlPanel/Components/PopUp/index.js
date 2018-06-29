import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { debounce } from 'throttle-debounce'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {
    closePopUp,
    requestJoinFailed,
    checkGroupPassword,
    checkRoomPassword,
} from '../../Actions'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closePopUp,
        requestJoinFailed,
        checkGroupPassword,
        checkRoomPassword,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        popUpData: state.controlPanel.popUpData, 
    }
}


class PopUp extends React.Component {

    state = {
        inputPassword: '',
    }

    handleClose = () => {
        this.props.requestJoinFailed()
        this.props.closePopUp()
    }

    handleJoin = () => {
        this.props.closePopUp()
        if (this.props.popUpData.type === 'group')
            this.props.checkGroupPassword(this.props.popUpData.id, this.state.inputPassword)
        else
            this.props.checkRoomPassword(this.props.popUpData.id, this.state.inputPassword, this.props.popUpData.member)
    }

    handleOnChange = debounce (
        250,
        (event, value) => {
            this.setState({
                inputPassword: value,
            })
        }
)   

    render() {
        const actions = [
        <RaisedButton
            label="Cancel"
            onClick={this.handleClose}
        />,
        <RaisedButton
            label="Join"
            primary
            onClick={this.handleJoin}
        />,
        ]
        return (
            <Dialog
                title={`${this.props.popUpData ? this.props.popUpData.title : ''} ${this.props.popUpData ? this.props.popUpData.name : ''}`}
                actions={actions}
                modal
                open={this.props.popUpData ? this.props.popUpData.open : false}
            >
                <p>Insert password: </p>
                <TextField
                    type="password"
                    autoFocus
                    floatingLabelText="Password"
                    onChange={this.handleOnChange}
                />
            </Dialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp)