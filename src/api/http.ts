/**
 * Axios 实例与拦截器
 * 统一的 HTTP 请求封装，支持 token 自动附加、401 重定向、网络错误提示
 */
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import qs from 'qs'
import { getApiBaseUrl } from '@/utils/env'

const httpClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
})

// 请求拦截器：自动附加 token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器：统一错误处理
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      const { status } = error.response
      if (status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        window.location.href = '/401'
      }
    } else if (error.message?.includes('Network Error')) {
      console.error('Network error:', error.message)
    }
    return Promise.reject(error)
  },
)

export function get<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
  return httpClient.get(url, { params, ...config }) as Promise<T>
}

export function post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
  return httpClient.post(url, data, config) as Promise<T>
}

export function put<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
  return httpClient.put(url, data, config) as Promise<T>
}

export function del<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
  return httpClient.delete(url, { params, ...config }) as Promise<T>
}

export default httpClient
