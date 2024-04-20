import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type TodoItem = {
  id: string
  name: string
  isEditted: boolean
}

type todoState = {
  todos: TodoItem[]
}

const initialState: todoState = {
  todos: [
    // {
    //   id: '1',
    //   name: 'Go to office',
    //   isEditted: false,
    // },
    // {
    //   id: '2',
    //   name: 'Asset integration task',
    //   isEditted: false,
    // },
    // {
    //   id: '3',
    //   name: 'Animation integration on WintosJR avatar',
    //   isEditted: false,
    // },
  ],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    AddTodoItem(state, action: PayloadAction<TodoItem>) {
      state.todos.unshift(action.payload)
    },
    removeTodoItem(state, action: PayloadAction<string>) {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      )
      state.todos.splice(todoIndex, 1)
    },
    updateTodoItem(state, action: PayloadAction<{ id: string; name: string }>) {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      )

      state.todos[todoIndex].name = action.payload.name
      state.todos[todoIndex].isEditted = true
    },
  },
})

export const { AddTodoItem, removeTodoItem, updateTodoItem } = todoSlice.actions
