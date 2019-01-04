import { message } from 'antd'
import {
    NOTI_TYPE_SUCCESS,
    NOTI_TYPE_FAIL,
    CLEAR_NOTI
} from 'constants/actions'

const showNotification = ({ notification, dispatch }, successDisplaytime = 4, errorDisplaytime = 2) => {
    if (!notification || !notification.message) return
    if (notification.type === NOTI_TYPE_SUCCESS) message.success(notification.message, successDisplaytime)
    if (notification.type === NOTI_TYPE_FAIL) message.error(notification.message, errorDisplaytime)
    dispatch({ type: CLEAR_NOTI })
}

export {
    showNotification
}
