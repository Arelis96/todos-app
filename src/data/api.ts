import { AuthRepository } from './repositories/auth.repository'
import { CategoryRepository } from './repositories/category.repository'
import { TodoRepository } from './repositories/todo.repository'

const auth = new AuthRepository()
const category = new CategoryRepository()
const todo = new TodoRepository()

const api = {
  auth,
  category,
  todo,
}

export default api
