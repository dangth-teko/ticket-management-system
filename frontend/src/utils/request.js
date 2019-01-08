import Axios from 'axios'
import { BASE_URL } from 'constants/api'

let instance = Axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
})

export default instance
