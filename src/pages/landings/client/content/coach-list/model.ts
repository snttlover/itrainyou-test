import { createEffect, createEvent, forward } from "effector-root"
import { createStore } from "effector-root"

import { Coach, getCoaches } from "@/lib/api/coach"

const fetchCoachesListFx = createEffect<void, Coach[]>().use(() => getCoaches({}))

export const loadCoaches = createEvent()

export const $coachesList = createStore<Coach[]>([]).on(fetchCoachesListFx.done, (state, payload) => payload.result)

forward({
  from: loadCoaches,
  to: fetchCoachesListFx,
})
