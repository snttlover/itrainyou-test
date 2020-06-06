import { createApi, createStore } from "effector-next"

export type ToastType = "error" | "info"

export type Toast = {
  type: ToastType
  text: string
}

export const $toasts = createStore<Toast[]>([])

export const toasts = createApi($toasts, {
  add: (toasts, toast: Toast) => [...toasts, toast],
  remove: (toasts, toast: Toast) => toasts.filter(item => item !== toast),
})

toasts.add.watch(toast => {
  setTimeout(() => toasts.remove(toast), 3000)
})
