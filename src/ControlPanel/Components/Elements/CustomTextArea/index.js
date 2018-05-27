import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import './style.css'


class CustomTextArea extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        readOnly: PropTypes.bool,
    }

    state = {
        value: this.props.text,
    }

    handleOnChange = (value) => {
        this.setState({
            value,
        })
    }

    render() {
        return (
            <textarea
                className="textAreaStyle"
                readOnly={this.props.readOnly}
                value={this.state.value}
                onChange={this.handleOnChange}
            />
        )
    }
}

CustomTextArea.defaultProps = {
    readOnly: false,
}

export default CustomTextArea
