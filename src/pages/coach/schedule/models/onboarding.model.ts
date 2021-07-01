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

export const showCoachOnboarding = createEvent<void | boolean>()

export const showPromoSessionsOnboarding = createEvent<void | boolean>()
export const $onBoardingVisibility = createStore<boolean>(false)
  .on(showCoachOnboarding, (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })
  .on(showPromoSessionsOnboarding, (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })

export enum ONBOARDING_TYPES {
  COACH = "COACH",
  PROMO_SESSIONS = "PROMO_SESSIONS"
}

export const visibleOnboardingType = createStore<ONBOARDING_TYPES>(ONBOARDING_TYPES.COACH)
  .on(showCoachOnboarding, (state, payload) => ONBOARDING_TYPES.COACH)
  .on(showPromoSessionsOnboarding, (state, payload) => ONBOARDING_TYPES.PROMO_SESSIONS)

forward({
  from: ScheduleGate.open,
  to: checkUserFx,
})

forward({
  from: checkUserFx.doneData.map(data => {
    localStorage.setItem(STORAGE_KEY, "old_user")
    return data !== "old_user"
  }),
  to: showCoachOnboarding,
})