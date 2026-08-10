import axios from 'axios'
import auth from './auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://mycontactbackenddep.vercel.app/',
})

api.interceptors.request.use((config) => {
  const token = auth.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Logout and redirect on 401 (token expired/invalid)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status
    if (status === 401) {
      auth.removeToken()
      // force navigate to login
      try{
        window.location.href = '/login'
      }catch(e){}
    }
    return Promise.reject(err)
  }
)

export default api
