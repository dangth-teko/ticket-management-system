import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ChangePassword from 'components/User/ChangePassword'

const DefaultComponent = () => (
    <Fragment>
        <h3 className="m-3">{'Xin chào, đây là cái Dashboard <3'}</h3>
        <h5 className="m-4" style={{ height: '1000px' }}>{'Chưa có gì cả'}</h5>
    </Fragment>
)

const Dashboard = props => (
    <Router>
        <Switch>
            <Route exact path="/change-password" component={ChangePassword} />
            <Route path="/dashboard" component={DefaultComponent} />
            <Redirect to="/dashboard" />
        </Switch>
    </Router>
)

export default Dashboard
