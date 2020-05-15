import { Coach, getCoach } from "@/application/lib/api/coach"
import { serverStarted } from "@/store"
import { createEffect, createEvent, createStore, forward } from "effector-next"

export const loadCoach = createEffect({
  handler: ({ id }) => {
    console.log(id)
    return getCoach({ id })
  }
})

export const mounted = createEvent<{ id: number }>()

export const $coach = createStore<Coach | null>(null).on(loadCoach.doneData, (state, payload) => payload)

forward({
  // @ts-ignore
  from: serverStarted.map(({ query }) => query),
  to: loadCoach
})

forward({
  from: mounted,
  to: loadCoach
})
