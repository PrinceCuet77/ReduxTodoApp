import { todoAPI } from './todoAPI'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { TodoItem } from './todo-slice'

export const getTodo = createAsyncThunk('todo/getTodo', async () => {
  const todos = await todoAPI.getTodo()
  return todos
})

export const postTodo = createAsyncThunk(
  'todo/postTodo',
  async (todo: TodoItem) => {
    const todos = await todoAPI.postTodo(todo)
    return todos
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async (todo: TodoItem) => {
    const todos = await todoAPI.updateTodo(todo)
    return todos
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id: string) => {
    const todos = await todoAPI.deleteTodo(id)
    return todos
  }
)
