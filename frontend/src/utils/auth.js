import cookies from 'utils/cookies'
import { TOKEN } from 'constants/utils'
import { LOGIN_SUCCESS, LOGIN_FAIL } from 'constants/actions'

const verify = ({ dispatch }) => {
    const accessToken = cookies.get(TOKEN)
    if (accessToken)
        dispatch({ type: LOGIN_SUCCESS, data: accessToken })
    else
        dispatch({ type: LOGIN_FAIL })
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
