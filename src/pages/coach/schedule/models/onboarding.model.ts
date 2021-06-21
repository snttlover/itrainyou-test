import { createEffect, createEvent, createStore, forward, split } from "effector-root"
import { ScheduleGate } from "@/pages/coach/schedule/models/schedule/units"

const STORAGE_KEY = "on_boarding"

const checkUserFx = createEffect({
  handler: () => {
    const stringData = localStorage.getItem(STORAGE_KEY)
    const isOldUser = JSON.parse(stringData!)
    return isOldUser
  }
})

export const showFirstOnBoarding = createEvent<void | boolean>()

export const showSecondOnBoarding = createEvent<void | boolean>()
export const $onBoardingVisibility = createStore<boolean>(false)
  .on(showFirstOnBoarding, (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })
  .on(showSecondOnBoarding, (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })

export const $onBoarding = createStore("first")
  .on(showFirstOnBoarding, (state, payload) => "first")
  .on(showSecondOnBoarding, (state, payload) => "second")

forward({
  from: ScheduleGate.open,
  to: checkUserFx,
})

forward({
  from: checkUserFx.doneData.map(data => {
    localStorage.setItem(STORAGE_KEY, "old_user")
    return data !== "old_user"
  }),
  to: showFirstOnBoarding,
})