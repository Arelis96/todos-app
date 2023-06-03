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
    <div
      style={{
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 500 }}>TodoApp</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14 }}>{session.user.name}</span>
        <Avatar style={{ background: 'var(--primary)' }}>
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
      <div
        className='container'
        style={{
          paddingTop: 24,
          paddingBottom: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 24 }}>Mis tareas</span>
          <Button icon={<ReloadOutlined />} />
        </div>
        <Row gutter={16} style={{ marginTop: 24, rowGap: 16 }}>
          {Array.from({ length: 8 }, (_, i) => {
            return (
              <Col key={i} span={24} md={12}>
                <Card
                  actions={[
                    <Tooltip title='Completar'>
                      <CheckOutlined />
                    </Tooltip>,
                    <Tooltip title='Editar'>
                      <EditOutlined />
                    </Tooltip>,
                    <Tooltip title='Delete'>
                      <DeleteOutlined />
                    </Tooltip>,
                  ]}
                >
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Task</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officia unde magni alias.
                  </p>
                  <div>
                    {['Category 1', 'Category 2', 'Category 3'].map((value) => (
                      <Tag key={value}>{value}</Tag>
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
