import { useDispatch } from 'react-redux'
import { Card, Form, message } from 'antd'
import { useMutation } from '@tanstack/react-query'

import { Session } from '../../../domain/models/session.model'
import { LoginFormValues } from './components/LoginForm/LoginForm.types'

import LoginForm from './components/LoginForm/LoginForm'

import api from '../../../data/api'
import { login } from '../../state/session/session.slice'

import './Login.css'

const { useForm } = Form

const Login = () => {
  const [form] = useForm<LoginFormValues>()

  const dispatch = useDispatch()

  const onSuccess = (data: Session) => {
    dispatch(login(data))
    message.success('Bienvenido')
  }

  const mutation = useMutation({
    mutationFn: api.auth.login,
    onSuccess,
  })

  const onSubmitForm = (values: LoginFormValues) => {
    mutation.mutate({ body: values })
  }

  return (
    <div className='view container login'>
      <h1>TodoApp</h1>
      <Card className='login__card'>
        <span className='login__subtitle'>Login</span>
        <LoginForm
          form={form}
          onSubmit={onSubmitForm}
          loading={mutation.isLoading}
          className='login__form'
        />
      </Card>
    </div>
  )
}

export default Login
