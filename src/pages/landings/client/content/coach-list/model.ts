import { createEffect, createEvent, forward } from "effector-root"
import { createStore } from "effector-root"

import { Coach, getCoaches, GetCoachesParamsTypes } from "@/lib/api/coach"

export const fetchCoachesListFx = createEffect<GetCoachesParamsTypes, Coach[]>({
  handler: getCoaches,
})

export const loadCoaches = createEvent<GetCoachesParamsTypes>()

export const $coachesList = createStore<Coach[]>([]).on(fetchCoachesListFx.done, (state, payload) => payload.result)

forward({
  from: loadCoaches,
  to: fetchCoachesListFx,
})
