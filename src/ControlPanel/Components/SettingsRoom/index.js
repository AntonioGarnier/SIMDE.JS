import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import RaisedButton from 'material-ui/RaisedButton';
import CreateRoom from './CreateRoom'
import GenericList from '../GenericList'
import SelectProblems from '../SelectProblems'
import {
    updateNameRoom,
    updateProblemsRoom,
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
        removeRoom,
        openSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        problems: state.controlPanel.problems,
        singleRooms: state.controlPanel.singleRooms,
        groupRooms: state.controlPanel.groupRooms,
    }
}
class SettingsRoom extends React.Component {

    state = {
        slideIndex: 0,
        selectedProblems: [],
        selectedRoomToUpdateProblem: '',
        selectedRoomToUpdateName: '',
        selectedRoomToRemove: '',
        selectedName: '',
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
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
            selectedRoomToUpdateProblem: '',
            selectedRoomToUpdateName: '',
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
        this.props.updateProblemsRoom(this.state.selectedRoomToUpdateProblem, problems)
        this.props.openSnackBar('SUCCESS: Room update problems', 'success')
        this.setState({
            selectedProblems: [],
        })
    }

    handleOnClickUpdateName = () => {
        if (this.state.selectedName !== '') {
            this.props.updateNameRoom(this.state.selectedRoomToUpdateName, this.state.selectedName)
            this.props.openSnackBar('SUCCESS: Room update name!', 'success')
        }
        else
            this.props.openSnackBar('WARNING: Check empty name!', 'warning')

    }

    handleClickRoomToRemove = () => {
        this.handleOnClickBackToList()
        this.props.removeRoom(this.state.selectedRoomToRemove)
        this.props.openSnackBar('SUCCESS: Room remove!', 'success')
    }

    handleClickToUpdateRoom = (id) => {
        console.log('id: ', id)
        this.setState({
            selectedRoomToUpdateProblem: id,
            selectedRoomToUpdateName: id,
        })
    }

    handleClickToRemoveRoom = (id) => {
        console.log('id: ', id)
        this.setState({
            selectedRoomToRemove: id,
        })
    }

    render() {
        return (
        <div>
            {console.log('SRoom: ', this.props.singleRooms)}
            {console.log('GRoom: ', this.props.groupRooms)}
            <Tabs
                inkBarStyle={{background: 'green', height: '5px' }}
                onChange={this.handleChange}
                value={this.state.slideIndex}
            >
                <Tab label="Create room" value={0} />
                <Tab label="Update Name & Problems" value={1} />
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
                    this.state.selectedRoomToUpdateName === ''
                    ? (
                        <div>
                            <GenericList
                                generic={this.props.singleRooms}
                                handleOnClick={this.handleClickToUpdateRoom}
                            />
                            <GenericList
                                generic={this.props.groupRooms}
                                handleOnClick={this.handleClickToUpdateRoom}
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
                            <h3>Changing name of room: </h3>
                            {
                                this.props.singleRooms[this.state.selectedRoomToUpdateName]
                                ? this.props.singleRooms[this.state.selectedRoomToUpdateName].name 
                                : this.props.groupRooms[this.state.selectedRoomToUpdateName].name
                            }
                            </div>
                            <TextField
                                floatingLabelText="New room name"
                                onChange={this.handleOnChangeName}
                            />
                            <div>
                                <RaisedButton
                                    style={{ marginRight: '15px' }}
                                    label="Back"
                                    onClick={this.handleOnClickBackToList}
                                />
                                <RaisedButton 
                                    primary
                                    label="Update Problems"
                                    onClick={this.handleOnClickUpdateProblems}
                                />
                            </div>
                            <h3>Updating problems of room: </h3>
                            {
                                this.props.singleRooms[this.state.selectedRoomToUpdateProblem]
                                ? this.props.singleRooms[this.state.selectedRoomToUpdateProblem].name 
                                : this.props.groupRooms[this.state.selectedRoomToUpdateProblem].name
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
                        <div>
                            <GenericList
                                generic={this.props.singleRooms}
                                handleOnClick={this.handleClickToRemoveRoom}
                            />
                            <GenericList
                                generic={this.props.groupRooms}
                                handleOnClick={this.handleClickToRemoveRoom}
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