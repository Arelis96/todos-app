import { Card, Form } from 'antd'
import { useMutation } from '@tanstack/react-query'

import { LoginFormValues } from './components/LoginForm/LoginForm.types'

import LoginForm from './components/LoginForm/LoginForm'

import api from '../../../data/api'

import './Login.css'

const { useForm } = Form

const Login = () => {
  const [form] = useForm<LoginFormValues>()

  const mutation = useMutation({
    mutationFn: api.auth.login,
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
          className='login__form'
        />
      </Card>
    </div>
  )
}

export default Login
