import cookies from 'utils/cookies'
import { TOKEN } from 'constants/utils'
import { LOGIN_SUCCESS, LOGIN_FAIL } from 'constants/actions'
import Request from 'utils/request'

const verify = ({ dispatch }) => {
    const accessToken = cookies.get(TOKEN)
    if (!accessToken) {
        dispatch({ type: LOGIN_FAIL })
        return
    }
    Request.get('/auth').then(response => {
        dispatch({ type: LOGIN_SUCCESS, data: accessToken })
    }).catch(error => {
        logout()
    })
}

const logout = () => {
    cookies.remove(TOKEN)
    window.location.reload()
}

const signin = token => {
    cookies.set(TOKEN, token)
}

export {
    verify,
    signin,
    logout
}
