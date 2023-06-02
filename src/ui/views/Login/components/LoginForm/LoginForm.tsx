import { Button, Form, Input } from 'antd'

import { LoginFormProps } from './LoginForm.types'

const { Item } = Form

const LoginForm = ({ form, className, onSubmit }: LoginFormProps) => {
  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onSubmit}
      className={className}
    >
      <Item name='email' label='Correo' rules={[{ required: true }]}>
        <Input placeholder='Correo' />
      </Item>
      <Item name='password' label='Contraseña' rules={[{ required: true }]}>
        <Input placeholder='Contraseña' />
      </Item>
      <Button type='primary' htmlType='submit' block style={{ marginTop: 4 }}>
        Ingresar
      </Button>
    </Form>
  )
}

LoginForm.defaultProps = {
  className: '',
}

export default LoginForm
