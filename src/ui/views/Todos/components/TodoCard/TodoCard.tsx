import { Button, Card, Tag, Tooltip } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'

import { Todo } from '../../../../../domain/models/todo.model'

export type TodoCardProps = {
  data: Todo
  onEdit: (data: Todo) => void
}

const TodoCard = ({ data, onEdit }: TodoCardProps) => {
  const actions = [
    data.isCompleted ? (
      <Tooltip title='Descompletar'>
        <Button
          type='text'
          icon={<CloseOutlined className='!text-primary' />}
        />
      </Tooltip>
    ) : (
      <Tooltip title='Completar'>
        <Button
          type='text'
          icon={<CheckOutlined className='!text-primary' />}
        />
      </Tooltip>
    ),
    <Tooltip title='Editar'>
      <Button
        type='text'
        icon={<EditOutlined className='!text-primary' />}
        onClick={() => onEdit(data)}
      />
    </Tooltip>,
    <Tooltip title='Delete'>
      <Button type='text' icon={<DeleteOutlined className='!text-red-500' />} />
    </Tooltip>,
  ]

  return (
    <Card actions={actions}>
      <span className='text-base font-medium'>{data.title}</span>
      {data.description && (
        <p className='text-sm text-gray-500'>{data.description}</p>
      )}
      <div>
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
