import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import RaisedButton from 'material-ui/RaisedButton';
import CreateProblem from './CreateProblem'
import GenericList from '../GenericList'
import SelectInstances from '../SelectInstances'
import {
    updateNameProblem,
    updateInstancesProblem,
    removeProblem,
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
        updateNameProblem,
        updateInstancesProblem,
        removeProblem,
        openSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        problems: state.controlPanel.problems,
        instances: state.controlPanel.instances,
    }
}
class SettingsProblem extends React.Component {

    state = {
        slideIndex: 0,
        selectedInstances: [],
        selectedProblemToUpdateInstance: '',
        selectedProblemToUpdateName: '',
        selectedProblemToRemove: '',
        selectedName: '',
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
            selectedInstances: [],
            selectedProblemToUpdateInstance: '',
            selectedProblemToUpdateName: '',
            selectedProblemToRemove: '',
        })
    }

    handleOnClickSelectedInstance = (instanceId) => {
        this.setState({
            selectedInstances: this.state.selectedInstances.filter(id => (
                instanceId !== id
            ))
        })
    }

    handleOnClickInstance = (instanceId) => {
        this.setState({
            selectedInstances: this.state.selectedInstances.concat([instanceId])
        })
    }

    handleOnClickBackToList = () => {
        this.setState({
            selectedProblemToUpdateInstance: '',
            selectedProblemToUpdateName: '',
        })
    }

    handleOnClickBackToListFromRemove = () => {
        this.setState({
            selectedProblemToRemove: '',
        })
    }
    
    handleOnChangeName = (event, value) => {
        this.setState({
            selectedName: value,
        })
    }

    handleOnClickUpdateInstances = () => {
        let instances = {}
        this.state.selectedInstances.forEach((instance) => (
            instances[instance] = true
        ))
        this.props.updateInstancesRoom(this.state.selectedProblemToUpdateInstance, instances)
        this.props.openSnackBar('SUCCESS: Problem instances updated!', 'success')
        this.setState({
            selectedInstances: [],
        })
    }
    //ACtion: updateNameProblem, removeProblem
    handleOnClickUpdateName = () => {
        if (this.state.selectedName !== '') {
            this.props.updateNameProblem(this.state.selectedProblemToUpdateName, this.state.selectedName)
            this.props.openSnackBar('SUCCESS: Problem name updated!', 'success')
        }
        else
            this.props.openSnackBar('WARNING: Check empty name!', 'warning')
    }

    handleClickProblemToRemove = () => {
        this.handleOnClickBackToList()
        this.props.removeProblem(this.state.selectedProblemToRemove)
        this.props.openSnackBar('SUCCESS: Problem removed!', 'success')
    }

    handleClickToUpdateProblem = (id) => {
        this.setState({
            selectedProblemToUpdateInstance: id,
            selectedProblemToUpdateName: id,
        })
    }

    handleClickToRemoveProblem = (id) => {
        this.setState({
            selectedProblemToRemove: id,
        })
    }

    render() {
        return (
        <div>
            <Tabs
                inkBarStyle={{background: 'green', height: '5px' }}
                onChange={this.handleChange}
                value={this.state.slideIndex}
            >
                <Tab label="Create problem" value={0} />
                <Tab label="Update Name, Definition & Instances" value={1} />
                <Tab label="Remove problem" value={2} />
            </Tabs>
            <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange}
            >
            <div>
                <CreateProblem />
            </div>
            <div style={styles.slide}>
                {
                    this.state.selectedProblemToUpdateName === ''
                    ? (
                        <GenericList
                            generic={this.props.problems}
                            handleOnClick={this.handleClickToUpdateProblem}
                            type="problems"
                        />
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
                            <h3>Changing name of problem: </h3>
                            { this.props.problems[this.state.selectedProblemToUpdateName].name }
                            </div>
                            <TextField
                                floatingLabelText="New problem name"
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
                                    label="Update Instances"
                                    onClick={this.handleOnClickUpdateInstances}
                                />
                            </div>
                            <h3>Updating instances of room: </h3>
                            { this.props.problems[this.state.selectedProblemToUpdateInstance].name }
                            <SelectInstances
                                instances={this.props.instances}
                                selectedInstances={this.state.selectedInstances}
                                handleOnClickSelectedInstance={this.handleOnClickSelectedInstance}
                                handleOnClickInstance={this.handleOnClickInstance}
                            />
                        </div>
                    )
                }
            </div>
            <div style={styles.slide}>
                <div>
                {
                    this.state.selectedProblemToRemove === ''
                    ? (
                        <GenericList
                            generic={this.props.problems}
                            handleOnClick={this.handleClickToRemoveProblem}
                            type="problems"
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
                                    label="Remove problem"
                                    onClick={this.handleClickProblemToRemove}
                                />
                            </div>
                            <h3>Remove problem: </h3>
                            { this.props.problems[this.state.selectedProblemToRemove].name }
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

SettingsProblem.propTypes = {
    updateNameProblem: PropTypes.func.isRequired,
    updateInstancesProblem: PropTypes.func.isRequired,
    removeProblem: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
    problems: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    instances: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsProblem)