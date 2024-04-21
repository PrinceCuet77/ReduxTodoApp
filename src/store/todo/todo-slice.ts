import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getTodo, postTodo, updateTodo, deleteTodo } from './todo-thunks'

export type TodoItem = {
  id: string
  name: string
  isEditted: boolean
}

type todoState = {
  todos: TodoItem[]
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null | string
}

const initialState: todoState = {
  todos: [],
  isLoading: 'idle',
  error: null,
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodo.pending, (state) => {
        state.isLoading = 'pending'
        state.error = null
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.isLoading = 'succeeded'
        state.todos.push(action.payload)
        state.error = null
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.isLoading = 'failed'
        state.error = action.error?.message || 'Something went wrong'
      })

    builder
      .addCase(postTodo.pending, (state) => {
        state.isLoading = 'pending'
        state.error = null
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.isLoading = 'succeeded'
        // state.todos.push(action.payload)
        console.log('Action-> postTodo -> ff: ', action)
        state.error = null
      })
      .addCase(postTodo.rejected, (state, action) => {
        state.isLoading = 'failed'
        state.error = action.error?.message || 'Something went wrong'
      })

    builder
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = 'pending'
        state.error = null
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = 'succeeded'
        // state.todos.push(action.payload)
        console.log('Action-> updateTodo -> ff: ', action)
        state.error = null
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = 'failed'
        state.error = action.error?.message || 'Something went wrong'
      })

    builder
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = 'pending'
        state.error = null
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = 'succeeded'
        // state.todos.push(action.payload)
        console.log('Action-> deleteTodo -> ff: ', action)
        state.error = null
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = 'failed'
        state.error = action.error?.message || 'Something went wrong'
      })
  },
})
