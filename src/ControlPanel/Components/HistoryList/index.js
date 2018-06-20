import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import CustomList from '../CustomList'


const mapStateToProps = (state) => { 
    return {
        singleRooms: state.controlPanel.singleRooms,
        groupRooms: state.controlPanel.groupRooms,
        history: state.controlPanel.history,
    }
}

const HistoryList = ({ 
    history,
    singleRooms,
    groupRooms,
}) => {
    return (
        <Paper className="listStyle" >
            <List>
                <Subheader style={{ color: 'white', backgroundColor: '#a57ca5' }} >History</Subheader>
                <Divider />
                {
                    Object.keys(history).map(item => (
                        <div key={item} >
                            <p>Sala: {singleRooms[history[item].room] ? singleRooms[history[item].room].name : groupRooms[history[item].room].name}</p>
                            <p>Problema: {history[item].problem}</p>
                            <TextField
                                id={item}
                                rows={10}
                                disabled
                                defaultValue={history[item].code}
                                underlineShow={false}
                                style={{ paddingLeft: '10px', marginTop: 0, width: '500px', borderStyle: 'solid', borderWidth: '1px' }}
                                multiLine
                            />
                        </div>
                    ))

                }
            </List>
        </Paper>
    )
}

HistoryList.propTypes = {

}

export default connect(mapStateToProps)(HistoryList)
