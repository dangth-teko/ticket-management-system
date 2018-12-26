import Axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from 'constants/actions'
import { BASE_URL, apiConstants } from 'constants/api'

const submitLogin = (username, password) => dispatch => {
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

const submitSignup = (username, password, email) => dispatch => {
    const request_url = BASE_URL + apiConstants.POST_SIGNUP
    console.log('Submitting to...', request_url)

    Axios.post(request_url, { username, password, email })
        .then(response => {
            if (response.status === 200)
                dispatch({type: SIGNUP_SUCCESS, data: response.data})
            else
                dispatch({type: SIGNUP_FAIL, data: response.data})
        })
        .catch(error => {
            console.log(error)
            dispatch({type: SIGNUP_FAIL, data: error.message})
        })
}

export {
    submitLogin,
    submitSignup
}