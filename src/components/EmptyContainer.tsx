import { type ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import emptyTodoImg from './../assets/work-order.png'
import errorImg from './../assets/error-404.png'
import { ToastTypes, todoToast } from '@/lib/utils'

const EmptyContainer = ({ error }: { error: boolean }) => {
  let ImageContent: ReactNode = (
    <img
      className='w-1/2 h-1/2'
      src={emptyTodoImg}
      alt='Empty Todo'
    />
  )
  if (error) {
    todoToast('Something went wrong', ToastTypes.ERROR)
    ImageContent = (
      <img
        className='w-1/2 h-1/2'
        src={errorImg}
        alt='Empty Todo'
      />
    )
  }

  return (
    <Card className='max-w-3xl border-none'>
      <CardHeader className='text-center'>
        <CardTitle>Empty Todo List</CardTitle>
        <CardDescription>
          {error
            ? `Something went wrong!`
            : 'Make a list what is stored in your mind'}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3 flex justify-center items-center'>
        {ImageContent}
      </CardContent>
    </Card>
  )
}

export default EmptyContainer
