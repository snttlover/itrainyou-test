import { createEffect, createEvent, forward, restore } from "effector-root"

export const TOKEN_COOKIE_KEY = "token"

export const logout = createEvent()

export const changeToken = createEvent<string>()
export const $token = restore(changeToken, "").reset(logout)

export const clearAllFx  = createEffect({
  handler: () => localStorage.clear()
})

forward({
  from: logout,
  to: [clearAllFx]
})
