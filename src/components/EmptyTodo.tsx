import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import emptyTodoImg from './../assets/work-order.png'

const EmptyTodo = () => {
  return (
    <Card className='max-w-3xl border-none'>
      <CardHeader className='text-center'>
        <CardTitle>Empty Todo List</CardTitle>
        <CardDescription>
          Make a list what is stored in your mind
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3 flex justify-center items-center'>
        <img className='w-1/2 h-1/2' src={emptyTodoImg} alt='Empty Todo' />
      </CardContent>
    </Card>
  )
}

export default EmptyTodo
