import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Col } from 'antd'
import './App.css'

import Login from 'components/User/Login'
import Signup from 'components/User/Signup'
import ResetPassword from 'components/User/ResetPassword'

import DefaultLayout from 'components/DefaultLayout'
import { TOKEN } from 'constants/utils'

class App extends Component {
    render() {
        const isUserAuthenticated = localStorage.getItem(TOKEN) != null
        const routers = isUserAuthenticated ? <DefaultLayout isAuthenticated={true} />
            :   <Fragment>
                    <DefaultLayout isAuthenticated={false} />
                    <Col
                        md={{ span: 6, offset: 9 }} sm={{ span: 12, offset: 6 }}
                        className="custom-under-header"
                    >
                        <Switch>
                            <Route path="/signup" component={Signup} />
                            <Route path="/signin" component={Login} />
                            <Route path="/reset-password" component={ResetPassword} />
                            <Redirect to="/signin" />
                        </Switch>
                    </Col>
                </Fragment>

        return (
            <Router>{routers}</Router>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, null)(App)
