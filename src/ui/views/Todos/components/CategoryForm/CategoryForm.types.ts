import { FormInstance } from 'antd'

import { FormErrorInfo } from '../../../../util/form.util'

export type CategoryFormValues = {
  name: string
}

export type CategoryFormProps = {
  form: FormInstance<CategoryFormValues>
  onSubmit: (value: CategoryFormValues) => void
  onSubmitError?: (error: FormErrorInfo) => void
  submitButtonText: string
}
