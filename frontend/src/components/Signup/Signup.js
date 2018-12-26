import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { Form, Row, Col, Input, Button, Icon } from "antd"

import "antd/dist/antd"
import './Signup.css'

import {submitSignup} from 'actions/user'
import {
    validateUsername,
    validatePassword,
    validateEmail
} from 'utils/validateInput'

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        confirm_password: '',
        email: '',
        errorUsername: null,
        errorPassword: null,
        errorEmail: null
    }

    handleSubmit(e) {
        e.preventDefault()
        const errorUsername = validateUsername(this.state.username)
        const errorPassword = validatePassword(this.state.password, this.state.confirm_password)
        const errorEmail = validateEmail(this.state.email)
        this.setState({ errorUsername, errorPassword, errorEmail })
        if (errorEmail || errorPassword || errorUsername)
            console.log('submit fail')
        else {
            console.log('submit success')
            this.props.dispatch(submitSignup(this.state.username, this.state.password, this.state.email))   
        }
    }

    render() {
        return (
            <Fragment>
                <Col span={8} offset={4}>
                    <Row type="flex" justify="center">
                        <Icon type="user-add" style={{ fontSize: '30px' }} />
                    </Row>
                    <Row type="flex" justify="center">
                        <h6>Đăng ký tài khoản</h6>
                    </Row>

                    <Form className="form" onSubmit={e => this.handleSubmit(e)}>
                        <Input
                            prefix={<Icon type="user" />}
                            className="input"
                            placeholder="username"
                            onChange={e => this.setState({username: e.target.value})} />
                        {this.state.errorUsername && <font color="red">{this.state.errorUsername}</font>}

                        <Input
                            prefix={<Icon type="lock" />}
                            type="password"
                            className="input"
                            placeholder="password"
                            onChange={e => this.setState({password: e.target.value})} />
                        <Input
                            prefix={<Icon type="lock" />}
                            type="password"
                            className="input"
                            placeholder="confirm password"
                            onChange={e => this.setState({confirm_password: e.target.value})} />
                        {this.state.errorPassword && <font color="red">{this.state.errorPassword}</font>}

                        <Input
                            prefix={<Icon type="mail" />}
                            className="input"
                            placeholder="email"
                            onChange={e => this.setState({email: e.target.value})} />
                        {this.state.errorEmail && <font color="red">{this.state.errorEmail}</font>}

                        <Button type="primary" htmlType="submit" className="button">Đăng ký</Button>
                    </Form>
                </Col>
            </Fragment>
        )
    }
}

export default connect(null, null)(Signup)