import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import Todo from './Todo'
import EmptyContainer from './EmptyContainer'
import { Todo as TodoItem, useGetTodosQuery } from '@/store/todo-slice'
import Loader from './Loader/Loader'

const Todos = () => {
  const { data: todos, error, isLoading } = useGetTodosQuery()

  if (isLoading) {
    return <Loader />
  }

  let fetchedTodo: TodoItem[] = []
  for (let key in todos) {
    fetchedTodo.unshift({ ...todos[key], id: key })
  }

  if (fetchedTodo.length !== 0) {
    return (
      <Card className='max-w-3xl border-blue-600'>
        <CardHeader className='text-center'>
          <CardTitle>Your Todo List</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          {fetchedTodo.map((todo) => (
            <Todo
              key={todo.id}
              {...todo}
            />
          ))}
        </CardContent>
      </Card>
    )
  }

  return <EmptyContainer error={error ? true : false} />
}

export default Todos
