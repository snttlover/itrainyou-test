import { serverStarted, TOKEN_KEY } from "@/store"
import { createEvent, createStore } from "effector-next"
import Cookies from "js-cookie"

export const loggedIn = createEvent<{ token: string }>()
export const logout = createEvent()

export const $token = createStore<string | undefined>("")
  .on(serverStarted, (state, payload) => payload.cookies[TOKEN_KEY])
  .on(loggedIn, (state, payload) => payload.token)
  .reset(logout)

export const $isLoggedIn = createStore(false)
  .on(loggedIn, () => true)
  .on($token, (state, payload) => !!payload)
  .reset(logout)

if (process.browser) {
  const tokenCookie = Cookies.get(TOKEN_KEY)
  tokenCookie && loggedIn({ token: tokenCookie })

  $token.updates.watch(token => {
    if (token) Cookies.set(TOKEN_KEY, token)
    else Cookies.remove(TOKEN_KEY)
  })
}
