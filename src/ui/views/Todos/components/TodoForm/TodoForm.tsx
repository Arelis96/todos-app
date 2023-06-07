import { useSelector } from 'react-redux'
import { Button, Form, Input, Select } from 'antd'
import { useQuery } from '@tanstack/react-query'

import { TodoFormProps } from './TodoForm.types'

import api from '../../../../../data/api'
import { selectToken } from '../../../../state/session/session.selectors'

const { Item } = Form
const { TextArea } = Input

const TodoForm = ({
  form,
  onSubmit,
  onSubmitError,
  submitButtonText,
}: TodoFormProps) => {
  const token = useSelector(selectToken) as string

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.category.findAll({ token }),
  })

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      onFinishFailed={onSubmitError}
      layout='vertical'
    >
      <Item name='title' label='Titulo' rules={[{ required: true }]}>
        <Input placeholder='Titulo' />
      </Item>
      <Item name='description' label='Descripción'>
        <TextArea placeholder='Descripción' />
      </Item>
      <Item name='categories' label='Categorias'>
        <Select
          placeholder='Categorias'
          options={categoriesQuery.data?.map((category) => ({
            label: category.name,
            value: category._id,
          }))}
          mode='multiple'
          loading={categoriesQuery.isLoading || categoriesQuery.isFetching}
        />
      </Item>
      <Button type='primary' htmlType='submit' block className='mt-2'>
        {submitButtonText}
      </Button>
    </Form>
  )
}

TodoForm.defaultProps = {
  submitButtonText: 'Guardar',
} as TodoFormProps

export default TodoForm
