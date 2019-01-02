import { TOKEN } from 'constants/utils'

const logout = () => {
    localStorage.removeItem(TOKEN)
    window.location.reload()
}

export default logout
