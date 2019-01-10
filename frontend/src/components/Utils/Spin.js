import React from 'react'
import { Col, Spin } from 'antd'

export default props => (
    <Col offset={9}>
        <span>{props.children}</span>
        <Spin size="default" />
    </Col>
)
