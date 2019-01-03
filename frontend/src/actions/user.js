import Axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
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
import { logout } from 'utils/auth'

import { BASE_URL, apiConstants } from 'constants/api'

const login = (username, password) => dispatch => {
    const request_url = BASE_URL + apiConstants.POST_LOGIN
    console.log('Submitting to...', request_url)
    Axios.post(request_url, { username, password })
        .then(({ status, data: { data, error } }) => {
            if (status !== 200) {
                dispatch({ type: LOGIN_FAIL, data: error.message })
                return
            }
            console.log('DEBUG', error, data)
            switch (Number(error.code)) {
                case ERROR_NONE:
                    dispatch({ type: LOGIN_SUCCESS, data: data.token })
                    break
                case ERROR_GENERIC:
                    dispatch({ type: LOGIN_FAIL, data: error.message })
                    break
                case ERROR_FORBIDDEN:
                    logout()
                    break
                case ERROR_WRONG_PASSWORD_3_TIMES:
                    dispatch({ type: LOGIN_FAIL, data: "Bạn đã nhập sai password 3 lần trong 5 phút, vui lòng nhập captcha" })
                    break
                default:
            }
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: LOGIN_FAIL, data: error.message })
        })
}

const signup = (username, password, email) => dispatch => {
    const request_url = BASE_URL + apiConstants.POST_SIGNUP
    console.log('Submitting to...', request_url)

    Axios.post(request_url, { username, password, email })
        .then(({ status, data: { data, error } }) => {
            if (status !== 200) {
                dispatch({ type: SIGNUP_FAIL, data: error.message })
                return
            }
            switch (Number(error.code)) {
                case ERROR_NONE:
                    dispatch({ type: SIGNUP_SUCCESS, data })
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
    const request_url = BASE_URL + apiConstants.RESET_PASSWORD
    console.log('Submitting to...', request_url)

    Axios.post(request_url, { username, email })
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
    const request_url = BASE_URL + apiConstants.RESET_PASSWORD
    console.log('Submitting to...', request_url)

    Axios.post(request_url, { oldPassword, newPassword, newPasswordConfirm })
        .then(({ status, data: { data, error } }) => {
            if (status !== 200) {
                dispatch({ type: CHANGE_PASSWORD_SUCCESS, data })
                return
            }
            switch (Number(error.code)) {
                case ERROR_NONE:
                    dispatch({type: CHANGE_PASSWORD_SUCCESS, data})
                    break
                case ERROR_GENERIC:
                    dispatch({type: CHANGE_PASSWORD_FAIL, data})
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

export {
    login,
    signup,
    resetPassword,
    changePassword
}
