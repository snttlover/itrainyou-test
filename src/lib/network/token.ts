import { createEvent, restore } from "effector-root"

export const TOKEN_COOKIE_KEY = "token"

export const logout = createEvent()

export const changeToken = createEvent<string>()
export const $token = restore(changeToken, "").reset(logout)
