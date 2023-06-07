import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, FloatButton, Row, Tag, Tooltip } from 'antd'
import {
  EditOutlined,
  LogoutOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { Todo } from '../../../domain/models/todo.model'

import Header from '../../components/Header/Header'
import TodoCard from './components/TodoCard/TodoCard'
import ControlledModal from '../../components/ControlledModal/ControlledModal'
import ConnectedTodoForm from './components/TodoForm/ConnectedTodoForm'

import api from '../../../data/api'
import { selectToken } from '../../state/session/session.selectors'
import { logout } from '../../state/session/session.slice'
import { isObjectEmpty } from '../../util/object.util'
import useVisible from '../../hooks/useVisible'
import ControlledDrawer from '../../components/ControlledDrawer/ControlledDrawer'
import CategoriesSection from './components/CategoriesSection/CategoriesSection'

const categoriesQueryKey = ['categories']

const todosQueryKey = ['todos']

const Todos = () => {
  const token = useSelector(selectToken) as string

  const dispatch = useDispatch()

  const queryClient = useQueryClient()

  const categoriesQuery = useQuery({
    queryKey: categoriesQueryKey,
    queryFn: () => api.category.findAll({ token }),
  })

  const todosQuery = useQuery({
    queryKey: todosQueryKey,
    queryFn: () => api.todo.findAll({ token }),
  })

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const onClickLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (categoriesQuery.data) {
      setSelectedCategories(categoriesQuery.data.map((c) => c._id))
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

  return (
    <div className='view'>
      <Header />
      <div className='container py-6'>
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-medium'>Mis tareas</span>
          <Button icon={<ReloadOutlined />} shape='circle' />
        </div>
        <div className='mt-6'>
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
                Category
              </Tag>
            )
          })}
          <Tooltip title='Editar categorias'>
            <Button
              icon={<EditOutlined />}
              size='small'
              onClick={categoriesSectionVisible.open}
            />
          </Tooltip>
        </div>
        <Row gutter={16} className='mt-6 gap-y-3'>
          {todosQuery.data?.map((todo) => {
            return (
              <Col key={todo._id} span={24} md={12}>
                <TodoCard data={todo} onEdit={setSelectedTodo} />
              </Col>
            )
          })}
        </Row>
      </div>
      <ControlledModal visibleState={todoFormVisible} destroyOnClose>
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
          <FloatButton icon={<LogoutOutlined />} onClick={onClickLogout} />
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
