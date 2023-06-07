import { FormInstance } from 'antd'

import { FormErrorInfo } from '../../../../util/form.util'

export type TodoFormValues = {
  title: string
  description?: string
  categories?: string[]
  isCompleted?: boolean
}

export type TodoFormProps = {
  form: FormInstance<TodoFormValues>
  onSubmit: (value: TodoFormValues) => void
  onSubmitError?: (error: FormErrorInfo) => void
  submitButtonText: string
}
