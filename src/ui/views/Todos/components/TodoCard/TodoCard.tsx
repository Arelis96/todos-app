import { Button, Card, Checkbox, Popconfirm, Tag } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleFilled,
} from '@ant-design/icons'

import { Todo } from '../../../../../domain/models/todo.model'

import { useOnlineAction } from '../../../../util/online.util'

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
  const onlineAction = useOnlineAction()

  const onChangeCheckbox = () => {
    data.isCompleted ? onUncompleted(data) : onCompleted(data)
  }

  const actions = [
    <div className='h-8 flex items-center justify-center'>
      <Checkbox
        checked={data.isCompleted}
        onChange={() => onlineAction(onChangeCheckbox)}
      />
    </div>,
    <Button
      type='text'
      icon={<EditOutlined className='!text-primary' />}
      onClick={() => onlineAction(() => onEdit(data))}
      className='!text-primary'
    />,
    <Popconfirm
      title='Eliminar tarea'
      description='¿Estás seguro?'
      onConfirm={() => onlineAction(() => onDelete(data))}
      okButtonProps={{ danger: true, className: '!bg-red-500' }}
      icon={<InfoCircleFilled className='!text-red-500' />}
    >
      <Button
        type='text'
        icon={<DeleteOutlined className='!text-red-500' />}
        className='!text-red-500'
      />
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
