import { ToastContainer } from 'react-toastify'

import TodoForm from './components/TodoForm/TodoForm'
import Todos from './components/Todos'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <main className='mx-auto w-full max-w-screen-xl px-2.5 sm:px-20 mt-10 sm:mx-auto sm:max-w-3xl'>
      <ToastContainer className='w-[380px]' />
      <TodoForm />
      <Todos />
    </main>
  )
}

export default App
