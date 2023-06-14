import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Col, Empty, FloatButton, Row, Spin, Tag, Tooltip } from 'antd'
import {
  EditOutlined,
  LogoutOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Todo } from '../../../domain/models/todo.model'

import Header from '../../components/Header/Header'
import TodoCard from './components/TodoCard/TodoCard'
import ControlledModal from '../../components/ControlledModal/ControlledModal'
import ConnectedTodoForm from './components/TodoForm/ConnectedTodoForm'
import ControlledDrawer from '../../components/ControlledDrawer/ControlledDrawer'
import CategoriesSection from './components/CategoriesSection/CategoriesSection'

import api from '../../../data/api'
import { selectToken } from '../../state/session/session.selectors'
import useVisible from '../../hooks/useVisible'
import useHandleLogout from '../../hooks/useHandleLogout'
import useMessageService from '../../hooks/useMessage'
import { isObjectEmpty } from '../../util/object.util'
import { getIdList } from '../../util/id.util'

const categoriesQueryKey = ['categories']

const todosQueryKey = ['todos']

const Todos = () => {
  const messageService = useMessageService()

  const token = useSelector(selectToken) as string

  const queryClient = useQueryClient()

  const handleLogout = useHandleLogout()

  const categoriesQuery = useQuery({
    queryKey: categoriesQueryKey,
    queryFn: () => api.category.findAll({ token }),
  })

  const todosQuery = useQuery({
    queryKey: todosQueryKey,
    queryFn: () => api.todo.findAll({ token }),
  })

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    if (categoriesQuery.data) {
      setSelectedCategories(getIdList(categoriesQuery.data))
    }
  }, [categoriesQuery.data])

  const addSelectedCategory = (categoryId: string) => {
    setSelectedCategories((curr) => [...curr, categoryId])
  }

  const removeSelectedCategory = (categoryId: string) => {
    setSelectedCategories((curr) =>
      curr.filter((value) => value !== categoryId)
    )
  }

  const [selectedTodo, setSelectedTodo] = useState<Todo | object | null>(null)

  const todoFormVisible = {
    visible: selectedTodo !== null,
    close: () => setSelectedTodo(null),
  }

  const categoriesSectionVisible = useVisible()

  const hasSelectedTodo = Boolean(selectedTodo) && !isObjectEmpty(selectedTodo)

  const refetchCategories = () => {
    queryClient.invalidateQueries(categoriesQueryKey)
  }

  const refetchTodos = () => {
    queryClient.invalidateQueries(todosQueryKey)
  }

  const reloadData = () => {
    refetchCategories()
    refetchTodos()
  }

  const todoDeleteMutation = useMutation({
    mutationFn: api.todo.delete,
    onSuccess: () => {
      messageService.success('Tarea eliminada')
      reloadData()
    },
  })

  const todoCompleteStatusMutation = useMutation({
    mutationFn: api.todo.edit,
    onSuccess: () => {
      messageService.success('Estado de la tarea actualizado')
      reloadData()
    },
  })

  const isLoading =
    todosQuery.isLoading ||
    todosQuery.isFetching ||
    categoriesQuery.isLoading ||
    categoriesQuery.isFetching ||
    todoDeleteMutation.isLoading ||
    todoCompleteStatusMutation.isLoading

  return (
    <div className='view'>
      <Header />
      <div className='container py-6'>
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-medium'>Mis tareas</span>
          <Button
            icon={<ReloadOutlined />}
            shape='circle'
            onClick={reloadData}
          />
        </div>
        <div className='mt-6'>
          <div>
            {categoriesQuery.data?.map((category) => {
              const isSelected = selectedCategories.includes(category._id)

              return (
                <Tag
                  key={category._id}
                  color='white'
                  className={`${
                    isSelected
                      ? '!bg-primary !h-6'
                      : '!bg-gray-200 !text-gray-600 !h-6'
                  } hover:cursor-pointer`}
                  onClick={() => {
                    if (isSelected) {
                      removeSelectedCategory(category._id)
                    } else {
                      addSelectedCategory(category._id)
                    }
                  }}
                >
                  {category.name}
                </Tag>
              )
            })}
            <Button
              icon={<EditOutlined />}
              size='small'
              onClick={categoriesSectionVisible.open}
            >
              Categorias
            </Button>
          </div>
          <Spin spinning={isLoading}>
            <Row gutter={16} className='mt-6 gap-y-3'>
              {todosQuery.data
                ?.sort((todo) => (todo.isCompleted ? 1 : -1))
                .map((todo) => {
                  return (
                    <Col key={todo._id} span={24} md={12}>
                      <TodoCard
                        data={todo}
                        onEdit={setSelectedTodo}
                        onDelete={(todo) => {
                          todoDeleteMutation.mutate({ token, id: todo._id })
                        }}
                        onCompleted={(todo) => {
                          todoCompleteStatusMutation.mutate({
                            token,
                            id: todo._id,
                            body: { isCompleted: true },
                          })
                        }}
                        onUncompleted={(todo) => {
                          todoCompleteStatusMutation.mutate({
                            token,
                            id: todo._id,
                            body: { isCompleted: false },
                          })
                        }}
                      />
                    </Col>
                  )
                })}
            </Row>
            {!todosQuery.data?.length && <Empty className='py-24' />}
          </Spin>
        </div>
      </div>
      <ControlledModal
        visibleState={todoFormVisible}
        destroyOnClose
        title={hasSelectedTodo ? 'Editar tarea' : 'Crear tarea'}
      >
        <ConnectedTodoForm
          item={hasSelectedTodo ? (selectedTodo as Todo) : undefined}
          onCompleted={() => {
            todoFormVisible.close()
            refetchTodos()
          }}
        />
      </ControlledModal>
      <ControlledDrawer
        visibleState={categoriesSectionVisible}
        title='Mis categorias'
        afterClose={reloadData}
      >
        <CategoriesSection />
      </ControlledDrawer>
      <FloatButton.Group>
        <Tooltip title='Cerrar Sessión' placement='left'>
          <FloatButton icon={<LogoutOutlined />} onClick={handleLogout} />
        </Tooltip>
        <Tooltip title='Crear tarea' placement='left'>
          <FloatButton
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setSelectedTodo({})}
          />
        </Tooltip>
      </FloatButton.Group>
    </div>
  )
}

export default Todos
