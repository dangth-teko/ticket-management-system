import React from 'react'
import { Layout } from "antd"

import "antd/dist/antd.css"
import './Header.css'

const { Header } = Layout

const HeaderComponent = props => (
    <Header className="header" theme="dark" style={{ height: '50px' }}>
        {<h3 style={{ color: 'white', padding: '8px' }}>Welcome</h3>}
    </Header>
)

export default HeaderComponent