import React from 'react'
import { Layout, Button } from "antd"
import { TOKEN } from 'constants/utils'

const { Header } = Layout

const Logout = () => {
    localStorage.removeItem(TOKEN)
    window.location.reload()
}

const HeaderComponent = props => {
    return (
        <Header className="d-flex box-shadow-bottom" theme="dark" style={{ height: '50px', width: '100%', position: 'fixed' }}>
            <img
                style={{ maxWidth: '48px', maxHeight: '48px' }}
                className="rounded-circle"
                src="https://cdn.itviec.com/employers/teko-vietnam/logo/social/8kqorWnK4uRWRELvgi8k7qQF/teko-vietnam-logo.png"
                alt="logo" />
            <h3 style={{ color: 'white', padding: '8px' }}>Welcome</h3>
            {props.isAuthenticated &&
                <Button
                    className="text-light my-2 ml-auto p-2 bd-highlight bg-transparent"
                    onClick={Logout}>
                    Log Out
                </Button>}
        </Header>
    )
}

export default HeaderComponent
