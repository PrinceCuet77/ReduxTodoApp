import { createSlice } from '@reduxjs/toolkit'
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
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.isLoading = 'succeeded'

        if (!action.payload) {
          state.todos = []
        } else {
          let fetchedTodo: TodoItem[] = []
          for (let key in action.payload) {
            fetchedTodo.push({ ...action.payload[key], id: key })
          }
          state.todos = [...fetchedTodo]
        }
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.isLoading = 'failed'
        state.error = action.error?.message || 'Something went wrong'
      })

      .addCase(postTodo.fulfilled, (state, action) => {
        const id = action.payload.response.data.name
        const newTodo = {
          id,
          ...action.payload.data,
        }
        state.todos.unshift(newTodo)
      })

      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        )

        state.todos[index] = {
          id: action.payload.id,
          ...action.payload.response.data,
        }
      })

      .addCase(deleteTodo.fulfilled, (state, action) => {
        const newTodos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        )
        state.todos = newTodos
      })
  },
})
