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
  // toastMessage: null | string
}

const initialState: todoState = {
  todos: [],
  isLoading: 'idle',
  error: null,
  // toastMessage: null,
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
          const firebaseEntries: [string, TodoItem][] = Object.entries(
            action.payload
          )
          for (let i = 0; i < firebaseEntries.length; i++) {
            state.todos.push(firebaseEntries[i][1])
          }
        }
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.isLoading = 'failed'
        state.error = action.error?.message || 'Something went wrong'
      })

    builder.addCase(postTodo.fulfilled, (state, action) => {
      state.todos.push(JSON.parse(action.payload))
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
