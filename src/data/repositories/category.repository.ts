import { Category } from '../../domain/models/category.model'
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

export class CategoryRepository {
  url = `${ApiRoutes.CATEGORIES}/me`

  findAll = async ({ token }: FindAllPayload) => {
    const response = await http.get<RequestResponse<Category[]>>(
      this.url,
      getRequestConfig(token)
    )
    return response.data.data
  }

  create = async ({ token, body }: CreatePayload<Category>) => {
    const response = await http.post<RequestResponse<Category>>(
      this.url,
      body,
      getRequestConfig(token)
    )
    return response.data.data
  }

  edit = async ({ token, body, id }: EditPayload<Category>) => {
    const response = await http.put<RequestResponse<Category>>(
      `${this.url}/${id}`,
      body,
      getRequestConfig(token)
    )
    return response.data.data
  }

  delete = async ({ token, id }: DeletePayload) => {
    const response = await http.delete<RequestResponse<Category>>(
      `${this.url}/${id}`,
      getRequestConfig(token)
    )
    return response.data.data
  }
}
