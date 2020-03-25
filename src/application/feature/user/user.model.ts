import { appDomain } from "@app/store"
import * as Cookies from "js-cookie"

const TOKEN_KEY = '__token__'

export const userDomain = appDomain.createDomain()

export const loggedIn = userDomain.createEvent<{ token: string }>()
export const logout = userDomain.createEvent<{ token: string }>()

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
