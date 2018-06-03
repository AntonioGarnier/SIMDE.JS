import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ControlPanel from '../Components/ControlPanel'
import PersonalData from '../Components/PersonalData'
import Welcome from '../Components/Welcome'
import CreateProblem from '../Components/CreateProblem'
// import App from '../../Simulator/interface/App'

export default function LoggedRoutes() {
    return (
        <ControlPanel>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route sensitive path="/login" render={() => <Redirect to="/" />} />
                <Route sensitive path="/personalData" component={PersonalData} />
                <Route sensitive path="/problemList" render={() => <h1>PROBLEM LIST</h1>} />
                <Route sensitive path="/roomList" render={() => <h1>ROOM LIST</h1>} />
                <Route sensitive path="/createProblem" component={CreateProblem} />
                <Route sensitive path="/createRoom" render={() => <h1>CREATE ROOM</h1>} />
                <Route sensitive path="/about" render={() => <h1>ABOUT</h1>} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </ControlPanel>
    )
}
