import React from 'react'
import { Col } from 'antd'

const Center = props => (
    <Col
        xxl={{ span: 6, offset: 9 }}
        xl={{ span: 8, offset: 8 }}
        md={{ span: 12, offset: 6 }}
        sm={{ span: 12, offset: 6 }}
        className={props.className}
    >
        {props.children}
    </Col>
)

export {
    Center
}
