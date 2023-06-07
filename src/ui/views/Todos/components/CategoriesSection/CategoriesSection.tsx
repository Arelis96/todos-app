import { useSelector } from 'react-redux'
import { Button, Card, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'

import api from '../../../../../data/api'
import { selectToken } from '../../../../state/session/session.selectors'

const queryKey = ['categories']

const CategoriesSection = () => {
  const token = useSelector(selectToken) as string

  const query = useQuery({
    queryKey,
    queryFn: () => api.category.findAll({ token }),
  })

  return (
    <div>
      <Button type='primary' icon={<PlusOutlined />} block>
        Agregar
      </Button>
      <div className='flex flex-col gap-2 mt-4'>
        {query.data?.map((category) => {
          return (
            <Card key={category._id}>
              <div className='flex justify-between items-center'>
                <span className='text-md'>{category.name}</span>
                <div className='flex gap-1'>
                  <Tooltip title='Editar'>
                    <Button type='link' icon={<EditOutlined />} />
                  </Tooltip>
                  <Tooltip title='Eliminar'>
                    <Button type='link' icon={<DeleteOutlined />} danger />
                  </Tooltip>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default CategoriesSection
