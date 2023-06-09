import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Spin } from 'antd'
import { useMutation } from '@tanstack/react-query'

import { Category } from '../../../../../domain/models/category.model'
import { CategoryFormValues } from './CategoryForm.types'

import CategoryForm from './CategoryForm'

import api from '../../../../../data/api'
import { selectToken } from '../../../../state/session/session.selectors'
import useMessageService from '../../../../hooks/useMessage'

const { useForm } = Form

type ConnectedCategoryFormProps = {
  item?: Category
  onCompleted?: () => void
}

const ConnectedCategoryForm = ({
  item,
  onCompleted,
}: ConnectedCategoryFormProps) => {
  const messageService = useMessageService()

  const token = useSelector(selectToken) as string

  const [form] = useForm<CategoryFormValues>()

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name,
      })
    }

    return () => {
      form.resetFields()
    }
  }, [item, form])

  const handleCompleted = () => {
    messageService.success(item ? 'Categoria editada' : 'Categoria creada')
    if (onCompleted) {
      onCompleted()
    }
  }

  const createMutation = useMutation({
    mutationFn: api.category.create,
    onSuccess: handleCompleted,
  })

  const editMutation = useMutation({
    mutationFn: api.category.edit,
    onSuccess: handleCompleted,
  })

  const onSubmit = (values: CategoryFormValues) => {
    if (item) {
      editMutation.mutate({ token, id: item._id, body: values })
    } else {
      createMutation.mutate({ token, body: values })
    }
  }

  const isLoading = createMutation.isLoading || editMutation.isLoading

  return (
    <Spin spinning={isLoading}>
      <CategoryForm
        form={form}
        onSubmit={onSubmit}
        onSubmitError={messageService.showFormError}
        submitButtonText={item ? 'Editar' : 'Crear'}
      />
    </Spin>
  )
}

export default ConnectedCategoryForm
