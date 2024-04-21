import { cn } from '@/lib/utils'

import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import { TodoItem } from '@/store/todo/todo-slice'

const Todo = (todo: TodoItem) => {
  return (
    <div
      className={cn(
        'ring-1 rounded-md px-4 py-2 flex justify-between items-center gap-2',
        {
          'bg-indigo-50 ring-1 ring-indigo-600': todo.isEditted,
        }
      )}
    >
      <div>
        <p>{todo.name}</p>
      </div>
      <div className='flex gap-1 justify-center items-center'>
        <EditModal {...todo} />
        <DeleteModal id={todo.id} />
      </div>
    </div>
  )
}

export default Todo
