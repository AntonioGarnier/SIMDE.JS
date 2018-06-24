import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import RaisedButton from 'material-ui/RaisedButton'
import CreateGroup from './CreateGroup'
import GenericList from '../GenericList'
import {
    removeGroup,
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
        removeGroup,
        openSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        groups: state.controlPanel.groups,
        groupsOrdered: state.controlPanel.groupsOrdered,
    }
}
class SettingsGroup extends React.Component {

    state = {
        slideIndex: 0,
        selectedGroupToRemove: '',
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
            selectedGroupToRemove: '',
        })
    }

    handleOnClickBackToListFromRemove = () => {
        this.setState({
            selectedGroupToRemove: '',
        })
    }

    handleClickGroupToRemove = () => {
        this.handleOnClickBackToListFromRemove()
        this.props.removeGroup(this.state.selectedGroupToRemove, this.props.groups[this.state.selectedGroupToRemove].leader)
    }

    scrollTop = () => {
        window.scroll(0, 0)
    }

    handleClickToUpdateGroup = (id) => {
        this.setState({
            selectedGroupToUpdate: id,
        }, this.scrollTop())
    }

    handleClickToRemoveGroup = (id) => {
        this.setState({
            selectedGroupToRemove: id,
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
                <Tab label="Create Group" value={0} />
                <Tab label="Remove Group" value={1} />
            </Tabs>
            <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange}
            >
            <div>
                <CreateGroup />
            </div>
            <div style={styles.slide}>
                <div>
                {
                    this.state.selectedGroupToRemove === ''
                    ? (
                        <GenericList
                            generic={this.props.groups}
                            genericOrdered={this.props.groupsOrdered}
                            handleOnClick={this.handleClickToRemoveGroup}
                            type="group"
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
                                    label="Remove group"
                                    onClick={this.handleClickGroupToRemove}
                                />
                            </div>
                            <h3>Remove group: </h3>
                            { this.props.groups[this.state.selectedGroupToRemove].name }
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

SettingsGroup.propTypes = {
    removeGroup: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
    groups: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    groupsOrdered: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsGroup)