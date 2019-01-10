import React from 'react'
import { Layout } from 'antd'

import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

import Dashboard from 'components/Dashboard'

const { Content } = Layout

const DefaultLayout = props => (
    <Layout>
        <Header {...props} />
        {props.isAuthenticated &&
            <Layout>
                <Sidebar />
                <Content className="custom-under-header custom-content">
                    <Dashboard />
                </Content>
            </Layout>
        }
        <Footer />
    </Layout>
)


export default DefaultLayout
