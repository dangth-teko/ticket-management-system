import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import history from 'utils/history'
const { Sider } = Layout

const Sidebar = props => {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            className="custom-under-header"
            style={{ height: '100vh', position: 'fixed', zIndex: 1 }}
        >
            <Menu theme="dark" mode="inline">
                <Menu.Item key="1" onClick={() => history.push("/change-password")}>
                    <Icon type="user" />
                    <span className="nav-text">Profile</span>
                </Menu.Item>

                <Menu.Item key="2" onClick={() => history.push("/")}>
                    <Icon type="bar-chart" />
                    <span className="nav-text">Statistics</span>
                </Menu.Item>

                <Menu.Item key="3" onClick={() => history.push("/")}>
                    <Icon type="appstore" />
                    <span className="nav-text">Application</span>
                </Menu.Item>

                <Menu.Item key="4" onClick={() => history.push("/")}>
                    <Icon type="database" />
                    <span className="nav-text">Data</span>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Sidebar
