import React from 'react'
import { connect } from 'react-redux'
import { debounce } from 'throttle-debounce'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField/TextField'
import CreateProblem from './CreateProblem'
import GenericList from '../GenericList'
import SelectInstances from '../SelectInstances'
import {
    updateNameProblem,
    updateInstancesProblem,
    updateDefinitionProblem,
    removeProblem,
    openSnackBar,
} from '../../Actions'
import RichEditor from '../RichEditor'


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
        updateDefinitionProblem,
        removeProblem,
        openSnackBar,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        problems: state.controlPanel.problems,
        instances: state.controlPanel.instances,
        problemsOrdered: state.controlPanel.problemsOrdered,
        instancesOrdered: state.controlPanel.instancesOrdered,
    }
}
class SettingsProblem extends React.Component {

    state = {
        slideIndex: 0,
        selectedInstances: [],
        selectedProblemToUpdate: '',
        selectedProblemToRemove: '',
        selectedName: '',
        problemDefinition: '',
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
            selectedInstances: [],
            selectedProblemToUpdate: '',
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
            selectedProblemToUpdate: '',
        })
    }

    handleOnClickBackToListFromRemove = () => {
        this.setState({
            selectedProblemToRemove: '',
        })
    }
    
    handleChangeEditorContent = debounce (
        300,
        (value) => {
            this.setState({
                problemDefinition: value,
            })
        }
    )

    handleOnChangeName = debounce (
        300,
        (event, value) => {
            this.setState({
                selectedName: value,
            })
        }
    )

    handleOnClickUpdateInstances = () => {
        let instances = {}
        this.state.selectedInstances.forEach((instance) => (
            instances[instance] = true
        ))
        if (Object.keys(instances).length > 0) {
            this.props.updateInstancesRoom(this.state.selectedProblemToUpdate, instances)
            this.setState({
                selectedInstances: [],
            })
        } else
            this.props.openSnackBar('WARNING: You have not selected any instance', 'warning')
    }

    handleOnClickUpdateName = () => {
        if (this.state.selectedName.length > 3) {
            this.props.updateNameProblem(this.state.selectedProblemToUpdate, this.state.selectedName)
        }
        else
            this.props.openSnackBar('WARNING: Check empty name! (length > 3)', 'warning')
    }

    handleOnClickUpdateDefinition = () => {
        if (this.state.problemDefinition.length > 3)
            this.props.updateDefinitionProblem(this.state.selectedProblemToUpdate, this.state.problemDefinition)
        else
            this.props.openSnackBar('WARNING: Check empty definition! (length > 3)', 'warning')
    }

    handleClickProblemToRemove = () => {
        this.handleOnClickBackToListFromRemove()
        this.props.removeProblem(this.state.selectedProblemToRemove)
    }

    scrollTop = () => {
        window.scroll(0, 0)
    }

    handleClickToUpdateProblem = (id) => {
        this.setState({
            selectedProblemToUpdate: id,
        }, this.scrollTop())
    }

    handleClickToRemoveProblem = (id) => {
        this.setState({
            selectedProblemToRemove: id,
        }, this.scrollTop())
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
                    this.state.selectedProblemToUpdate === ''
                    ? (
                        <GenericList
                            generic={this.props.problems}
                            genericOrdered={this.props.problemsOrdered}
                            handleOnClick={this.handleClickToUpdateProblem}
                            type="problem"
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
                            <h3>Change name: </h3>
                            { this.props.problems[this.state.selectedProblemToUpdate].name }
                            </div>
                            <TextField
                                floatingLabelText="New problem name"
                                onChange={this.handleOnChangeName}
                            />
                            <div>
                                <RaisedButton 
                                    primary
                                    label="Update Definition"
                                    onClick={this.handleOnClickUpdateDefinition}
                                />
                            </div>
                            <h3>Update definition: </h3>
                            <RichEditor
                                content={this.state.problemDefinition}
                                handleChange={this.handleChangeEditorContent}
                            />
                            <Divider style={{ backgroundColor: 'white', height: '30px' }} />
                            <div>
                                <RaisedButton 
                                    primary
                                    label="Update Instances"
                                    onClick={this.handleOnClickUpdateInstances}
                                />
                            </div>
                            <h3>Update instances: </h3>
                            { this.props.problems[this.state.selectedProblemToUpdate].name }
                            <SelectInstances
                                instances={this.props.instancesOrdered}
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
                            genericOrdered={this.props.problemsOrdered}
                            handleOnClick={this.handleClickToRemoveProblem}
                            type="problem"
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