import Axios from 'axios'
import { BASE_URL } from 'constants/api'
import { ERROR_GENERIC, ERROR_FORBIDDEN } from 'constants/errors'
import { TOKEN } from 'constants/utils'
import { logout } from 'utils/auth'
import cookies from 'utils/cookies'

let instance = Axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
})

instance.interceptors.request.use(request => {
    const accessToken = cookies.get(TOKEN)
    if (accessToken) request.headers = {...request.headers, Authorization: accessToken}
    return request
})

instance.interceptors.response.use(response => {
    if (response.data.error) {
        if (response.data.error.code === ERROR_FORBIDDEN) {
            logout()
            return Promise.reject()
        }
        if (response.data.error.code === ERROR_GENERIC) {
            return Promise.reject(new Error(response.data.error.message))
        }
    }
    return response
}, error => {
    if (error.response && error.response.status === 401) logout()
    return Promise.reject(error)
})

export default instance
