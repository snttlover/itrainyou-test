import { createEffect, createEvent, forward, restore } from "effector-root"
// import { ONBOARDGING_SHOWED_STORAGE_KEY } from "@/pages/coach/schedule/models/onboarding.model"
export const logout = createEvent()

export const changeToken = createEvent<string>()
export const $token = restore(changeToken, "").reset(logout)

export const clearAllFx = createEffect({
  handler: () => {

    localStorage.clear()

  }
})

forward({
  from: logout,
  to: [clearAllFx],
})
