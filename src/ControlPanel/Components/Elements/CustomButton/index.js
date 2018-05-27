import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import './style.css'


class CustomButton extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string,
        colorText: PropTypes.string,
        urlIcon: PropTypes.string,
        onClick: PropTypes.func.isRequired,
    }

    state = {}

    render() {
        return (
            <button
                className="buttonStyle"
                type="button"
                style={{ color: this.props.colorText, backgroundColor: this.props.backgroundColor }}
                onClick={this.props.onClick}
            >
                <span className="imageStyle" >
                    <img
                        src={this.props.urlIcon}
                        alt="google icon"
                        style={{ width: '20px', height: '20px' }}
                    />
                </span>
                <span>
                    {this.props.label}
                </span>
            </button>
        )
    }
}

CustomButton.defaultProps = {
    backgroundColor: ['buttonStyle']['background-color'],
    colorText: ['buttonStyle'].color,
    urlIcon: null,
}

export default CustomButton
