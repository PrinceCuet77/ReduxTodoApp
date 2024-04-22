import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import Todo from './Todo'
import { useAppSelector } from '@/store/hooks'
import EmptyTodo from './EmptyContainer'
import Loader from './Loader/Loader'

const Todos = () => {
  const { todos, isLoading, error } = useAppSelector((state) => state.todo)

  // console.log(todos)

  if (isLoading === 'pending') {
    return <Loader />
  }

  // if (isLoading === 'failed') {
  //   // todoToast(fetchingError ?? 'Something went wrong', ToastTypes.ERROR)
  //   // TODO: Need a error component to load while facing an error
  //   return <p>Error----------------------------------</p>
  // }

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
