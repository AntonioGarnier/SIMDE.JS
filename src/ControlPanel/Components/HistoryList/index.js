import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import Desktop from 'material-ui/svg-icons/hardware/desktop-windows'
import Problem from 'material-ui/svg-icons/action/extension'
import {
    openSnackBar,
} from '../../Actions'

const mapStateToProps = (state) => { 
    return {
        singleRooms: state.controlPanel.singleRooms,
        groupRooms: state.controlPanel.groupRooms,
        history: state.controlPanel.history,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openSnackBar,
    }, dispatch)
}

const HistoryList = ({
    history,
    singleRooms,
    groupRooms,
    openSnackBar,
}) => { 
    return (
        <Paper className="listStyle" >
            <List>
                <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >History</Subheader>
                <Divider />
                {
                    Object.keys(history).map(room => (
                        <ListItem
                            key={room}
                            primaryText={history[room][Object.keys(history[room])[0]].room}
                            leftIcon={<Desktop />}
                            initiallyOpen={false}
                            primaryTogglesNestedList={true}
                            nestedItems={
                                Object.keys(history[room]).map(problem => (
                                    <ListItem
                                        key={problem}
                                        primaryText={history[room][problem].problem}
                                        leftIcon={<Problem />}
                                        initiallyOpen={false}
                                        primaryTogglesNestedList={true}
                                        nestedItems={[
                                            <CopyToClipboard
                                                key={`clip${problem}`}
                                                    style={{ display: 'flex', flexDirection: 'column' }}
                                                    onCopy={() => openSnackBar('Code Copied!', 'success')}
                                                    text={history[room][problem].code}
                                                >
                                                    <ListItem key={`nested${problem}`} >
                                                    <TextField
                                                        id={problem}
                                                        rows={10}
                                                        disabled
                                                        defaultValue={history[room][problem].code}
                                                        underlineShow={false}
                                                        style={{ paddingLeft: '10px', marginTop: 0, width: '500px', borderStyle: 'solid', borderWidth: '1px' }}
                                                        multiLine
                                                    />
                                                </ListItem>
                                            </CopyToClipboard>
                                        ]}
                                    />
                                ))
                            }
                        />
                    ))

                }
            </List>
        </Paper>
    )
}

HistoryList.propTypes = {
    singleRooms: PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    groupRooms:  PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    history:  PropTypes.objectOf(
        PropTypes.shape(
            PropTypes.objectOf(
                PropTypes.shape({
                    room: PropTypes.string.isRequired,
                    problem: PropTypes.string.isRequired,
                    code: PropTypes.string.isRequired,
                }).isRequired,
            ).isRequired,
        ).isRequired,
    ).isRequired,
    openSnackBar: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList)
