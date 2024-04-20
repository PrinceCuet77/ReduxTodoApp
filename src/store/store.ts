import { configureStore } from '@reduxjs/toolkit'

import { todoSlice } from './todo-slice'

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
