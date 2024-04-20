import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type ToastPosition, toast } from 'react-toastify'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum ToastAllTypes {
  SUCCESS,
  INFO,
  WARNING,
  ERROR,
  DEFAULT,
}

type ToastType =
  | ToastAllTypes.SUCCESS
  | ToastAllTypes.INFO
  | ToastAllTypes.WARNING
  | ToastAllTypes.ERROR
  | ToastAllTypes.DEFAULT
type ToastObjType = {
  position: ToastPosition | undefined
  autoClose: number
  hideProgressBar: boolean
  closeOnClick: boolean
  pauseOnHover: boolean
  draggable: boolean
  theme: string
}

export function todoToast(
  toastMessage: string,
  type: ToastType = ToastAllTypes.SUCCESS
) {
  const toastObj: ToastObjType = {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: 'colored',
  }

  if (type === ToastAllTypes.SUCCESS) {
    toast.success(toastMessage, toastObj)
  } else if (type === ToastAllTypes.INFO) {
    toast.info(toastMessage, toastObj)
  } else if (type === ToastAllTypes.WARNING) {
    toast.warning(toastMessage, toastObj)
  } else if (type === ToastAllTypes.ERROR) {
    toast.error(toastMessage, toastObj)
  } else {
    toast(toastMessage, toastObj)
  }
}
