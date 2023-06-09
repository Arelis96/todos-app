import { Button, Form, Input } from 'antd'

import { CategoryFormProps } from './CategoryForm.types'

const { Item } = Form

const CategoryForm = ({
  form,
  onSubmit,
  onSubmitError,
  submitButtonText,
}: CategoryFormProps) => {
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      onFinishFailed={onSubmitError}
      layout='vertical'
    >
      <Item name='name' label='Nombre' rules={[{ required: true }]}>
        <Input placeholder='Nombre' />
      </Item>
      <Button type='primary' htmlType='submit' block>
        {submitButtonText}
      </Button>
    </Form>
  )
}

CategoryForm.defaultProps = {
  submitButtonText: 'Guardar',
} as CategoryFormProps

export default CategoryForm
