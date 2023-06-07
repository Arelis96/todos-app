import { Todo } from '../../domain/models/todo.model'
import {
  CreatePayload,
  DeletePayload,
  EditPayload,
  FindAllPayload,
  RequestResponse,
} from './repositories.types'

import http from '../http/http'
import { ApiRoutes } from '../constants/api.routes'
import { getRequestConfig } from '../http/http.util'

export type CreateTodoPayload = CreatePayload<
  Omit<Todo, 'categories' | 'userId' | 'isCompleted'> & {
    categories?: string[]
    isCompleted?: boolean
  }
>

export type EditTodoPayload = EditPayload<
  Omit<Todo, 'categories'> & { categories?: string[] }
>

export class TodoRepository {
  url = `${ApiRoutes.TODOS}/me`

  findAll = async ({ token }: FindAllPayload) => {
    const response = await http.get<RequestResponse<Todo[]>>(
      this.url,
      getRequestConfig(token)
    )
    return response.data.data
  }

  create = async ({ token, body }: CreateTodoPayload) => {
    const response = await http.post<RequestResponse<Todo>>(
      this.url,
      body,
      getRequestConfig(token)
    )
    return response.data.data
  }

  edit = async ({ token, body, id }: EditTodoPayload) => {
    const response = await http.put<RequestResponse<Todo>>(
      `${this.url}/${id}`,
      body,
      getRequestConfig(token)
    )
    return response.data.data
  }

  delete = async ({ token, id }: DeletePayload) => {
    const response = await http.delete<RequestResponse<Todo>>(
      `${this.url}/${id}`,
      getRequestConfig(token)
    )
    return response.data.data
  }
}
