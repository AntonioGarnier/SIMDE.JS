import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ControlPanel from '../Components/ControlPanel'
import PersonalData from '../Components/PersonalData'
import Welcome from '../Components/Welcome'
import RoomList from '../Components/RoomList'
import GroupList from '../Components/GroupList'
import RoomView from '../Components/RoomView'
import GroupView from '../Components/GroupView'
import SettingsGroup from '../Components/SettingsGroup'
// import App from '../../Simulator/interface/App'


export default function LoggedRoutes() {
    return (
        <ControlPanel>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route sensitive path="/login" render={() => <Redirect to="/" />} />
                <Route sensitive path="/personal-data" component={PersonalData} />
                <Route sensitive exact path="/room-list" component={RoomList} />
                <Route sensitive exact path="/group-list" component={GroupList} />
                <Route sensitive path="/group-settings" component={SettingsGroup} />
                <Route sensitive path="/room-list/:room" component={RoomView} />
                <Route sensitive path="/group-list/:group" component={GroupView} />
                <Route sensitive path="/about" render={() => <h1>ABOUT</h1>} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </ControlPanel>
    )
}
