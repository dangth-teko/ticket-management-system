import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Form,
    Input,
    Icon,
    Button,
    Alert
} from 'antd'
import { submitLogin } from '../../actions/user'
import { validatePassword, validateUsername } from 'utils/validateInput'

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
            this.props.dispatch(submitLogin(this.state.username, this.state.password))
        }
    }

    render() {
        return (
            <div className="container">
                <Form className="Form" onSubmit={(e) => this.handleSubmit(e)}>

                    <Icon type="user" style={{ fontSize: '50px' }} />

                    <Input
                        type="text" className="Input" prefix={<Icon type="user" />}
                        onChange={(e) => this.setState({ username: e.target.value })}
                        placeholder="username" />
                    {this.state.errorUsername && <font color="red">{this.state.errorUsername}</font>}

                    <Input
                        type="password" className="Input" prefix={<Icon type="lock" />}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        placeholder="password" />
                    {this.state.errorPassword && <font color="red">{this.state.errorPassword}</font>}

                    {this.props.error && <Alert className="Alert" message={this.props.error} type="error" showIcon />}

                    <Button type="primary" htmlType="submit" className="Button">Đăng nhập</Button>

                    <Link to="/ForgetPassword">Quên mật khẩu</Link>
                    <div className="break-line" />

                    <strong>{'Chưa có tài khoản?'}</strong>
                    <Link to="/signup">Đăng ký</Link>

                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLogined: state.user.isLogined,
    error: state.user.error
})

export default connect(mapStateToProps, null)(Login)