import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, Empty, Popconfirm, Spin, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleFilled,
  PlusOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Category } from '../../../../../domain/models/category.model'

import ControlledModal from '../../../../components/ControlledModal/ControlledModal'
import ConnectedCategoryForm from '../CategoryForm/ConnectedCategoryForm'

import api from '../../../../../data/api'
import { selectToken } from '../../../../state/session/session.selectors'
import { isObjectEmpty } from '../../../../util/object.util'
import useMessageService from '../../../../hooks/useMessage'
import { getIdList } from '../../../../util/id.util'

const categoriesQueryKey = ['categories']
const todosQueryKey = ['todos']

const CategoriesSection = () => {
  const messageService = useMessageService()

  const queryClient = useQueryClient()

  const token = useSelector(selectToken) as string

  const categoriesQuery = useQuery({
    queryKey: categoriesQueryKey,
    queryFn: () => api.category.findAll({ token }),
  })

  const todosQuery = useQuery({
    queryKey: todosQueryKey,
    queryFn: () => api.todo.findAll({ token }),
  })

  const [selectedCategory, setSelectedCategory] = useState<
    Category | object | null
  >(null)

  const categoryFormVisible = {
    visible: selectedCategory !== null,
    close: () => setSelectedCategory(null),
  }

  const hasSelectedCategory =
    Boolean(selectedCategory) && !isObjectEmpty(selectedCategory)

  const refetchCategories = () => {
    queryClient.invalidateQueries(categoriesQuery)
  }

  const getCanDeleteCategory = (categoryId: string) => {
    return !todosQuery.data?.some((todo) =>
      getIdList(todo.categories).includes(categoryId)
    )
  }

  const categoryDeleteMutation = useMutation({
    mutationFn: api.category.delete,
    onSuccess: () => {
      messageService.success('Categoria eliminada')
      refetchCategories()
    },
  })

  const isLoading =
    categoriesQuery.isLoading ||
    categoriesQuery.isFetching ||
    todosQuery.isLoading ||
    todosQuery.isFetching ||
    categoryDeleteMutation.isLoading

  return (
    <div>
      <Button
        type='primary'
        icon={<PlusOutlined />}
        block
        onClick={() => setSelectedCategory({})}
      >
        Agregar
      </Button>
      <Spin spinning={isLoading}>
        <div className='flex flex-col gap-2 mt-4'>
          {categoriesQuery.data?.map((category) => {
            const canDelete = getCanDeleteCategory(category._id)

            return (
              <Card key={category._id}>
                <div className='flex justify-between items-center'>
                  <span className='text-md'>{category.name}</span>
                  <div className='flex gap-1'>
                    <Tooltip title='Editar' placement='bottom'>
                      <Button
                        type='text'
                        icon={<EditOutlined className='!text-primary' />}
                        onClick={() => setSelectedCategory(category)}
                      />
                    </Tooltip>
                    <Popconfirm
                      title='Eliminar Categoria'
                      description='¿Estás seguro?'
                      onConfirm={() => {
                        categoryDeleteMutation.mutate({
                          token,
                          id: category._id,
                        })
                      }}
                      disabled={!canDelete}
                      okButtonProps={{ danger: true, className: '!bg-red-500' }}
                      icon={<InfoCircleFilled className='!text-red-500' />}
                    >
                      <Tooltip
                        title={
                          canDelete
                            ? 'Eliminar'
                            : 'No se pueden eliminar categorias que se estén utilizando'
                        }
                        placement='bottom'
                      >
                        <Button
                          type='text'
                          icon={
                            <DeleteOutlined
                              className={canDelete ? '!text-red-500' : ''}
                            />
                          }
                          danger
                          disabled={!canDelete}
                        />
                      </Tooltip>
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
        {!categoriesQuery.data?.length && <Empty className='py-12' />}
      </Spin>
      <ControlledModal
        visibleState={categoryFormVisible}
        title={hasSelectedCategory ? 'Editar categoria' : 'Crear categoria'}
        destroyOnClose
      >
        <ConnectedCategoryForm
          item={
            hasSelectedCategory ? (selectedCategory as Category) : undefined
          }
          onCompleted={() => {
            refetchCategories()
            categoryFormVisible.close()
          }}
        />
      </ControlledModal>
    </div>
  )
}

export default CategoriesSection
