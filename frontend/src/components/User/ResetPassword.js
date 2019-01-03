import React from 'react'
import { connect } from 'react-redux'
import {
    Form,
    Input,
    Icon,
    Button,
    Row,
    Card
} from 'antd'

import { resetPassword } from 'actions/user'
import { validateEmail, validateUsername } from 'utils/validateInput'
import { showNotification } from 'utils/notificate'

class ResetPassword extends React.Component {
    state = {
        username: '',
        email: '',
        errorUsername: null,
        errorEmail: null
    }

    handleSubmit = e => {
        e.preventDefault()
        const errorUsername = validateUsername(this.state.username)
        const errorEmail = validateEmail(this.state.email)
        this.setState({ errorUsername, errorEmail })
        if (!(errorUsername || errorEmail)) {
            console.log('submit success')
            this.props.dispatch(resetPassword(this.state.username, this.state.email))
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

    componentDidUpdate() {
        showNotification(this.props)
    }

    render() {
        return (
            <Card className="box-shadow-bottom">
                <Row type="flex" justify="center"><Icon type="lock" style={{ fontSize: '50px' }} /></Row>
                <Row type="flex" justify="center"><h6>Quên mật khẩu</h6></Row>
                <Form className="form" onSubmit={this.handleSubmit}>
                    <Input
                        className="my-2" prefix={<Icon type="user" />}
                        name="username"
                        onChange={this.handleFormChange}
                        placeholder="username" />
                    {this.state.errorUsername && <font color="red">{this.state.errorUsername}</font>}

                    <Input
                        className="my-2" prefix={<Icon type="mail" />}
                        name="email"
                        onChange={this.handleFormChange}
                        placeholder="email" />
                    {this.state.errorEmail && <font color="red">{this.state.errorEmail}</font>}

                    <Button type="primary" htmlType="submit" className="my-2 w-100">Reset password</Button>
                </Form>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    notification: state.user.notification
})

export default connect(mapStateToProps, null)(ResetPassword)
