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
import { BASE_URL, apiConstants } from 'constants/api'

const login = (username, password) => dispatch => {
    const request_url = BASE_URL + apiConstants.POST_LOGIN
    console.log('Submitting to...', request_url)

    Axios.post(request_url, { username, password })
        .then(response => {
            if (response.status === 200)
                dispatch({ type: LOGIN_SUCCESS, data: response.data })
            else
                dispatch({ type: LOGIN_FAIL, data: response.data })
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
        .then(response => {
            if (response.status === 200)
                dispatch({ type: SIGNUP_SUCCESS, data: response.data })
            else
                dispatch({ type: SIGNUP_FAIL, data: response.data })
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
        .then(response => {
            if (response.status === 200)
                dispatch({ type: RESET_PASSWORD_SUCCESS, data: response.data })
            else
                dispatch({ type: RESET_PASSWORD_FAIL, data: response.data })
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
        .then(response => {
            if (response.status === 200)
                dispatch({ type: CHANGE_PASSWORD_SUCCESS, data: response.data })
            else
                dispatch({ type: CHANGE_PASSWORD_FAIL, data: response.data })
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
