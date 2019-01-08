import cookies from 'utils/cookies'
import { TOKEN } from 'constants/utils'
import { LOGIN_SUCCESS, LOGIN_FAIL } from 'constants/actions'
import Request from 'utils/request'

const verify = ({ dispatch }) => {
    const accessToken = cookies.get(TOKEN)
    if (accessToken) {
        console.log('Logged In')
        Request.defaults.headers.common['Authorization'] = accessToken
        dispatch({ type: LOGIN_SUCCESS, data: accessToken })
    } else
        dispatch({ type: LOGIN_FAIL })
}

const logout = () => {
    cookies.remove(TOKEN)
    Request.defaults.headers.common['Authorization'] = null
    window.location.reload()
}

const signin = token => {
    cookies.set(TOKEN, token)
    Request.defaults.headers.common['Authorization'] = token
}

export {
    verify,
    signin,
    logout
}
