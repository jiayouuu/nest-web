import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStore } from '@/stores/user'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 5000,
})

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { user } = useUserStore()
    const token = user.token
    if (token && !config.headers.Authorization) config.headers!.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status && response.status !== 200) return Promise.reject(new Error('request error'))
    const { code, message, data } = response.data
    if (code === 401) {
      return Promise.reject(new Error('authentication failed'))
    }
    if (code !== 200) {
      return Promise.reject(new Error(message || 'request error'))
    }
    return data
  },
  (error) => {
    return Promise.reject(new Error(error))
  },
)

export { http }
