import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import history from 'utils/history'

import './App.css'

import Login from 'components/User/Login'
import Signup from 'components/User/Signup'
import ResetPassword from 'components/User/ResetPassword'
import DefaultLayout from 'components/DefaultLayout'
import { Center as CenterColumn } from 'components/Utils/Column'
import { verify as verifyUser } from 'utils/auth'

const UnauthenticatedComponent = (
    <Fragment>
        <DefaultLayout isAuthenticated={false} />
        <CenterColumn className="custom-under-header">
            <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Login} />
                <Route path="/reset-password" component={ResetPassword} />
                <Redirect to="/signin" />
            </Switch>
        </CenterColumn>
    </Fragment>
)

class App extends Component {
    componentDidMount() {
        console.log('Component App did mount...')
        verifyUser(this.props)
    }

    render() {
        const routers = this.props.user.isAuthenticated
            ? <DefaultLayout isAuthenticated={true} />
            : UnauthenticatedComponent
        return (
            <Router history={history}>{routers}</Router>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps)(App)
