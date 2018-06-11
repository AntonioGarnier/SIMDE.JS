import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Check from 'material-ui/svg-icons/navigation/check'
import ArrowFordward from 'material-ui/svg-icons/navigation/arrow-forward'
import Add from 'material-ui/svg-icons/content/add'



const mapStateToProps = (state) => {
    return {
        instances: state.controlPanel.instances,
    }
}

const SelectInstances = (props) => {
    return (
        <div style={{ display: 'flex' }} >
            <Paper className="listStyle" >
                <List>
                    <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Instances</Subheader>
                    <Divider />
                        {
                            Object.keys(props.instances).map((id) => (
                                <ListItem
                                    key={id}
                                    disabled={props.selectedInstances.includes(id)}
                                    leftIcon={props.selectedInstances.includes(id) ? <Check/> : <Add/>}
                                    onClick={() => props.handleOnClickInstance(id)}
                                >
                                    {props.instances[id].name}
                                </ListItem>
                            ))
                        }
                </List>
            </Paper>
            <div>
                <ArrowFordward style={{marginTop: '63px'}} />
            </div>
            <Paper className="listStyle" >
                <List>
                    <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Selected Instances</Subheader>
                    <Divider />
                        {
                            props.selectedInstances.length > 0
                            ? props.selectedInstances.map(id => (
                                <ListItem
                                    key={id}
                                    leftIcon={<Check/>}
                                    onClick={() => props.handleOnClickSelectedProblem(id)}
                                >
                                    {props.instances[id].name}
                                </ListItem>
                            ))
                            : null
                        }
                </List>
            </Paper>
        </div>
    )
}

SelectInstances.propTypes = {
    instances: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    selectedInstances: PropTypes.array.isRequired,
    handleOnClickSelectedInstance: PropTypes.func.isRequired,
    handleOnClickInstance: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(SelectInstances)