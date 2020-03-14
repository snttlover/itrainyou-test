import { LoginRequest, login, LoginResponse } from "@/application/lib/api/login"
import { NetworkError } from "@/application/lib/network/network"
import { appDomain } from "@/application/store"
import { extractError } from "@/application/lib/network/extract-error"

const loginDomain = appDomain.createDomain()

// form
export const updateEmail = loginDomain.createEvent<string>()
export const $email = loginDomain.createStore(``).on(updateEmail, (state, email) => email)

export const updatePassword = loginDomain.createEvent<string>()
export const $password = loginDomain.createStore(``).on(updatePassword, (state, password) => password)

// queries
export const loginFx = loginDomain.createEffect<LoginRequest, LoginResponse, NetworkError>().use(form => login(form))

// errors
export const updateLoginError = loginDomain.createEvent<string>()
export const $loginError = loginDomain.createStore(``).on(updateLoginError, (state, error) => error)

// loading
export const $loginFetching = loginDomain
  .createStore(false)
  .on(loginFx, () => true)
  .on(loginFx.finally, () => false)

loginFx.done.watch(() => {
  alert("logged in")
  updateLoginError(``)
  updatePassword(``)
  updateEmail(``)
})

loginFx.fail.watch(({ error }) => updateLoginError(extractError(error)))
