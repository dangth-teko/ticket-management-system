import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Form,
    Input,
    Icon,
    Button,
    Col,
    Row,
    Card
} from 'antd'
import { login } from 'actions/user'
import { validatePassword, validateUsername } from 'utils/validateInput'
import { showNotification } from 'utils/notificate'

import "antd/dist/antd.css"
import './Login.css'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        errorUsername: null,
        errorPassword: null
    }

    handleSubmit(e) {
        e.preventDefault()
        const errorUsername = validateUsername(this.state.username)
        const errorPassword = validatePassword(this.state.password)
        this.setState({ errorUsername, errorPassword })
        if (errorUsername || errorPassword)
            console.log('submit failed')
        else {
            console.log('submit success')
            this.props.dispatch(login(this.state.username, this.state.password))
        }
    }

    componentDidUpdate() {
        // reset notification on login page to null
        showNotification(this.props)
    }


    render() {
        return (
            <Col><Card className="form-card">
                <Row type="flex" justify="center"><Icon type="user" style={{ fontSize: '50px' }} /></Row>
                <Row type="flex" justify="center"><h6>Đăng nhập</h6></Row>

                <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
                    <Input
                        className="input" prefix={<Icon type="user" />}
                        onChange={(e) => this.setState({ username: e.target.value })}
                        placeholder="username" />
                    {this.state.errorUsername && <font color="red">{this.state.errorUsername}</font>}

                    <Input
                        type="password" className="input" prefix={<Icon type="lock" />}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        placeholder="password" />
                    {this.state.errorPassword && <font color="red">{this.state.errorPassword}</font>}

                    <Button type="primary" htmlType="submit" className="button">Đăng nhập</Button>

                    <Link to="/reset-password">Quên mật khẩu</Link>
                    <div className="break-line" />

                    <strong>{'Chưa có tài khoản?'}</strong>
                    <Link to="/sign-up">Đăng ký</Link>
                </Form>
            </Card></Col>
        )
    }
}

const mapStateToProps = state => ({
    notification: state.user.notification
})

export default connect(mapStateToProps, null)(Login)