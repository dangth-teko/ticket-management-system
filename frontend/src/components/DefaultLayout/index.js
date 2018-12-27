import React from 'react'
import { Layout } from 'antd'
import "antd/dist/antd.css"

import Header from './Header'

const DefaultLayout = props => {
    return (
        <Layout>
            <Header isLoggedIn={props.isLoggedIn} />
        </Layout>
    )
}

export default DefaultLayout
