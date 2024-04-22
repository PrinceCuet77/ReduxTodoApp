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
import { useUpdateTodoMutation } from '@/store/todo-slice'

const EditModal = ({ id, name }: { id: string; name: string }) => {
  const [editTodoInput, setEditTodoInput] = useState('')

  const [updateTodo] = useUpdateTodoMutation()

  const hasError = editTodoInput.trim().length === 0

  const updateTodoHandler = async () => {
    if (editTodoInput === name) {
      todoToast('You have inputed the same input', ToastTypes.WARNING)
      return
    }

    if (hasError) {
      todoToast('Input should not be empty.', ToastTypes.WARNING)
      return
    }

    try {
      await updateTodo({
        id,
        name: editTodoInput,
        isEditted: true,
      }).unwrap()

      todoToast('A todo item have updated successfully.')

      setEditTodoInput('')
    } catch (err) {
      // console.error('Failed to update the todo', err)
      todoToast('Failed to update the todo', ToastTypes.ERROR)
    }
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
