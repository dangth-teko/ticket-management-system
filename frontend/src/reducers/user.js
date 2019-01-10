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
    CHANGE_PASSWORD_SUBMIT,
    NOTI_TYPE_SUCCESS,
    NOTI_TYPE_FAIL,
    CLEAR_NOTI
} from 'constants/actions'

const initialState = {
    isAuthenticated: true,
    token: null,
    notification: null,
    error: null,
    pending: false
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUBMIT:
            return {
                ...state,
                error: null,
                pending: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                notification: { type: NOTI_TYPE_SUCCESS },
                isAuthenticated: true, token: action.data, error: null,
                pending: false
            }

        case LOGIN_FAIL:
            return {
                ...state,
                notification: { type: NOTI_TYPE_FAIL, message: action.data },
                isAuthenticated: false, token: null, error: null,
                pending: false
            }

        case LOGIN_FAIL_3:
            return {
                ...state,
                notification: { type: NOTI_TYPE_FAIL, message: action.data },
                isAuthenticated: false, token: null, error: LOGIN_FAIL_3,
                pending: false
            }

        case SIGNUP_SUBMIT:
            return {
                ...state,
                pending: true
            }

        case SIGNUP_SUCCESS:
            return {
                ...state,
                notification: { type: NOTI_TYPE_SUCCESS, message: 'Đăng ký tài khoản thành công, truy cập đường link đã được gửi tới email trong vòng 30 phút để kích hoạt tài khoản' },
                pending: false
            }

        case SIGNUP_FAIL:
            return {
                ...state,
                notification: { type: NOTI_TYPE_FAIL, message: action.data },
                pending: false
            }

        case CHANGE_PASSWORD_SUBMIT:
            return {
                ...state,
                pending: true
            }

        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                notification: { type: NOTI_TYPE_SUCCESS, message: 'Đổi mật khẩu thành công!' },
                pending: false
            }

        case CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                notification: { type: NOTI_TYPE_FAIL, message: action.data },
                pending: false
            }

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                notification: { type: NOTI_TYPE_SUCCESS, message: 'Mật khẩu mới đã được gửi tới email của bạn!' }
            }

        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                notification: { type: NOTI_TYPE_FAIL, message: action.data }
            }

        case CLEAR_NOTI:
            return {
                ...state,
                notification: null
            }

        default:
            return state
    }
}

export default UserReducer
