import React, { Fragment } from 'react'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout

const Sidebar = props => {
    return (
        <Router>
            <Fragment>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    style={{ height: '100vh', position: 'fixed', top: '50px' }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">Profile</span>
                        </Menu.Item>

                        <Menu.Item key="2">
                            <Icon type="bar-chart" />
                            <span className="nav-text">Statistics</span>
                        </Menu.Item>

                        <Menu.Item key="3">
                            <Icon type="appstore" />
                            <span className="nav-text">Application</span>
                        </Menu.Item>

                        <Menu.Item key="4">
                            <Icon type="database" />
                            <span className="nav-text">Data</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </Fragment>
        </Router>
    )
}

export default Sidebar
