import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import CreateRoom from './CreateRoom'
import GenericList from '../GenericList'
import SelectProblems from '../SelectProblems'
import {
    updateNameRoom,
    updateProblemsRoom,
    updateVisibilityRoom,
    removeRoom,
    openSnackBar,
} from '../../Actions'
import TextField from 'material-ui/TextField/TextField';

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
        updateNameRoom,
        updateProblemsRoom,
        updateVisibilityRoom,
        removeRoom,
        openSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        problems: state.controlPanel.problems,
        singleRooms: state.controlPanel.singleRooms,
        groupRooms: state.controlPanel.groupRooms,
        roomsOrdered: state.controlPanel.roomsOrdered,
        problemsOrdered: state.controlPanel.problemsOrdered,
    }
}
class SettingsRoom extends React.Component {

    state = {
        slideIndex: 0,
        selectedProblems: [],
        selectedRoomToUpdate: '',
        selectedRoomToRemove: '',
        selectedName: '',
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
            selectedRoomToUpdate: '',
            selectedRoomToRemove: '',
        })
    }

    handleOnClickSelectedProblem = (problemId) => {
        this.setState({
            selectedProblems: this.state.selectedProblems.filter(id => (
                problemId !== id
            ))
        })
    }

    handleOnClickProblem = (problemId) => {
        this.setState({
            selectedProblems: this.state.selectedProblems.concat([problemId])
        })
    }

    handleOnClickBackToList = () => {
        this.setState({
            selectedRoomToUpdate: '',
        })
    }

    handleOnClickBackToListFromRemove = () => {
        this.setState({
            selectedRoomToRemove: '',
        })
    }
    
    handleOnChangeName = (event, value) => {
        this.setState({
            selectedName: value,
        })
    }

    handleOnClickUpdateProblems = () => {
        let problems = {}
        this.state.selectedProblems.forEach((problem) => (
            problems[problem] = true
        ))
        if (Object.keys(problems).length > 0) {
            this.props.updateProblemsRoom(this.state.selectedRoomToUpdate, problems)
            this.setState({
                selectedProblems: [],
            })
        } else 
            this.props.openSnackBar('WARNING: You have not selected any problem', 'warning')
    }

    handleOnClickUpdateName = () => {
        if (this.state.selectedName.length > 3)
            this.props.updateNameRoom(this.state.selectedRoomToUpdate, this.state.selectedName)
        else
            this.props.openSnackBar('WARNING: Check name length (> 3) !', 'warning')

    }

    handleClickRoomToRemove = () => {
        this.handleOnClickBackToListFromRemove()
        this.props.removeRoom(this.state.selectedRoomToRemove)
    }

    scrollTop = () => {
        window.scroll(0, 0)
    }

    handleClickToUpdateRoom = (id) => {
        this.setState({
            selectedRoomToUpdate: id,
        }, this.scrollTop())
    }

    handleClickToRemoveRoom = (id) => {
        this.setState({
            selectedRoomToRemove: id,
        }, this.scrollTop())
    }

    handleOnToggleVisibility = (event, value) => {
        let type = this.props.singleRooms[this.state.selectedRoomToUpdate]
            ? `${this.props.singleRooms[this.state.selectedRoomToUpdate].type}Rooms`
            : `${this.props.groupRooms[this.state.selectedRoomToUpdate].type}Rooms`
        if (value !== this.props[type][this.state.selectedRoomToUpdate])
            this.props.updateVisibilityRoom(this.state.selectedRoomToUpdate, value)
    }
    

    render() {
        return (
        <div>
            <Tabs
                inkBarStyle={{background: 'green', height: '5px' }}
                onChange={this.handleChange}
                value={this.state.slideIndex}
            >
                <Tab label="Create room" value={0} />
                <Tab label="Update Name, Problems & Visibility" value={1} />
                <Tab label="Remove room" value={2} />
            </Tabs>
            <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange}
            >
            <div>
                <CreateRoom />
            </div>
            <div style={styles.slide}>
                {
                    this.state.selectedRoomToUpdate === ''
                    ? (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                            <GenericList
                                generic={this.props.singleRooms}
                                genericOrdered={this.props.roomsOrdered}
                                handleOnClick={this.handleClickToUpdateRoom}
                                type="singleRoom"
                            />
                            <GenericList
                                generic={this.props.groupRooms}
                                genericOrdered={this.props.roomsOrdered}
                                handleOnClick={this.handleClickToUpdateRoom}
                                type="groupRoom"
                            />
                        </div>
                    )
                    : (
                        <div>
                            <div>
                                <RaisedButton 
                                    style={{ marginRight: '15px' }}
                                    label="Back"
                                    onClick={this.handleOnClickBackToList}
                                />
                                <RaisedButton
                                    primary
                                    label="Update Name"
                                    onClick={this.handleOnClickUpdateName}
                                />
                            <h3>Change name: </h3>
                            {
                                this.props.singleRooms[this.state.selectedRoomToUpdate]
                                ? this.props.singleRooms[this.state.selectedRoomToUpdate].name 
                                : this.props.groupRooms[this.state.selectedRoomToUpdate].name
                            }
                            </div>
                            <TextField
                                floatingLabelText="New room name"
                                onChange={this.handleOnChangeName}
                            />
                            <Divider style={{ backgroundColor: 'white', height: '35px' }} />
                            <h3>Change visibility: </h3>
                            <Toggle
                                style={{ maxWidth: '250px' }}
                                toggled={
                                    this.props.singleRooms[this.state.selectedRoomToUpdate]
                                        ? this.props.singleRooms[this.state.selectedRoomToUpdate].visibility
                                        : this.props.groupRooms[this.state.selectedRoomToUpdate].visibility
                                }
                                label="Visibility"
                                onToggle={this.handleOnToggleVisibility}
                            />
                            <Divider style={{ backgroundColor: 'white', height: '35px' }}/>
                            <div>
                                <RaisedButton 
                                    primary
                                    label="Update Problems"
                                    onClick={this.handleOnClickUpdateProblems}
                                />
                            </div>
                            <h3>Update problems: </h3>
                            {
                                this.props.singleRooms[this.state.selectedRoomToUpdate]
                                ? this.props.singleRooms[this.state.selectedRoomToUpdate].name 
                                : this.props.groupRooms[this.state.selectedRoomToUpdate].name
                            }
                            <SelectProblems
                                problems={this.props.problems}
                                selectedProblems={this.state.selectedProblems}
                                handleOnClickSelectedProblem={this.handleOnClickSelectedProblem}
                                handleOnClickProblem={this.handleOnClickProblem}
                            />
                        </div>
                    )
                }
            </div>
            <div style={styles.slide}>
                <div>
                {
                    this.state.selectedRoomToRemove === ''
                    ? (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                            <GenericList
                                generic={this.props.singleRooms}
                                genericOrdered={this.props.roomsOrdered}
                                handleOnClick={this.handleClickToRemoveRoom}
                                type="singleRoom"
                            />
                            <GenericList
                                generic={this.props.groupRooms}
                                genericOrdered={this.props.roomsOrdered}
                                handleOnClick={this.handleClickToRemoveRoom}
                                type="groupRoom"
                            />
                        </div>
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
                                    label="Remove room"
                                    onClick={this.handleClickRoomToRemove}
                                />
                            </div>
                            <h3>Remove room: </h3>
                            {
                                this.props.singleRooms[this.state.selectedRoomToRemove]
                                ? this.props.singleRooms[this.state.selectedRoomToRemove].name 
                                : this.props.groupRooms[this.state.selectedRoomToRemove].name
                            }
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

SettingsRoom.propTypes = {
    updateNameRoom: PropTypes.func.isRequired,
    updateProblemsRoom: PropTypes.func.isRequired,
    removeRoom: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
    problems: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    singleRooms: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    groupRooms: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsRoom)