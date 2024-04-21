import axios from 'axios'
import { config } from '../../lib/config'
import { TodoItem } from './todo-slice'

export const todoAPI = {
  getTodo: async () => {
    const response = await axios.get(config.BASE_URL)
    console.log('Response -> fetchTodoList: ', response)
    return response.data
  },
  postTodo: async (todo: TodoItem) => {
    const response = await axios.post(config.BASE_URL, todo)
    console.log('Response -> postTodo', response)
    return response
  },
  updateTodo: async (todo: TodoItem) => {
    const { id } = todo
    const url = `${config.BASE_URL}/${id}`

    const response = await axios.put(url, todo)
    console.log('Response -> updateTodo', response)
    return response
  },
  deleteTodo: async (id: string) => {
    const url = `${config.BASE_URL}/${id}`

    const response = await axios.delete(url)
    console.log('Response -> deleteTodo', response)
    return response
  },
}
