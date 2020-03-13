import { Coach, getCoaches } from "@/application/lib/api/coach"
import { getCategories, Category } from "@/application/lib/api/categories"
import { appDomain } from "@/application/store"
import { forward } from "effector"

// coaches
const searchPageDomain = appDomain.createDomain()

export const fetchCoachesListFx = searchPageDomain.createEffect<void, Coach[]>().use(() => getCoaches())

export const loadCoaches = searchPageDomain.createEvent()

export const $coachesList = searchPageDomain
  .createStore<Coach[]>([])
  .on(fetchCoachesListFx.done, (state, payload) => payload.result)

forward({
  from: loadCoaches,
  to: fetchCoachesListFx
})
