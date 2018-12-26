import React from 'react'
import { Layout } from "antd"
import "antd/dist/antd.css"
const { Header } = Layout

const HeaderComponent = props => (
    <Header theme="dark" style={{ height: '50px' }}>
        {<h3 style={{ color: 'white', padding: '8px' }}>Welcome</h3>}
    </Header>
)

export default HeaderComponent