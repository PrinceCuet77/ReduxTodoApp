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
import { useAppDispatch } from '@/store/hooks'
import { removeTodoItem } from '@/store/todo-slice'
import { ToastTypes, todoToast } from '@/lib/utils'

type DeleteModalProps = { id: string }

const DeleteModal = ({ id }: DeleteModalProps) => {
  const dispatch = useAppDispatch()

  const deleteHandler = () => {
    dispatch(removeTodoItem(id))

    todoToast('A todo item have successfully deleted.', ToastTypes.INFO)
  }

  return (
    <>
      {/* <ToastContainer className='w-[380px]' /> */}
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
    </>
  )
}

export default DeleteModal
