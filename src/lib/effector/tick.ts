import { createStore, createEvent, createEffect } from "effector-root"
import { runInScope } from "@/scope"
import Timeout = NodeJS.Timeout

export const createTicker = (interval: number) => {
  let timer: Timeout

  const tick = createEvent()
  const stop = createEffect(() => {
    clearInterval(timer)
  })

  const start = createEffect(() => {
    timer = setInterval(() => runInScope(tick), interval)
  })

  const $date = createStore(new Date().getTime()).on(tick, () => new Date().getTime())

  return {
    start,
    stop,
    $date
  }
}
