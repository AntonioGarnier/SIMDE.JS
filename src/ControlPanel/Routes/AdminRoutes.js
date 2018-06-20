import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ControlPanel from '../Components/ControlPanel'
import PersonalData from '../Components/PersonalData'
import Welcome from '../Components/Welcome'
import SettingsRoom from '../Components/SettingsRoom'
import SettingsProblem from '../Components/SettingsProblem'
import SettingsGroup from '../Components/SettingsGroup'
import SettingsInstance from '../Components/SettingsInstance'
import UserList from '../Components/UserList'
import RoomList from '../Components/RoomList'
import HistoryList from '../Components/HistoryList'
import GroupList from '../Components/GroupList'
import ProblemList from '../Components/ProblemList'
import InstanceList from '../Components/InstanceList'
import GroupView from '../Components/GroupView'
import InstanceView from '../Components/InstanceView'
import ProblemView from '../Components/ProblemView'
import RoomView from '../Components/RoomView'

export default function AdminRoutes() {
    return (
        <ControlPanel>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route sensitive path="/login" render={() => <Redirect to="/" />} />
                <Route sensitive path="/personal-data" component={PersonalData} />
                <Route sensitive path="/user-list" component={UserList} />
                <Route sensitive exact path="/history-list" component={HistoryList} />
                <Route sensitive exact path="/room-list" component={RoomList} />
                <Route sensitive exact path="/group-list" component={GroupList} />
                <Route sensitive exact path="/problem-list" component={ProblemList} />
                <Route sensitive exact path="/instance-list" component={InstanceList} />
                <Route sensitive path="/room-list/:room" component={RoomView} />
                <Route sensitive path="/group-list/:group" component={GroupView} />
                <Route sensitive path="/problem-list/:problem" component={ProblemView} />
                <Route sensitive path="/instance-list/:instance" component={InstanceView} />
                <Route sensitive exact path="/room-settings" component={SettingsRoom} />
                <Route sensitive path="/group-settings" component={SettingsGroup} />
                <Route sensitive path="/problem-settings" component={SettingsProblem} />
                <Route sensitive path="/instance-settings" component={SettingsInstance} />
                <Route sensitive path="/about" render={() => <h1>ABOUT</h1>} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </ControlPanel>
    )
}
