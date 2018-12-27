import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    NOTI_TYPE_SUCCESS,
    NOTI_TYPE_FAIL,
    CLEAR_NOTI
} from 'constants/actions'

const initialState = {
    isLogined: false,
    token: null,
    notification: null
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            // cookies.set('my-token', action.data, { path: BASE_URL })
            return { ...state, notification: { type: NOTI_TYPE_SUCCESS, message: 'Đăng nhập thành công' }, isLogined: true, token: action.data }

        case LOGIN_FAIL:
            return { ...state, isLogined: false, token: null, error: action.data }

        case SIGNUP_SUCCESS:
            return { ...state, notification: { type: NOTI_TYPE_SUCCESS, message: 'Đăng ký tài khoản thành công, truy cập đường link đã được gửi tới email trong vòng 30 phút để kích hoạt tài khoản' } }

        case SIGNUP_FAIL:
            return { ...state, notification: { type: NOTI_TYPE_FAIL, message: action.data } }

        case RESET_PASSWORD_SUCCESS:
            return { ...state, notification: { type: NOTI_TYPE_SUCCESS, message: 'Mật khẩu mới đã được gửi tới email của bạn!' } }

        case RESET_PASSWORD_FAIL:
            return { ...state, notification: { type: NOTI_TYPE_FAIL, message: action.data } }

        case CLEAR_NOTI:
            return { ...state, notification: null }

        default:
            return state
    }
}

export default UserReducer