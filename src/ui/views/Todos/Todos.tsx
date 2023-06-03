import { Avatar, Button, Card, Col, FloatButton, Row, Tag, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../state/session/session.slice'
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  LogoutOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import { selectSession } from '../../state/session/session.selectors'
import { Session } from '../../../domain/models/session.model'

const Header = () => {
  const session = useSelector(selectSession) as Session

  return (
    <div className='py-3 px-6 flex justify-between items-center'>
      <span className='text-lg font-medium'>TodoApp</span>
      <div className='flex items-center gap-2'>
        <span className='text-sm'>{session.user.name}</span>
        <Avatar className='bg-primary'>
          {session.user.name[0].toUpperCase()}
        </Avatar>
      </div>
    </div>
  )
}

const Todos = () => {
  const dispatch = useDispatch()

  const onClickLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='view'>
      <Header />
      <div className='container py-6'>
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-medium'>Mis tareas</span>
          <Button icon={<ReloadOutlined />} />
        </div>
        <div className='mt-6'>
          {Array.from({ length: 12 }).map((_, i) => {
            return (
              <Tag
                color='white'
                className={
                  i % 2 === 0
                    ? '!bg-primary !h-6'
                    : '!bg-gray-100 !text-gray-600 !h-6'
                }
              >
                Category
              </Tag>
            )
          })}
          <Tooltip title='Editar categorias'>
            <Button icon={<EditOutlined />} size='small' />
          </Tooltip>
        </div>
        <Row gutter={16} className='mt-6 gap-y-3'>
          {Array.from({ length: 8 }, (_, i) => {
            return (
              <Col key={i} span={24} md={12}>
                <Card
                  actions={[
                    <Tooltip title='Completar'>
                      <CheckOutlined className='!text-green-500' />
                    </Tooltip>,
                    <Tooltip title='Editar'>
                      <EditOutlined className='!text-blue-500' />
                    </Tooltip>,
                    <Tooltip title='Delete'>
                      <DeleteOutlined className='!text-red-500' />
                    </Tooltip>,
                  ]}
                >
                  <span className='text-base font-medium'>Task</span>
                  <p className='text-sm text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officia unde magni alias.
                  </p>
                  <div>
                    {['Category 1', 'Category 2', 'Category 3'].map((value) => (
                      <Tag key={value} color='var(--primary)'>
                        {value}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
      <FloatButton.Group>
        <Tooltip title='Cerrar Sessión' placement='left'>
          <FloatButton icon={<LogoutOutlined />} onClick={onClickLogout} />
        </Tooltip>
        <Tooltip title='Crear tarea' placement='left'>
          <FloatButton icon={<PlusOutlined />} type='primary' />
        </Tooltip>
      </FloatButton.Group>
    </div>
  )
}

export default Todos
