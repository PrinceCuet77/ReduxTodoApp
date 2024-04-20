import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import Todo from './Todo'
import { useAppSelector } from '@/store/hooks'
import EmptyTodo from './EmptyTodo'

const Todos = () => {
  const todoItem = useAppSelector((state) => state.todo.todos)

  if (todoItem.length !== 0) {
    return (
      <Card className='max-w-3xl border-blue-600'>
        <CardHeader className='text-center'>
          <CardTitle>Your Todo List</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          {todoItem.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </CardContent>
      </Card>
    )
  }

  return <EmptyTodo />
}

export default Todos
