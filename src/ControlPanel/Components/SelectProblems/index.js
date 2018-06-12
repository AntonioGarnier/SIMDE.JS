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
        problems: state.controlPanel.problems,
    }
}

const SelectProblems = (props) => {
    return (
        <div style={{ display: 'flex' }} >
            {console.log('props.selectedProblems: ', props.selectedProblems,)}
            <Paper className="listStyle" >
                <List>
                    <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Problems</Subheader>
                    <Divider />
                        {
                            Object.keys(props.problems).map((id) => (
                                <ListItem
                                    key={id}
                                    disabled={props.selectedProblems.includes(id)}
                                    leftIcon={props.selectedProblems.includes(id) ? <Check/> : <Add/>}
                                    onClick={() => props.handleOnClickProblem(id)}
                                >
                                    {props.problems[id].name}
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
                    <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >Selected Problems</Subheader>
                    <Divider />
                        {
                            props.selectedProblems.length > 0
                            ? props.selectedProblems.map(id => (
                                <ListItem
                                    key={id}
                                    leftIcon={<Check/>}
                                    onClick={() => props.handleOnClickSelectedProblem(id)}
                                >
                                    {props.problems[id].name}
                                </ListItem>
                            ))
                            : null
                        }
                </List>
            </Paper>
        </div>
    )
}

SelectProblems.propTypes = {
    problems: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    selectedProblems: PropTypes.array.isRequired,
    handleOnClickSelectedProblem: PropTypes.func.isRequired,
    handleOnClickProblem: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(SelectProblems)