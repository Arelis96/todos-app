import { Button, Form, Input } from 'antd'

import { LoginFormProps } from './LoginForm.types'

const { Item } = Form
const { Password } = Input

const LoginForm = ({
  form,
  className,
  onSubmit,
  onSubmitError,
  loading,
}: LoginFormProps) => {
  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onSubmit}
      onFinishFailed={onSubmitError}
      className={className}
    >
      <Item name='email' label='Correo' rules={[{ required: true }]}>
        <Input placeholder='Correo' />
      </Item>
      <Item name='password' label='Contraseña' rules={[{ required: true }]}>
        <Password placeholder='Contraseña' />
      </Item>
      <Button
        type='primary'
        htmlType='submit'
        loading={loading}
        block
        style={{ marginTop: 4 }}
      >
        Ingresar
      </Button>
    </Form>
  )
}

LoginForm.defaultProps = {
  className: '',
}

export default LoginForm
