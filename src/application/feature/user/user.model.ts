import { appDomain } from "@app/store"

const TOKEN_KEY = '__token__'

export const userDomain = appDomain.createDomain()

export const loggedIn = userDomain.createEvent<{ token: string }>()
export const logout = userDomain.createEvent<{ token: string }>()

export const $isLoggedIn = userDomain
  .createStore(false)
  .on(loggedIn, () => true)
  .reset(logout)

loggedIn.watch(({ token }) => {
  localStorage.setItem(TOKEN_KEY, token)
})

logout.watch(() => {
  localStorage.removeItem(TOKEN_KEY)
})
