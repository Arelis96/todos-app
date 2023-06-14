import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Alert, Button, Card, Form } from 'antd'
import { useMutation } from '@tanstack/react-query'

import { Session } from '../../../domain/models/session.model'
import { RegisterFormValues } from './components/RegisterForm/RegisterForm.types'

import RegisterForm from './components/RegisterForm/RegisterForm'

import api from '../../../data/api'
import { RoutePaths } from '../../navigation/constants'
import { login } from '../../state/session/session.slice'
import useMessageService from '../../hooks/useMessage'
import useIsOnline from '../../hooks/useIsOnline'

import './Register.css'

const { useForm } = Form

const Register = () => {
  const messageService = useMessageService()

  const [form] = useForm<RegisterFormValues>()

  const isOnline = useIsOnline()

  const dispatch = useDispatch()

  const onSuccess = (data: Session) => {
    dispatch(login(data))
    messageService.success('Bienvenido')
  }

  const mutation = useMutation({
    mutationFn: api.auth.register,
    onSuccess,
  })

  const onSubmitForm = (values: RegisterFormValues) => {
    if (!isOnline) {
      messageService.showOfflineWarning()
      return
    }
    mutation.mutate({ body: values })
  }

  return (
    <div className='view container register'>
      {!isOnline && (
        <Alert
          className='mb-4 text-center'
          type='warning'
          message='Sin conexión'
          description='No podras ingresar hasta conectarte a internet'
        />
      )}
      <h1>TodoApp</h1>
      <Card className='register__card'>
        <span className='register__subtitle'>Registro</span>
        <RegisterForm
          form={form}
          onSubmit={onSubmitForm}
          onSubmitError={messageService.showFormError}
          loading={mutation.isLoading}
          className='register__form'
        />
        <div className='flex flex-col items-center mt-3 gap-3'>
          <span>ó</span>
          <Link to={RoutePaths.login} className='w-full'>
            <Button block>Iniciar sesión</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Register
