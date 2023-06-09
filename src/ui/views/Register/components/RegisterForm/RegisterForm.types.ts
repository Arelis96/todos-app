import { FormInstance } from 'antd'

import { FormErrorInfo } from '../../../../util/form.util'

export type RegisterFormValues = {
  name: string
  email: string
  password: string
}

export type RegisterFormProps = {
  form: FormInstance<RegisterFormValues>
  className?: string
  onSubmit: (values: RegisterFormValues) => void
  onSubmitError?: (error: FormErrorInfo) => void
  loading?: boolean
}
