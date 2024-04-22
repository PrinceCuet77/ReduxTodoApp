import { Trash } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { ToastTypes, todoToast } from '@/lib/utils'
import { useDeleteTodoMutation } from '@/store/todo-slice'

type DeleteModalProps = { id: string }

const DeleteModal = ({ id }: DeleteModalProps) => {
  const [deleteTodo] = useDeleteTodoMutation()

  const deleteHandler = async () => {
    try {
      await deleteTodo(id).unwrap()

      todoToast('A todo item have successfully deleted.')
    } catch (err) {
      // console.error('Failed to delete the todo', err)
      todoToast('Failed to delete the todo', ToastTypes.ERROR)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost'>
          <Trash className='w-4 h-4 text-red-600' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='rounded-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Dialog</AlertDialogTitle>
          <AlertDialogDescription>
            Are you want to delete the selected todo?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            onClick={deleteHandler}
          >
            Delete Todo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteModal
