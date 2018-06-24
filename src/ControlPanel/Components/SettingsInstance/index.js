import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import RaisedButton from 'material-ui/RaisedButton'
import CreateInstance from './CreateInstance'
import GenericList from '../GenericList'
import {
    removeInstance,
    openSnackBar,
} from '../../Actions'


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removeInstance,
        openSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        instances: state.controlPanel.instances,
        instancesOrdered: state.controlPanel.instancesOrdered,
    }
}
class SettingsInstance extends React.Component {

    state = {
        slideIndex: 0,
        selectedInstanceToRemove: '',
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
            selectedInstanceToRemove: '',
        })
    }

    handleOnClickBackToListFromRemove = () => {
        this.setState({
            selectedInstanceToRemove: '',
        })
    }

    handleClickInstanceToRemove = () => {
        this.handleOnClickBackToListFromRemove()
        this.props.removeInstance(this.state.selectedInstanceToRemove)
    }

    scrollTop = () => {
        window.scroll(0, 0)
    }

    handleClickToUpdateInstance = (id) => {
        this.setState({
            selectedInstanceToUpdate: id,
        }, this.scrollTop())
    }

    handleClickToRemoveInstance = (id) => {
        this.setState({
            selectedInstanceToRemove: id,
        }, this.scrollTop())
    }

    render() {
        return (
        <div style={{ marginTop: '20px' }} >
            <Tabs
                inkBarStyle={{background: 'green', height: '5px' }}
                onChange={this.handleChange}
                value={this.state.slideIndex}
            >
                <Tab label="Create Instance" value={0} />
                <Tab label="Remove Instance" value={1} />
            </Tabs>
            <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange}
            >
            <div>
                <CreateInstance />
            </div>
            <div style={styles.slide}>
                <div>
                {
                    this.state.selectedInstanceToRemove === ''
                    ? (
                        <GenericList
                            generic={this.props.instances}
                            genericOrdered={this.props.instancesOrdered}
                            handleOnClick={this.handleClickToRemoveInstance}
                            type="instance"
                        />
                    )
                    : (
                        <div>
                            <div>
                                <RaisedButton
                                    style={{ marginRight: '15px' }}
                                    label="Back"
                                    onClick={this.handleOnClickBackToListFromRemove}
                                />
                                <RaisedButton 
                                    primary
                                    label="Remove instance"
                                    onClick={this.handleClickInstanceToRemove}
                                />
                            </div>
                            <h3>Remove instance: </h3>
                            <pre>{this.props.instances[this.state.selectedInstanceToRemove].initial}</pre>
                            {this.props.instances[this.state.selectedInstanceToRemove].name}
                        </div>
                    )
                }
                </div>
            </div>
            </SwipeableViews>
        </div>
        )
    }
}

SettingsInstance.propTypes = {
    removeInstance: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
    instances: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    instancesOrdered: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsInstance)