import { FormInstance } from 'antd'

import { FormErrorInfo } from '../../../../util/form.util'

export type LoginFormValues = {
  email: string
  password: string
}

export type LoginFormProps = {
  form: FormInstance<LoginFormValues>
  className?: string
  onSubmit: (values: LoginFormValues) => void
  onSubmitError?: (error: FormErrorInfo) => void
  loading?: boolean
}
