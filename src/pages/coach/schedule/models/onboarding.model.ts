import { createEffect, createEvent, createStore, forward, restore } from "effector-root"
import { ScheduleGate } from "@/pages/coach/schedule/models/schedule/units"


const checkUserFx = createEffect({
  handler: () => {
    const stringData = localStorage.getItem(USER_KEY)
    const isOldUser = JSON.parse(stringData!)
    return !isOldUser
  }
})

export const USER_KEY = "is_old_user"

export const showOnBoarding = createEvent<void | boolean>()
export const $onBoardingVisibility = createStore<boolean>(false).on(
  showOnBoarding,
  (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })

export const $isOldUser = restore(checkUserFx.doneData, false)

forward({
  from: ScheduleGate.open,
  to: checkUserFx,
})

forward({
  from: checkUserFx.doneData.map(data => {
    localStorage.setItem(USER_KEY, "true")
    return data
  }),
  to: showOnBoarding,
})