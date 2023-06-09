import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Card, Form } from 'antd'
import { useMutation } from '@tanstack/react-query'

import { Session } from '../../../domain/models/session.model'
import { LoginFormValues } from './components/LoginForm/LoginForm.types'

import LoginForm from './components/LoginForm/LoginForm'

import api from '../../../data/api'
import { RoutePaths } from '../../navigation/constants'
import { login } from '../../state/session/session.slice'
import useMessageService from '../../hooks/useMessage'

import './Login.css'

const { useForm } = Form

const Login = () => {
  const messageService = useMessageService()

  const [form] = useForm<LoginFormValues>()

  const dispatch = useDispatch()

  const onSuccess = (data: Session) => {
    dispatch(login(data))
    messageService.success('Bienvenido')
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
        <span className='login__subtitle'>Iniciar sesión</span>
        <LoginForm
          form={form}
          onSubmit={onSubmitForm}
          onSubmitError={messageService.showFormError}
          loading={mutation.isLoading}
          className='login__form'
        />
        <div className='flex flex-col items-center mt-3 gap-3'>
          <span>ó</span>
          <Link to={RoutePaths.register} className='w-full'>
            <Button block>Registrarme</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Login
