import { Coach, getCoaches } from "@/application/lib/api/coach"
import { createUniversalStore } from "@/store"
import { createEffect } from "effector"

export const fetchCoachesListFx = createEffect<void, Coach[]>().use(() => getCoaches({}))

export const $coachesList = createUniversalStore<Coach[]>([])
  .on(fetchCoachesListFx.done, (state, payload) => payload.result)

