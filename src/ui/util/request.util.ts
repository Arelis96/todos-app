import { message } from 'antd'
import { AxiosError } from 'axios'

export const getRequestMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Unexpected Error'
}

export const showRequestErrorMessage = (error: unknown) => {
  message.error(getRequestMessage(error))
}
