import React from 'react'
import { Layout, Button } from "antd"
import {TOKEN} from 'constants/utils'

const { Header } = Layout

const Logout = () => {
    localStorage.removeItem(TOKEN)
    window.location.reload()
}

const HeaderComponent = props => {
    console.log('Header', props)
    return (
        <Header className   ="d-flex box-shadow-bottom" theme="dark" style={{ height: '50px' }}>
            <h3 style={{ color: 'white', padding: '8px' }}>Welcome</h3>
            {props.isLoggedIn &&
            <Button
                className="text-light my-2 ml-auto p-2 bd-highlight bg-transparent"
                onClick={Logout}>
                Log Out
            </Button>}
        </Header>
    )
}

export default HeaderComponent
