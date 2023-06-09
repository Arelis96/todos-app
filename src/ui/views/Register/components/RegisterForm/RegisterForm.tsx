import { Button, Form, Input } from 'antd'

import { RegisterFormProps } from './RegisterForm.types'

const { Item } = Form
const { Password } = Input

const RegisterForm = ({
  form,
  className,
  onSubmit,
  onSubmitError,
  loading,
}: RegisterFormProps) => {
  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onSubmit}
      onFinishFailed={onSubmitError}
      className={className}
    >
      <Item name='name' label='Nombre' rules={[{ required: true }]}>
        <Input placeholder='Nombre' />
      </Item>
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
        Registrarme
      </Button>
    </Form>
  )
}

RegisterForm.defaultProps = {
  className: '',
}

export default RegisterForm
