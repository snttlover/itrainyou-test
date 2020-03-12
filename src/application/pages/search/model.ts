import { Coach, getCoaches } from "@/application/lib/api/coach"
import { appDomain } from "@/application/store"
import { forward } from "effector"

const landingDomain = appDomain.createDomain()

export const fetchCoachesListFx = landingDomain.createEffect<void, Coach[]>().use(() => getCoaches())

export const loadCoaches = landingDomain.createEvent()

export const $coachesList = landingDomain
  .createStore<Coach[]>([])
  .on(fetchCoachesListFx.done, (state, payload) => payload.result)

forward({
  from: loadCoaches,
  to: fetchCoachesListFx
})
