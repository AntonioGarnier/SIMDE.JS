import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ControlPanel from '../Components/ControlPanel'
import PersonalData from '../Components/PersonalData'
import Welcome from '../Components/Welcome'
// import App from '../../Simulator/interface/App'

export default function LoggedRoutes() {
    return (
        <ControlPanel>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route sensitive path="/login" render={() => <Redirect to="/" />} />
                <Route sensitive path="/personal-data" component={PersonalData} />
                <Route sensitive exact path="/room-list" render={() => <h1>ROOM LIST</h1>} />
                <Route sensitive path="/room-list/:room" render={() => <h1>ONE ROOM</h1>} />
                <Route sensitive exact path="/group-list" render={() => <h1>GROUP LIST</h1>} />
                <Route sensitive path="/group-list/:group" render={() => <h1>ONE GROUP</h1>} />
                <Route sensitive path="/about" render={() => <h1>ABOUT</h1>} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </ControlPanel>
    )
}
