import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type ToastPosition, toast } from 'react-toastify'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum ToastTypes {
  SUCCESS,
  INFO,
  WARNING,
  ERROR,
  DEFAULT,
}

type ToastType =
  | ToastTypes.SUCCESS
  | ToastTypes.INFO
  | ToastTypes.WARNING
  | ToastTypes.ERROR
  | ToastTypes.DEFAULT

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
  type: ToastType = ToastTypes.SUCCESS
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

  if (type === ToastTypes.SUCCESS) {
    toast.success(toastMessage, toastObj)
  } else if (type === ToastTypes.INFO) {
    toast.info(toastMessage, toastObj)
  } else if (type === ToastTypes.WARNING) {
    toast.warning(toastMessage, toastObj)
  } else if (type === ToastTypes.ERROR) {
    toast.error(toastMessage, toastObj)
  } else {
    toast(toastMessage, toastObj)
  }
}
