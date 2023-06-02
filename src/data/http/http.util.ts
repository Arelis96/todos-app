import { AxiosRequestConfig } from 'axios'

export const getRequestConfig = (token: string) => {
  const requestConfig: AxiosRequestConfig = { headers: {} }

  if (token && requestConfig.headers) {
    requestConfig.headers.Authorization = `Bearer ${token}`
  }

  return requestConfig
}
