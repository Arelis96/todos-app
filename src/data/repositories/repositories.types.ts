export type RequestResponse<T> = {
  ok: boolean
  data: T
}

export type FindAllPayload = {
  token: string
}

export type CreatePayload<T> = {
  token: string
  body: Omit<T, '_id' | 'createdAt' | 'updatedAt'>
}

export type EditPayload<T> = {
  token: string
  id: string
  body: Partial<Omit<T, '_id' | 'createdAt' | 'updatedAt'>>
}

export type DeletePayload = {
  token: string
  id: string
}
