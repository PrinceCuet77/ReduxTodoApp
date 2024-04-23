import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ToastTypes, cn, todoToast } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import TodoFormHeader from './TodoFormHeader'
import { postTodo } from '@/store/todo/todo-thunks'

const TodoForm = () => {
  const [todoInput, setTodoInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const { todos } = useAppSelector((state) => state.todo)

  const dispatch = useAppDispatch()

  const addTodoHandler = async () => {
    if (todoInput.trim().length === 0) {
      setError(true)
      return
    }

    if (todoInput.trim().length > 50) {
      todoToast('Make sure task name within 50 letters.', ToastTypes.INFO)
      setTodoInput('')
      return
    }

    if (todos.length === 5) {
      todoToast('You can enlist atmost 5 todo tasks.', ToastTypes.INFO)
      setTodoInput('')
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      await dispatch(
        postTodo({
          id: Math.random().toString(),
          name: todoInput.trim(),
          isEditted: false,
        })
      ).unwrap()

      todoToast('A new todo item have successfully added.')
    } catch (err) {
      console.error('Failed to save the todo', err)
      todoToast('Failed to save the todo', ToastTypes.ERROR)
    }

    setTodoInput('')
    setIsLoading(false)
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
