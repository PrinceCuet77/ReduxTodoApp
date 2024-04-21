import { useState } from 'react'
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
import { ToastTypes, todoToast } from '@/lib/utils'
import { useAppDispatch } from '@/store/hooks'
import { updateTodo } from '@/store/todo/todo-thunks'
import { TodoItem } from '@/store/todo/todo-slice'
// import { updateTodoItem } from '@/store/todo-slice'

const EditModal = ({ id, name, isEditted }: TodoItem) => {
  const [editTodoInput, setEditTodoInput] = useState('')

  const dispatch = useAppDispatch()

  const hasError = editTodoInput.trim().length === 0

  const updateTodoHandler = () => {
    if (editTodoInput === name) {
      todoToast('You have inputed the same input', ToastTypes.INFO)
      return
    }

    if (hasError) {
      todoToast('Input should not be empty.', ToastTypes.WARNING)
      return
    }

    try {
      dispatch(
        updateTodo({
          id,
          name: editTodoInput,
          isEditted: true,
        })
      ).unwrap()
    } catch (err) {
      console.error('Failed to update the todo', err)
      todoToast('Failed to update the todo', ToastTypes.ERROR)
    }

    todoToast('A todo item have updated successfully.')

    setEditTodoInput('')
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
            onChange={(event) => setEditTodoInput(event.target.value)}
            onFocus={(event) => setEditTodoInput(event?.target.value)}
            className={'text-md font-normal col-span-3'}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='submit'
              onClick={updateTodoHandler}
            >
              Update Todo
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditModal
