import { FormInstance } from 'antd'

export type LoginFormValues = {
  email: string
  password: string
}

export type LoginFormProps = {
  form: FormInstance<LoginFormValues>
  className?: string
  onSubmit: (values: LoginFormValues) => void
  loading?: boolean
}
