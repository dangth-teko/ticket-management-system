import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Col } from 'antd'
import './App.css'

import Login from 'components/User/Login'
import Signup from 'components/User/Signup'
import ResetPassword from 'components/User/ResetPassword'
import Dashboard from 'components/Dashboard'
import DefaultLayout from 'components/DefaultLayout'
import { TOKEN } from 'constants/utils'

class App extends Component {
        render() {
            const isUserAuthenticated = localStorage.getItem(TOKEN) != null
            const routers = isUserAuthenticated
                ?
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Redirect to="/dashboard" />
                </Switch>
                :
                <Col md={{ span: 6, offset: 8 }} sm={{ span: 14, offset: 5 }}>
                    <Switch>
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/signin" component={Login} />
                        <Route exact path="/reset-password" component={ResetPassword} />
                        <Redirect to="/signin" />
                    </Switch>
                </Col>

            return (
                <Fragment>
                    <DefaultLayout isLoggedIn={isUserAuthenticated} />
                    <Router>{routers}</Router>
                </Fragment>
            )
        }
    }

const mapStateToProps = state => ({
    token: state.user.token,
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, null)(App)
