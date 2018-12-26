import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import "antd/dist/antd.css"
import './App.css'

import Login from 'components/Login/Login'
import Signup from 'components/Signup/Signup'
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
                <Route path="/" component={Login} />
            </Switch>
        )

        if (this.props.isLogined) { }

        return (
            <Fragment>
                <DefaultLayout />
                <Router>
                    {routers}
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isLogined: state.user.isLogined
})

export default connect(mapStateToProps, null)(App)
