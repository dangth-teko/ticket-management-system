import {
    LOGIN_SUBMIT,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_FAIL_3,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUBMIT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL
} from 'constants/actions'
import {
    ERROR_NONE,
    ERROR_GENERIC,
    ERROR_FORBIDDEN,
    ERROR_WRONG_PASSWORD_3_TIMES
} from 'constants/errors'
import { signin, logout } from 'utils/auth'
import { apiConstants } from 'constants/api'
import history from 'utils/history'
import Request from 'utils/request'

const login = (username, password) => dispatch => {
    dispatch({ type: LOGIN_SUBMIT })
    Request.post(apiConstants.POST_LOGIN, { username, password })
        .then(({ status, data: { data, error } }) => {
            if (status !== 200) {
                dispatch({ type: LOGIN_FAIL, data: error.message })
                return
            }

            switch (Number(error.code)) {
                case ERROR_NONE:
                    signin(data.token)
                    console.log(data.token)
                    Request.defaults.headers.common['Authorization'] = data.token
                    dispatch({ type: LOGIN_SUCCESS, data: data.token })
                    break
                case ERROR_GENERIC:
                    dispatch({ type: LOGIN_FAIL, data: error.message })
                    break
                case ERROR_FORBIDDEN:
                    logout()
                    break
                case ERROR_WRONG_PASSWORD_3_TIMES:
                    dispatch({ type: LOGIN_FAIL_3, data: "Bạn đã nhập sai password 3 lần trong 5 phút, vui lòng nhập captcha" })
                    break
                default:
            }
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: LOGIN_FAIL, data: error.message })
        })
}

const signup = (username, password, confirmPassword, email) => dispatch => {
    dispatch({ type: SIGNUP_SUBMIT })
    Request.post(apiConstants.POST_SIGNUP, { username, password, confirmPassword, email })
        .then(({ status, data: { data, error } }) => {
            if (status !== 200) {
                dispatch({ type: SIGNUP_FAIL, data: error.message })
                return
            }
            switch (Number(error.code)) {
                case ERROR_NONE:
                    dispatch({ type: SIGNUP_SUCCESS, data })
                    history.push("/")
                    break
                case ERROR_GENERIC:
                    dispatch({ type: SIGNUP_FAIL, data: error.message })
                    break
                case ERROR_FORBIDDEN:
                    logout()
                    break
                default:
            }
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: SIGNUP_FAIL, data: error.message })
        })
}

const resetPassword = (username, email) => dispatch => {
    Request.post(apiConstants.RESET_PASSWORD, { username, email })
        .then(({ status, data: { error, data } }) => {
            if (status !== 200) {
                dispatch({ type: RESET_PASSWORD_FAIL })
                return
            }

            switch (Number(error.code)) {
                case ERROR_NONE:
                    dispatch({ type: RESET_PASSWORD_SUCCESS, data: data })
                    break
                case ERROR_GENERIC:
                    dispatch({ type: RESET_PASSWORD_FAIL })
                    break
                case ERROR_FORBIDDEN:
                    logout()
                    break
                default:
            }
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: RESET_PASSWORD_FAIL, data: error.message })
        })
}

const changePassword = (oldPassword, newPassword, newPasswordConfirm) => dispatch => {
    console.log(newPasswordConfirm)
    Request.post(apiConstants.CHANGE_PASSWORD, { oldPassword, newPassword, newPasswordConfirm })
        .then(({ status, data: { data, error } }) => {
            if (status !== 200) {
                dispatch({ type: CHANGE_PASSWORD_SUCCESS, data })
                return
            }
            switch (Number(error.code)) {
                case ERROR_NONE:
                    dispatch({ type: CHANGE_PASSWORD_SUCCESS, data })
                    break
                case ERROR_GENERIC:
                    dispatch({ type: CHANGE_PASSWORD_FAIL, data })
                    break
                case ERROR_FORBIDDEN:
                    logout()
                    break
                default:
            }
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: CHANGE_PASSWORD_FAIL, data: error.message })
        })
}

const test = () => {
    Request.get('/test').then(response => console.log('DEBUG', response.data))
}

export {
    login,
    signup,
    resetPassword,
    changePassword,
    test
}
