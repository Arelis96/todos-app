import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Spin, message } from 'antd'
import { useMutation } from '@tanstack/react-query'

import { Todo } from '../../../../../domain/models/todo.model'
import { TodoFormValues } from './TodoForm.types'

import TodoForm from './TodoForm'

import api from '../../../../../data/api'
import { selectToken } from '../../../../state/session/session.selectors'
import { showFormErrorMessage } from '../../../../util/form.util'

const { useForm } = Form

type ConnectedTodoFormProps = {
  item?: Todo
  onCompleted?: () => void
}

const ConnectedTodoForm = ({ item, onCompleted }: ConnectedTodoFormProps) => {
  const token = useSelector(selectToken) as string

  const [form] = useForm<TodoFormValues>()

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        title: item.title,
        description: item.description,
        categories: item.categories.map((c) => c._id),
      })
    }

    return () => {
      form.resetFields()
    }
  }, [item, form])

  const handleCompleted = () => {
    message.success(item ? 'Tarea editada' : 'Tarea creada')
    if (onCompleted) {
      onCompleted()
    }
  }

  const createMutation = useMutation({
    mutationFn: api.todo.create,
    onSuccess: handleCompleted,
  })

  const editMutation = useMutation({
    mutationFn: api.todo.edit,
    onSuccess: handleCompleted,
  })

  const onSubmit = (values: TodoFormValues) => {
    if (item) {
      editMutation.mutate({ token, id: item._id, body: values })
    } else {
      createMutation.mutate({ token, body: values })
    }
  }

  const isLoading = createMutation.isLoading || editMutation.isLoading

  return (
    <Spin spinning={isLoading}>
      <TodoForm
        form={form}
        onSubmit={onSubmit}
        onSubmitError={showFormErrorMessage}
        submitButtonText={item ? 'Editar' : 'Crear'}
      />
    </Spin>
  )
}

export default ConnectedTodoForm
