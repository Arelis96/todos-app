import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Alert, Button, Card, Form } from 'antd'
import { useMutation } from '@tanstack/react-query'

import { Session } from '../../../domain/models/session.model'
import { LoginFormValues } from './components/LoginForm/LoginForm.types'

import LoginForm from './components/LoginForm/LoginForm'

import api from '../../../data/api'
import { RoutePaths } from '../../navigation/constants'
import { login } from '../../state/session/session.slice'
import useMessageService from '../../hooks/useMessage'
import useIsOnline from '../../hooks/useIsOnline'

import './Login.css'

const { useForm } = Form

const Login = () => {
  const messageService = useMessageService()

  const [form] = useForm<LoginFormValues>()

  const dispatch = useDispatch()

  const isOnline = useIsOnline()

  const onSuccess = (data: Session) => {
    dispatch(login(data))
    messageService.success('Bienvenido')
  }

  const mutation = useMutation({
    mutationFn: api.auth.login,
    onSuccess,
  })

  const onSubmitForm = (values: LoginFormValues) => {
    if (!isOnline) {
      messageService.showOfflineWarning()
      return
    }
    mutation.mutate({ body: values })
  }

  return (
    <div className='view container login'>
      {!isOnline && (
        <Alert
          className='mb-4 text-center'
          type='warning'
          message='Sin conexión'
          description='No podras ingresar hasta conectarte a internet'
        />
      )}
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
