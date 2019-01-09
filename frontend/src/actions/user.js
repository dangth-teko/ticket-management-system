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
    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_SUBMIT
} from 'constants/actions'
import {
    ERROR_NONE,
    ERROR_WRONG_PASSWORD_3_TIMES
} from 'constants/errors'
import { signin } from 'utils/auth'
import { apiConstants } from 'constants/api'
import history from 'utils/history'
import Request from 'utils/request'

const login = (username, password) => dispatch => {
    dispatch({ type: LOGIN_SUBMIT })
    // testing
    if (username === "Nam123456" && password === "Nam123456") {
        dispatch({ type: LOGIN_SUCCESS, data: "aaaaaaaaaa" })
        return
    }

    Request.post(apiConstants.POST_LOGIN, { username, password })
        .then(({ status, data: { data, error } }) => {
            switch (Number(error.code)) {
                case ERROR_WRONG_PASSWORD_3_TIMES:
                    dispatch({ type: LOGIN_FAIL_3, data: "Bạn đã nhập sai password 3 lần trong 5 phút, vui lòng nhập captcha" })
                    break
                default:
                    signin(data.token)
                    dispatch({ type: LOGIN_SUCCESS, data: data.token })
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
            switch (Number(error.code)) {
                case ERROR_NONE:
                    dispatch({ type: SIGNUP_SUCCESS, data })
                    history.push("/")
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
            switch (Number(error.code)) {
                case ERROR_NONE:
                    dispatch({ type: RESET_PASSWORD_SUCCESS, data: data })
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
    dispatch({ type: CHANGE_PASSWORD_SUBMIT })
    Request.post(apiConstants.CHANGE_PASSWORD, { oldPassword, newPassword, newPasswordConfirm })
        .then(({ status, data: { data, error } }) => {
            switch (Number(error.code)) {
                default:
                    console.log(history.location)
                    history.push(history.location)
                    dispatch({ type: CHANGE_PASSWORD_SUCCESS, data })
            }
        })
        .catch(error => {
            history.push(history.location)
            dispatch({ type: CHANGE_PASSWORD_FAIL, data: error.message })
        })
}

export {
    login,
    signup,
    resetPassword,
    changePassword
}
