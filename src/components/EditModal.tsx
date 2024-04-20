import { type ChangeEvent, useState } from 'react'
import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/store/hooks'
import { updateTodoItem } from '@/store/todo-slice'

const EditModal = ({ id, name }: { id: string; name: string }) => {
  const [editTodoInput, setEditTodoInput] = useState('')
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(true)

  const dispatch = useAppDispatch()

  const clearHandler = () => {
    setEditTodoInput('')
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length === 0) {
      setOpen(false)
      return
    }

    setEditTodoInput(event.target.value)
  }

  const blurHandler = () => {
    if (editTodoInput.trim().length !== 0) {
      setError(false)
      return
    }
  }

  const updateTodoHandler = () => {
    if (editTodoInput.trim().length === 0) {
      setError(true)
      return
    }

    dispatch(updateTodoItem({ id, name: editTodoInput }))

    clearHandler()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <Pencil className='w-4 h-4 text-blue-600' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] rounded-lg'>
        <DialogHeader>
          <DialogTitle>Edit Dialog</DialogTitle>
        </DialogHeader>
        <div className='pt-4'>
          <Input
            id='name'
            placeholder='edit todo item'
            defaultValue={name}
            // value={editTodoInput}
            onChange={changeHandler}
            onBlur={blurHandler}
            className={cn('text-md font-normal col-span-3', {
              'bg-red-100 outline outline-offset-2 outline-red-400 focus:bg-transparent':
                error,
            })}
          />
        </div>
        <DialogFooter>
          {/* {error ? (
            <Button type='submit' onClick={updateTodoHandler}>
              Update Todo
            </Button>
          ) : (
            <DialogClose asChild>
              <Button type='submit' onClick={updateTodoHandler}>
                Update Todo
              </Button>
            </DialogClose>
          )} */}
          <Button type='submit' onClick={updateTodoHandler}>
            Update Todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditModal
