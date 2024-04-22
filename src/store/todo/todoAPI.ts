import axios from 'axios'

import { config } from '../../lib/config'
import { TodoItem } from './todo-slice'

export const todoAPI = {
  getTodo: () => {
    return axios.get(config.BASE_URL + config.DB + '.json')
  },
  postTodo: (todo: TodoItem) => {
    const data = { name: todo.name, isEditted: todo.isEditted }
    const url = `${config.BASE_URL}${config.DB}.json`

    return axios.post(url, data)
  },
  updateTodo: (todo: TodoItem) => {
    const url = `${config.BASE_URL}/${config.DB}/${todo.id}.json`
    const data = { name: todo.name, isEditted: todo.isEditted }

    return axios.put(url, data)
  },
  deleteTodo: (id: string) => {
    const url = `${config.BASE_URL}/${config.DB}/${id}.json`
    return axios.delete(url)
  },
}
