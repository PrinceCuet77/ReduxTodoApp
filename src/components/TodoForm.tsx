import { type ChangeEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/store/hooks'
import { AddTodoItem } from '@/store/todo-slice'

const TodoForm = () => {
  const [todoInput, setTodoInput] = useState('')
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const dispatch = useAppDispatch()

  const clearHandler = () => {
    setTodoInput('')
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value)
  }

  const blurHandler = () => {
    if (todoInput.trim().length !== 0) {
      setError(false)
      setErrorText('')
      return
    }
  }

  const addTodoHandler = () => {
    if (todoInput.trim().length === 0) {
      setError(true)
      setErrorText('Input should not be an empty.')
      return
    }

    dispatch(
      AddTodoItem({
        id: Math.random().toString(),
        name: todoInput,
        isEditted: false,
      })
    )

    clearHandler()
  }

  const focusHandler = () => {
    setError(false)
    setErrorText('')
  }

  return (
    <Card className='max-w-3xl border-blue-600 mb-5'>
      <CardHeader className='text-center'>
        <CardTitle>Redux TodoApp</CardTitle>
        <CardDescription>
          Add what's in your mind & make a todo list.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Input
              id='name'
              placeholder='List anything...'
              value={todoInput}
              onChange={changeHandler}
              onBlur={blurHandler}
              onFocus={focusHandler}
              className={cn('text-md font-normal', {
                'bg-red-100 outline outline-offset-2 outline-red-400 focus:bg-transparent':
                  error,
              })}
            />
            {error && <p className='text-red-500 text-sm'>{errorText}</p>}
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end gap-3'>
        <Button onClick={clearHandler} variant='outline'>
          Clear
        </Button>
        <Button onClick={addTodoHandler}>Add Todo</Button>
      </CardFooter>
    </Card>
  )
}

export default TodoForm
