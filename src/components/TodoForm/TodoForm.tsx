import { useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn, todoToast } from '@/lib/utils'
import { useAppDispatch } from '@/store/hooks'
import { AddTodoItem } from '@/store/todo-slice'
import TodoFormHeader from './TodoFormHeader'

import 'react-toastify/dist/ReactToastify.css'

const TodoForm = () => {
  const [todoInput, setTodoInput] = useState('')
  const [error, setError] = useState(false)

  const dispatch = useAppDispatch()

  const addTodoHandler = () => {
    if (todoInput.trim().length === 0) {
      setError(true)
      return
    }

    dispatch(
      AddTodoItem({
        id: Math.random().toString(),
        name: todoInput,
        isEditted: false,
      })
    )

    todoToast('A new todo item have successfully added.')

    setTodoInput('')
  }

  const blurHandler = () => {
    if (todoInput.trim().length !== 0) {
      setError(false)
    }
  }

  return (
    <>
      <ToastContainer className='w-[380px]' />
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
                onBlur={blurHandler}
                onFocus={() => setError(false)}
                className={cn('text-md font-normal', {
                  'bg-red-100 outline outline-offset-2 outline-red-400 focus:bg-transparent':
                    error,
                })}
              />
              {error && (
                <p className='text-red-500 text-sm'>
                  Input should not be an empty.
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
          <Button onClick={addTodoHandler}>Add Todo</Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default TodoForm
