import { logout as requestlogout } from 'actions/user'
import cookies from 'utils/cookies'
import Request from 'utils/request'
import { TOKEN } from 'constants/utils'
import { LOGIN_SUCCESS, LOGIN_FAIL } from 'constants/actions'


const verify = ({ dispatch }) => {
    const accessToken = cookies.get(TOKEN)
    if (!accessToken) {
        dispatch({ type: LOGIN_FAIL })
        return
    }
    Request.post('/auth').then(response => {
        dispatch({ type: LOGIN_SUCCESS, data: accessToken })
    }).catch(error => {
        logout()
    })
}

const logout = () => {
    cookies.remove(TOKEN)
    requestlogout()
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
