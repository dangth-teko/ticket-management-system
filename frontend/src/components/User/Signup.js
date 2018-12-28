import React from 'react'
import { connect } from 'react-redux'

import { Form, Row, Col, Input, Button, Icon, Card } from "antd"

import { signup } from 'actions/user'
import { validateUsername, validatePassword, validateEmail } from 'utils/validateInput'
import { showNotification } from 'utils/notificate'

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        errorUsername: null,
        errorPassword: null,
        errorEmail: null
    }

    componentDidUpdate() {
        showNotification(this.props)
    }

    handleSubmit = e => {
        e.preventDefault()
        const errorUsername = validateUsername(this.state.username)
        const errorPassword = validatePassword(this.state.password, this.state.confirmPassword)
        const errorEmail = validateEmail(this.state.email)
        this.setState({ errorUsername, errorPassword, errorEmail })
        if (!(errorEmail || errorPassword || errorUsername)) {
            this.props.dispatch(signup(this.state.username, this.state.password, this.state.email))
            this.props.history.push("/")
        }
    }

    handleFormChange = e => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Col>
                <Card className="box-shadow-bottom">
                    <Row type="flex" justify="center"><Icon type="user-add" style={{ fontSize: '50px' }} /></Row>
                    <Row type="flex" justify="center"><h6>Đăng ký tài khoản</h6></Row>

                    <Form className="form" onSubmit={this.handleSubmit}>
                        <Input
                            prefix={<Icon type="user" />}
                            className="my-2"
                            placeholder="username"
                            name="username"
                            onChange={this.handleFormChange} />
                        {this.state.errorUsername && <font color="red">{this.state.errorUsername}</font>}

                        <Input
                            prefix={<Icon type="lock" />}
                            type="password"
                            className="my-2"
                            placeholder="password"
                            name="password"
                            onChange={this.handleFormChange} />

                        <Input
                            prefix={<Icon type="lock" />}
                            type="password"
                            className="my-2"
                            placeholder="confirmPassword"
                            name="confirmPassword"
                            onChange={this.handleFormChange} />
                        {this.state.errorPassword && <font color="red">{this.state.errorPassword}</font>}

                        <Input
                            prefix={<Icon type="mail" />}
                            className="my-2"
                            placeholder="email"
                            name="email"
                            onChange={this.handleFormChange} />
                        {this.state.errorEmail && <font color="red">{this.state.errorEmail}</font>}

                        <Button type="primary" htmlType="submit" className="my-2 w-100">Đăng ký</Button>
                    </Form>
                </Card>
            </Col>
        )
    }
}

const mapPropsToState = state => ({
    notification: state.user.notification
})

export default connect(mapPropsToState, null)(Signup)
