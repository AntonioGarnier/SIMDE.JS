import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ControlPanel from '../Components/ControlPanel'
import PersonalData from '../Components/PersonalData'
import Welcome from '../Components/Welcome'
import CreateProblem from '../Components/CreateProblem'
import CreateRoom from '../Components/SettingsRoom/CreateRoom'
import SettingsRoom from '../Components/SettingsRoom'
import SnackBarMessage from '../Components/SnackBarMessage';
// import App from '../../Simulator/interface/App'

export default function AdminRoutes() {
    return (
        <ControlPanel>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route sensitive path="/login" render={() => <Redirect to="/" />} />
                <Route sensitive path="/personal-data" component={PersonalData} />
                /* List routes */
                <Route sensitive exact path="/room-list" render={() => <h1>ROOM LIST</h1>} />
                <Route sensitive path="/room-list/:room" render={() => <h1>ONE ROOM</h1>} />
                <Route sensitive exact path="/group-list" render={() => <h1>GROUP LIST</h1>} />
                <Route sensitive path="/group-list/:group" render={() => <h1>ONE GROUP</h1>} />
                <Route sensitive path="/problem-list" render={() => <h1>PROBLEM LIST</h1>} />
                /* Problems settings routes */
                <Route sensitive path="/problem-settings" component={CreateProblem} />
                /* Room settings routes */
                <Route sensitive exact path="/room-settings" component={SettingsRoom} />
                /* Group settings routes */
                <Route sensitive path="/group-settings" render={() => <h1>CREATE GROUP</h1>} />
                /* About routes */
                <Route sensitive path="/about" render={() => <h1>ABOUT</h1>} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
            <SnackBarMessage/>
        </ControlPanel>
    )
}
