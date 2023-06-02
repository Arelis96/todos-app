import { Category } from './category.model'

export interface Todo {
  _id: string
  title: string
  description?: string
  isCompleted: boolean
  categories: Category[]
  userId: string
  createdAt: string
  updatedAt: string
}
