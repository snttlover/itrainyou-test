import { $dashboard } from "@/feature/dashboard/dashboard"
import { loggedIn, setUserData } from "@/feature/user/user.model"
import { loginPost, LoginResponse } from "@/lib/api/login"
import { createEffectorField, UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { navigateReplace } from "@/feature/navigation"
import { trimString } from "@/lib/validators"
import { routeNames } from "@/pages/route-names"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStoreObject, forward, sample, merge } from "effector-root"
import { userFound } from "@/pages/auth/pages/socials/models/units"

export const loginFormSent = createEvent()

export const loginFx = createEffect<UnpackedStoreObjectType<{login: string, password: string}>, LoginResponse, AxiosError>({
  handler: ({ login, password }) => {
    const email: string = login.includes('@') ? login : login[0] === "8" ? "+7" + login.substr(1) : login[0] === "7" ? "+7" + login.substr(1) : login
    return loginPost({ email, password })
  },
})

export const resetLoginForm = createEvent()

export const [$login, loginChanged, $loginError, $isloginCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: () => null,
  eventMapper: event => event.map(trimString),
  reset: resetLoginForm,
})

$loginError.on(loginFx, () => null).on(loginFx.fail, (state, { error }) => "Неверные почта, телефон или пароль")

export const [$password, passwordChanged, $passwordError, $isPasswordCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: () => null,
  eventMapper: event => event.map(trimString),
  reset: resetLoginForm,
})

export const $loginForm = createStoreObject({
  login: $login,
  password: $password,
})

export const $loginFormErrors = createStoreObject({
  login: $loginError,
  password: $passwordError,
})

export const $isFormValid = combine(
  $isPasswordCorrect,
  $isloginCorrect,
  (isPasswordCorrect, isloginCorrect) => isPasswordCorrect && isloginCorrect
)

sample({
  source: $loginForm,
  clock: loginFormSent,
  target: loginFx,
})

const loginFxUserFoundMerged = merge([loginFx.doneData,userFound])

sample({
  source: $dashboard,
  clock: loginFxUserFoundMerged,
  fn: (dashboard, data) => {
    let url
    if (!data.user.client && !data.user.coach) {
      url = routeNames.signup("2")
    } else if (data.user.coach?.isForeverRejected) {
      url = routeNames.client()
    } else if (dashboard === "coach" && data.user.coach) {
      url = routeNames.coach()
    } else if (data.user.coach) {
      url = routeNames.coach()
    } else if (dashboard === "client") {
      url = routeNames.client()
    } else {
      url = routeNames.client()
    }
    return {
      url,
    }
  },
  target: navigateReplace,
})

forward({
  from: loginFxUserFoundMerged,
  to: [
    loggedIn,
    setUserData.prepend((response: LoginResponse) => ({ client: response.user.client, coach: response.user.coach })),
  ],
})
