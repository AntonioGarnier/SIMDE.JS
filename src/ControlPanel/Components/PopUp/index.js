import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { debounce } from 'throttle-debounce'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {
    closePopUp,
} from '../../Actions'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closePopUp,
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
        this.props.closePopUp()
    }

    handleOnChange = debounce (
        250,
        (value) => {
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
            onClick={this.handleClose}
        />,
        ]

        return (
            <Dialog
                title={this.props.popUpData.title}
                actions={actions}
                modal
                open={this.props.popUpData.open}
            >
                <p>Insert password: </p>
                <TextField
                    floatingLabelText="Password"
                    onChange={this.handleOnChange}
                />
            </Dialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp)