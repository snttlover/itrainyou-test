import { createEffect, createEvent, createStore, forward } from "effector-root"
import { ScheduleGate } from "@/pages/coach/schedule/models/schedule/units"

const ONBOARDGING_SHOWED_STORAGE_KEY = "__onboarding_showed__"

export const showCoachOnboarding = createEvent<void | boolean>()

export const showPromoSessionsOnboarding = createEvent<void | boolean>()
export const $onBoardingVisibility = createStore<boolean>(false)
  .on(showCoachOnboarding, (state, payload) => {
    debugger
    if (payload !== undefined) return payload
    return !state
  })
  .on(showPromoSessionsOnboarding, (state, payload) => {
    debugger
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

const checkUserFx = createEffect({
  handler: () => {
    const stringData = localStorage.getItem(ONBOARDGING_SHOWED_STORAGE_KEY)
    debugger
    if (!stringData) return false

    return JSON.parse(stringData)
  }
})

forward({
  from: ScheduleGate.open,
  to: checkUserFx,
})

forward({
  from: checkUserFx.doneData.map(isShowed => {
    localStorage.setItem(ONBOARDGING_SHOWED_STORAGE_KEY, "true")
    debugger
    return !isShowed
  }),
  to: showCoachOnboarding,
})