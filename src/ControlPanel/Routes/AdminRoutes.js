import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ControlPanel from '../Components/ControlPanel'
import PersonalData from '../Components/PersonalData'
import Welcome from '../Components/Welcome'
import SettingsRoom from '../Components/SettingsRoom'
import SettingsProblem from '../Components/SettingsProblem'
import SettingsGroup from '../Components/SettingsGroup'
import RoomList from '../Components/RoomList'
import GroupList from '../Components/GroupList'

export default function AdminRoutes() {
    return (
        <ControlPanel>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route sensitive path="/login" render={() => <Redirect to="/" />} />
                <Route sensitive path="/personal-data" component={PersonalData} />
                <Route sensitive exact path="/room-list" component={RoomList} />
                <Route sensitive exact path="/group-list" component={GroupList} />
                <Route sensitive path="/room-list/:room" render={() => <h1>ONE ROOM</h1>} />
                <Route sensitive path="/group-list/:group" render={() => <h1>ONE GROUP</h1>} />
                <Route sensitive exact path="/room-settings" component={SettingsRoom} />
                <Route sensitive path="/group-settings" component={SettingsGroup} />
                <Route sensitive path="/problem-settings" component={SettingsProblem} />
                <Route sensitive path="/instance-settings" render={() => <h1>INSTANCE SETTINGS</h1>} />
                <Route sensitive path="/about" render={() => <h1>ABOUT</h1>} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </ControlPanel>
    )
}
