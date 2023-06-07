import { message } from 'antd'

export interface FormErrorInfo<Values = unknown> {
  values: Values
  errorFields: {
    name: (string | number)[]
    errors: string[]
  }[]
  outOfDate: boolean
}

export const showFormErrorMessage = (errorInfo: FormErrorInfo) => {
  if (errorInfo?.errorFields) {
    message.error(
      errorInfo.errorFields[0].errors.filter((err) => err.length > 0)[0]
    )
  }
}
