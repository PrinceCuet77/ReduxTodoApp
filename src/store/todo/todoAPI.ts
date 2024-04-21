import axios from 'axios'
import { config } from '../../lib/config'
import { TodoItem } from './todo-slice'

export const todoAPI = {
  getTodo: async () => {
    const response = await axios.get(config.BASE_URL + config.DB + '.json')
    return response.data
  },
  postTodo: async (todo: TodoItem) => {
    const data = { name: todo.name, isEditted: todo.isEditted }
    const response = await axios.post(
      config.BASE_URL + config.DB + '.json',
      data
    )
    return { response, data }
  },
  updateTodo: async (todo: TodoItem) => {
    const url = `${config.BASE_URL}/${config.DB}/${todo.id}.json`
    const data = { name: todo.name, isEditted: todo.isEditted }

    const response = await axios.put(url, data)
    // console.log('Response -> updateTodo', response)
    return { response, id: todo.id }
  },
  deleteTodo: async (id: string) => {
    const url = `${config.BASE_URL}/${config.DB}/${id}.json`
    const response = await axios.delete(url)
    return response
  },
}
