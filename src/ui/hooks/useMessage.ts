import { App } from 'antd'
import { FormErrorInfo } from '../util/form.util'

const useMessageService = () => {
  const { message } = App.useApp()

  const showFormError = (errorInfo: FormErrorInfo) => {
    if (errorInfo?.errorFields) {
      message.error(
        errorInfo.errorFields[0].errors.filter((err) => err.length > 0)[0]
      )
    }
  }

  const showOfflineWarning = () => {
    message.warning('Necesitas conexión a internet para realizar esta acción')
  }

  return {
    showFormError,
    showOfflineWarning,
    success: message.success,
    error: message.error,
    warning: message.warning,
    info: message.info,
  }
}

export default useMessageService
