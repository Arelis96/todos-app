import { Button, Card, Popconfirm, Tag, Tooltip } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleFilled,
} from '@ant-design/icons'

import { Todo } from '../../../../../domain/models/todo.model'

export type TodoCardProps = {
  data: Todo
  onEdit: (data: Todo) => void
  onDelete: (data: Todo) => void
  onCompleted: (data: Todo) => void
  onUncompleted: (data: Todo) => void
}

const TodoCard = ({
  data,
  onEdit,
  onDelete,
  onCompleted,
  onUncompleted,
}: TodoCardProps) => {
  const actions = [
    data.isCompleted ? (
      <Tooltip title='Sin completar' placement='bottom'>
        <Button
          type='text'
          icon={<CloseOutlined className='!text-primary' />}
          onClick={() => onUncompleted(data)}
        />
      </Tooltip>
    ) : (
      <Tooltip title='Completar' placement='bottom'>
        <Button
          type='text'
          icon={<CheckOutlined className='!text-primary' />}
          onClick={() => onCompleted(data)}
        />
      </Tooltip>
    ),
    <Tooltip title='Editar' placement='bottom'>
      <Button
        type='text'
        icon={<EditOutlined className='!text-primary' />}
        onClick={() => onEdit(data)}
      />
    </Tooltip>,

    <Popconfirm
      title='Eliminar tarea'
      description='¿Estás seguro?'
      onConfirm={() => onDelete(data)}
      okButtonProps={{ danger: true, className: '!bg-red-500' }}
      icon={<InfoCircleFilled className='!text-red-500' />}
    >
      <Tooltip title='Eliminar' placement='bottom'>
        <Button
          type='text'
          icon={<DeleteOutlined className='!text-red-500' />}
        />
      </Tooltip>
    </Popconfirm>,
  ]

  return (
    <Card actions={actions}>
      <div className='flex justify-between'>
        <span className='text-base font-medium'>{data.title}</span>
        {data.isCompleted && (
          <Tag color='white' className='!bg-green-700'>
            Completada
          </Tag>
        )}
      </div>
      {data.description && (
        <p className='text-sm text-gray-500 mt-1'>{data.description}</p>
      )}
      <div className='mt-2'>
        {data.categories.map((category) => (
          <Tag
            key={category._id}
            color='white'
            className='!bg-gray-200 !text-gray-600'
          >
            {category.name}
          </Tag>
        ))}
      </div>
    </Card>
  )
}

export default TodoCard
