import { config } from '@/lib/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Todo = {
  id: string
  name: string
  isEditted: boolean
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.BASE_URL }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => `${config.DB}.json`,
      providesTags: () => [{ type: 'Todo', id: 'List' }],
    }),
    addTodo: builder.mutation<Todo, { name: string; isEditted: boolean }>({
      query: ({ name, isEditted }) => ({
        url: `${config.DB}.json`,
        method: 'POST',
        body: { name, isEditted },
      }),
      invalidatesTags: (result) => ['Todo', { type: 'Todo', id: result?.name }],
    }),
    updateTodo: builder.mutation<{ name: string; isEditted: boolean }, Todo>({
      query: ({ id, name, isEditted }) => {
        return {
          url: `${config.DB}/${id}.jon`,
          method: 'PUT',
          body: { name, isEditted },
        }
      },
      invalidatesTags: (result) => ['Todo', { type: 'Todo', id: result?.name }],
    }),
    deleteTodo: builder.mutation<{ name: string; isEditted: boolean }, string>({
      query(id) {
        return {
          url: `${config.DB}/${id}.json`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result) => ['Todo', { type: 'Todo', id: result?.name }],
    }),
  }),
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi
