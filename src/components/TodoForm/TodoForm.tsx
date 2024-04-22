import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ToastTypes, cn, todoToast } from '@/lib/utils'
import { Todo, useAddTodoMutation, useGetTodosQuery } from '@/store/todo-slice'
import TodoFormHeader from './TodoFormHeader'

const TodoForm = () => {
  const [todoInput, setTodoInput] = useState('')
  const [error, setError] = useState(false)

  const [addTodo, { isLoading }] = useAddTodoMutation()
  const { data: todos } = useGetTodosQuery()

  let fetchedTodo: Todo[] = []
  for (let key in todos) {
    fetchedTodo.unshift({ ...todos[key], id: key })
  }

  const addTodoHandler = async () => {
    if (todoInput.trim().length === 0) {
      setError(true)
      return
    }

    if (fetchedTodo.length === 5) {
      todoToast('You can enlist atmost 5 todo tasks.', ToastTypes.INFO)
      setTodoInput('')
      return
    }

    try {
      const response = await addTodo({
        name: todoInput.trim(),
        isEditted: false,
      }).unwrap()

      if (response === null) {
        todoToast('Failed to save the todo', ToastTypes.ERROR)
      } else {
        todoToast('A new todo item have successfully added.')
      }
    } catch (err) {
      // console.error('Failed to save the todo', err)
      todoToast('Failed to save the todo', ToastTypes.ERROR)
    }

    setTodoInput('')
  }

  return (
    <>
      <Card className='max-w-3xl border-blue-600 mb-5'>
        <TodoFormHeader />
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Input
                id='name'
                placeholder='List anything...'
                value={todoInput}
                onChange={(event) => setTodoInput(event.target.value)}
                onFocus={() => setError(false)}
                className={cn('text-md font-normal', {
                  'bg-red-100 outline outline-offset-2 outline-red-400 focus:bg-transparent':
                    error,
                })}
              />
              {error && (
                <p className='text-red-500 text-sm'>
                  Input should not be empty.
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-end gap-3'>
          <Button
            onClick={() => setTodoInput('')}
            variant='outline'
          >
            Clear
          </Button>
          <Button
            className='w-24'
            onClick={addTodoHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className='text-center h-6 w-6 animate-spin' />
            ) : (
              'Add Todo'
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default TodoForm
