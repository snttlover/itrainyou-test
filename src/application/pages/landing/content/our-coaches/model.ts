import { Coach, getCoaches } from "@/application/lib/api/coach"
import { serverStarted } from "@/store"
import { createEffect, forward } from "effector-next"
import { createStore } from "effector-next"

export const fetchCoachesListFx = createEffect<void, Coach[]>().use(() => getCoaches({}))

export const $coachesList = createStore<Coach[]>([])
  .on(fetchCoachesListFx.done, (state, payload) => payload.result)

forward({
  from: serverStarted,
  to: fetchCoachesListFx
})

