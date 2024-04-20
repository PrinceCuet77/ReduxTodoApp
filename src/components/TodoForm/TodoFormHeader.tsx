import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const TodoFormHeader = () => {
  return (
    <CardHeader className='text-center'>
      <CardTitle>Redux TodoApp</CardTitle>
      <CardDescription>
        Add what's in your mind & make a todo list.
      </CardDescription>
    </CardHeader>
  )
}

export default TodoFormHeader
