import React from 'react'
import { connect } from 'react-redux'
import {
    Form,
    Input,
    Icon,
    Button,
    Col,
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

    handleSubmit(e) {
        e.preventDefault()
        const errorUsername = validateUsername(this.state.username)
        const errorEmail = validateEmail(this.state.password)
        this.setState({ errorUsername, errorEmail })
        if (!(errorUsername || errorEmail)) {
            console.log('submit success')
            this.props.dispatch(resetPassword(this.state.username, this.state.password))
            this.props.history.push("/")
        }
    }

    componentDidUpdate() {
        showNotification(this.props)
    }

    render() {
        return (
            <Col>
                <Card className="box-shadow-bottom">
                    <Row type="flex" justify="center"><Icon type="lock" style={{ fontSize: '50px' }} /></Row>
                    <Row type="flex" justify="center"><h6>Quên mật khẩu</h6></Row>
                    <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
                        <Input
                            className="my-2" prefix={<Icon type="user" />}
                            onChange={(e) => this.setState({ username: e.target.value })}
                            placeholder="username" />
                        {this.state.errorUsername && <font color="red">{this.state.errorUsername}</font>}

                        <Input
                            className="my-2" prefix={<Icon type="mail" />}
                            onChange={(e) => this.setState({ password: e.target.value })}
                            placeholder="email" />
                        {this.state.errorEmail && <font color="red">{this.state.errorEmail}</font>}

                        <Button type="primary" htmlType="submit" className="my-2 w-100">Reset password</Button>
                    </Form>
                </Card>
            </Col>
        )
    }
}

const mapStateToProps = state => ({
    notification: state.user.notification
})

export default connect(mapStateToProps, null)(ResetPassword)
