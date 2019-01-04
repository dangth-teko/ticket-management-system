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

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        errorUsername: null,
        errorPassword: null
    }

    handleSubmit = e => {
        e.preventDefault()
        const errorUsername = validateUsername(this.state.username)
        const errorPassword = validatePassword(this.state.password)
        this.setState({ errorUsername, errorPassword })
        if (!(errorUsername || errorPassword))
            this.props.dispatch(login(this.state.username, this.state.password))
    }

    handleFormChange = e => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }

    componentDidUpdate() {
        if (this.props.token) {
            localStorage.setItem("teko-token", this.props.token)
            window.location.reload()
        }
        showNotification(this.props)
    }

    render() {
        return (
            <Col>
                <Card className="box-shadow-bottom">
                    <Row type="flex" justify="center"><Icon type="user" style={{ fontSize: '50px' }} /></Row>
                    <Row type="flex" justify="center"><h6>Đăng nhập</h6></Row>

                    <Form className="form" onSubmit={this.handleSubmit}>
                        <Input
                            className="my-2" prefix={<Icon type="user" />}
                            name="username"
                            onChange={this.handleFormChange}
                            placeholder="username" />
                        {this.state.errorUsername && <font color="red">{this.state.errorUsername}</font>}

                        <Input
                            type="password" className="my-2" prefix={<Icon type="lock" />}
                            name="password"
                            onChange={this.handleFormChange}
                            placeholder="password" />
                        {this.state.errorPassword && <font color="red">{this.state.errorPassword}</font>}

                        <Button type="primary" htmlType="submit" className="w-100 my-2">Đăng nhập</Button>

                        <Link to="/reset-password">Quên mật khẩu</Link>
                        <div className="break-line" />

                        <strong>{'Chưa có tài khoản?'}</strong>
                        <Link to="/signup">Đăng ký</Link>
                    </Form>
                </Card>
            </Col>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    notification: state.user.notification,
})

export default connect(mapStateToProps, null)(Login)
