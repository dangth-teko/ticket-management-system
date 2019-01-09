import React, { Fragment } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Center as CenterColumn } from 'components/Utils/Column'
import history from 'utils/history'
import ChangePassword from 'components/User/ChangePassword'
import { ProfileTable } from 'components/User/Profile'
import { Card } from 'antd'

const DefaultComponent = () => (
    <Fragment>
        <h3 className="m-3">{'Xin chào, đây là cái Dashboard <3'}</h3>
        <h5 className="m-4" style={{ height: '1000px' }}>{'Chưa có gì cả'}</h5>
    </Fragment>
)

const Dashboard = props => (
    <Card bordered={false}>
        <Router history={history}>
            <Switch>
                <Route
                    path="/change-password"
                    component={() =>
                        <CenterColumn>
                            <ChangePassword />
                        </CenterColumn>
                    }
                />
                <Route path="/dashboard" component={DefaultComponent} />
                <Route path="/profile" component={ProfileTable} />
                <Redirect to="/dashboard" />
            </Switch>
        </Router>
    </Card>
)

export default Dashboard
