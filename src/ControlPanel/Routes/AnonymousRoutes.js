import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../Components/Login'
import App from '../../Simulator/interface/App'

export default function AnonymousRoutes() {
    return (
        <Switch>
            <Route exact path="/simulator" component={App} />
            <Route exact path="/login" component={Login} />
            <Route render={() => <Redirect to="/simulator" />} />
        </Switch>
    )
}
