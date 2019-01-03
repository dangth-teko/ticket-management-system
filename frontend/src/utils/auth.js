import cookies from 'utils/cookies'
import { TOKEN } from 'constants/utils'

const check = () => {
    return cookies.get(TOKEN) != null
}
const logout = () => {
    cookies.remove(TOKEN)
    window.location.reload()
}

const signin = token => {
    cookies.set(TOKEN, token)
}

export {
    check,
    signin,
    logout
}
