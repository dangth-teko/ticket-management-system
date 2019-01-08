import React from 'react'
import {Col, Spin} from 'antd'

export default props =>
    <Col offset={9}>
        <Spin size="default">{props.children}</Spin>
    </Col>
