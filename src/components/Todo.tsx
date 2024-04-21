import { cn } from '@/lib/utils'

import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import { TodoItem } from '@/store/todo/todo-slice'

const Todo = ({ id, name, isEditted }: TodoItem) => {
  return (
    <div
      className={cn(
        'ring-1 rounded-md px-4 py-2 flex justify-between items-center gap-2',
        {
          'bg-indigo-50 ring-1 ring-indigo-600': isEditted,
        }
      )}
    >
      <div>
        <p>{name}</p>
      </div>
      <div className='flex gap-1 justify-center items-center'>
        <EditModal id={id} name={name} />
        <DeleteModal id={id} />
      </div>
    </div>
  )
}

export default Todo
