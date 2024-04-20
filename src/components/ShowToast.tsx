import { ToastContainer, toast } from 'react-toastify'

const ToastContent = ({ title, description }: ShowToastProps) => (
  <div>
    <h1 className='font-bold'>{title}</h1>
    <p className='font-light'>{description}</p>
  </div>
)

type ShowToastProps = {
  title: string
  description: string
}

const ShowToast = ({ title, description }: ShowToastProps) => {
  toast.success(<ToastContent title={title} description={description} />, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light',
  })

  return <ToastContainer className='w-[400px]' />
}

export default ShowToast
