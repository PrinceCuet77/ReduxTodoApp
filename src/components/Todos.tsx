import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect } from 'react'

import Todo from './Todo'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import EmptyTodo from './EmptyContainer'
import Loader from './Loader/Loader'
import { getTodo } from '@/store/todo/todo-thunks'

const Todos = () => {
  const { todos, isLoading, error } = useAppSelector((state) => state.todo)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchedTodo = async () => {
      try {
        await dispatch(getTodo()).unwrap()
      } catch (err) {
        console.log('error: ', err)
      }
    }

    fetchedTodo()
  }, [dispatch])

  if (isLoading === 'pending') {
    return <Loader />
  }

  if (todos.length !== 0) {
    return (
      <Card className='max-w-3xl border-blue-600'>
        <CardHeader className='text-center'>
          <CardTitle>Your Todo List</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              {...todo}
            />
          ))}
        </CardContent>
      </Card>
    )
  }

  return <EmptyTodo error={error} />
}

export default Todos
