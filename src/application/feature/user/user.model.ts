import { createDomain } from "effector-next"
import * as Cookies from "js-cookie"

const TOKEN_KEY = '__token__'

export const userDomain = createDomain()

export const loggedIn = userDomain.createEvent<{ token: string }>()
export const logout = userDomain.createEvent()

export const $isLoggedIn = userDomain
  .createStore(false)
  .on(loggedIn, () => true)
  .reset(logout)

loggedIn.watch(({ token }) => {
  Cookies.set(TOKEN_KEY, token)
})

logout.watch(() => {
  Cookies.remove(TOKEN_KEY)
})
