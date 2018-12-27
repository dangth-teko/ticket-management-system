import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { Col } from 'antd'
import "antd/dist/antd.css"
import './App.css'

import Login from 'components/User/Login/Login'
import Signup from 'components/User/Signup/Signup'
import ResetPassword from 'components/User/ResetPassword/ResetPassword'
import ChangePassword from 'components/User/ChangePassword/ChangePassword'
import DefaultLayout from 'components/DefaultLayout'

class App extends Component {
    verifyUser() {
        console.log('Verifying user...')
    }

    componentDidMount() {
        this.verifyUser()
    }

    render() {
        let routers = (
            <Switch>
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/change-password" component={ChangePassword} />
                <Route exact path="/login" component={Login} />
            </Switch>
        )

        if (this.props.isLogined) {}

        return (
            <Fragment>
                <DefaultLayout />
                <Col md={{span: 6, offset: 8}} sm={{span: 14, offset: 5}}>
                    <Router>
                        {routers}
                    </Router>
                </Col>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isLogined: state.user.isLogined
})

export default connect(mapStateToProps, null)(App)