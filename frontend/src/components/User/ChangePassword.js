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

import { changePassword } from 'actions/user'
import { validatePassword } from 'utils/validateInput'
import { showNotification } from 'utils/notificate'

class ChangePassword extends React.Component {
    state = {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
        errorPassword: null
    }

    handleSubmit(e) {
        e.preventDefault()
        const errorPassword = validatePassword(this.state.newPassword, this.state.newPasswordConfirm)
        this.setState({ errorPassword })
        if (errorPassword)
            console.log('submit failed')
        else {
            console.log('submit success')
            this.props.dispatch(changePassword(this.state.oldPassword, this.state.newPassword, this.props.newPasswordConfirm))
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
                            type="password" className="my-2" prefix={<Icon type="lock" />}
                            onChange={(e) => this.setState({ oldPassword: e.target.value })}
                            placeholder="Current Password" />

                        <Input
                            type="password" className="my-2" prefix={<Icon type="lock" />}
                            onChange={(e) => this.setState({ newPassword: e.target.value })}
                            placeholder="New Password" />

                        <Input
                            type="password" className="my-2" prefix={<Icon type="lock" />}
                            onChange={(e) => this.setState({ newPasswordConfirm: e.target.value })}
                            placeholder="Confimr New Password" />

                        {this.state.errorPassword && <font color="red">{this.state.errorPassword}</font>}

                        <Button type="primary" htmlType="submit" className="my-2 w-100">Change password</Button>
                    </Form>
                </Card>
            </Col>
        )
    }
}

const mapStateToProps = state => ({
    notification: state.user.notification
})

export default connect(mapStateToProps, null)(ChangePassword)
