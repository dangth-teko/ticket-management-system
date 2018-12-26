import { LOGIN_SUCCESS, LOGIN_FAIL } from 'constants/actions'
// import { BASE_URL } from 'constants/api'
// import Cookies from 'universal-cookie'
// const cookies = new Cookies()

const initialState = {
    isLogined: false,
    token: null,
    error: null
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            // cookies.set('my-token', action.data, { path: BASE_URL })
            return {
                isLogined: true,
                token: action.data,
                error: null
            }
        case LOGIN_FAIL:
            return {
                isLogined: false,
                token: null,
                error: action.data
            }
        default:
            return state
    }
}

export default UserReducer