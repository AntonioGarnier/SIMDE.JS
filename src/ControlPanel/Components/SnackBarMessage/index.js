import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    closeSnackBar,
} from '../../Actions'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        snackBarData: state.controlPanel.snackBarData, 
    }
}


const SnackBarMessage = (props) => {

    this.getSnackStyle = () => {
        const type = props.snackBarData ? props.snackBarData.type : ''
        switch (type) {
            case 'success':
                return { backgroundColor: '#69be8b' }
            case 'warning':
                return { backgroundColor: '#ee8137' }
            case 'error':
                return { backgroundColor: '#bf360d' }
            default: 
                return {}    
        }
    }

    return (
        <div>
            <Snackbar
                bodyStyle={this.getSnackStyle()}
                open={props.snackBarData ? props.snackBarData.open : false}
                message={props.snackBarData ? props.snackBarData.message : ''}
                autoHideDuration={4000}
                onRequestClose={props.closeSnackBar}
            />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarMessage)