import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Form,
    Input,
    Icon,
    Button,
    Row,
    Card
} from 'antd'
import Recaptcha from 'react-google-recaptcha'
// Import constants
import { LOGIN_FAIL_3 } from 'constants/actions'
// Import components
import Spin from 'components/Utils/Spin'
// Import functions
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
        showNotification(this.props)
    }

    render() {
        return (
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

                    {this.props.error === LOGIN_FAIL_3 &&
                        <Recaptcha
                            sitekey="6LccxoYUAAAAALeIedc3Ya59wHVl-YgPcs9mlJmG"
                            onChange={value => {
                                console.log('Captcha debug...', value)
                            }}
                        />
                    }

                    {this.props.pending && <Spin>Sending...</Spin>}
                    <Button type="primary" htmlType="submit" className="w-100 my-2">Đăng nhập</Button>

                    <Link to="/reset-password">Quên mật khẩu</Link>
                    <div className="break-line" />

                    <strong>{'Chưa có tài khoản?'}</strong>
                    <Link to="/signup">Đăng ký</Link>
                </Form>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    notification: state.user.notification,
    pending: state.user.pending
})

export default connect(mapStateToProps, null)(Login)
