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
// Import components
import Spin from 'components/Utils/Spin'
// Import functions
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

    handleSubmit = e => {
        e.preventDefault()
        const errorPassword = validatePassword(this.state.newPassword, this.state.newPasswordConfirm)
        this.setState({ errorPassword })
        if (!errorPassword) {
            this.props.dispatch(changePassword(this.state.oldPassword, this.state.newPassword, this.state.newPasswordConfirm))
        }
    }

    handleFormChange = e => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('DEBUG in ChangePassword Component: ---------------------------')
        // console.log('Prev props', prevProps)
        // console.log('Current props', this.props)
        // console.log('Prev State', prevState)
        // console.log('Current State', this.state)
        showNotification(this.props)
    }

    render() {
        return (
            <Card className="box-shadow-bottom">
                <Row type="flex" justify="center"><Icon type="lock" style={{ fontSize: '50px' }} /></Row>
                <Row type="flex" justify="center"><h6>Đổi mật khẩu</h6></Row>
                <Form className="form" onSubmit={this.handleSubmit}>
                    <Input
                        type="password" className="my-2" prefix={<Icon type="lock" />}
                        name="oldPassword"
                        onChange={this.handleFormChange}
                        placeholder="Current Password" />

                    <Input
                        type="password" className="my-2" prefix={<Icon type="lock" />}
                        name="newPassword"
                        onChange={this.handleFormChange}
                        placeholder="New Password" />

                    <Input
                        type="password" className="my-2" prefix={<Icon type="lock" />}
                        name="newPasswordConfirm"
                        onChange={this.handleFormChange}
                        placeholder="Confirm New Password" />

                    {this.state.errorPassword && <font color="red">{this.state.errorPassword}</font>}
                    {this.props.pending && <Spin>Sending...</Spin>}
                    <Button type="primary" htmlType="submit" className="my-2 w-100">Change password</Button>
                </Form>
            </Card>
        )
    }
}

const mapPropsToState = state => ({
    notification: state.user.notification,
    pending: state.user.pending
})

export default connect(mapPropsToState, null)(ChangePassword)
