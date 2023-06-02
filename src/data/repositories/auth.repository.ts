import { Session } from '../../domain/models/session.model'
import { RequestResponse } from './repositories.types'

import http from '../http/http'
import { ApiRoutes } from '../constants/api.routes'

export type LoginPayload = {
  body: { email: string; password: string }
}

export type RegisterPayload = {
  body: { email: string; password: string }
}

export class AuthRepository {
  login = async ({ body }: LoginPayload) => {
    const response = await http.post<RequestResponse<Session>>(
      ApiRoutes.LOGIN,
      body
    )
    return response.data.data
  }

  register = async ({ body }: RegisterPayload) => {
    const response = await http.post<RequestResponse<Session>>(
      ApiRoutes.REGISTER,
      body
    )
    return response.data.data
  }
}
