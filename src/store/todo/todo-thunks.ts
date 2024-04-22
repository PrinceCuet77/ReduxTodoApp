import { createAsyncThunk } from '@reduxjs/toolkit'

import { todoAPI } from './todoAPI'
import { TodoItem } from './todo-slice'

export const getTodo = createAsyncThunk('todo/getTodo', async () => {
  const response = await todoAPI.getTodo()
  return response.data
})

export const postTodo = createAsyncThunk(
  'todo/postTodo',
  async (todo: TodoItem) => {
    const response = await todoAPI.postTodo(todo)
    return response
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async (todo: TodoItem) => {
    const response = await todoAPI.updateTodo(todo)
    return { data: response.data, id: todo.id }
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id: string) => {
    const response = await todoAPI.deleteTodo(id)
    return { response, id }
  }
)
