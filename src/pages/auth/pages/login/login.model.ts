import { $dashboard } from "@/feature/dashboard/dashboard"
import { loggedIn, setUserData } from "@/feature/user/user.model"
import { login, LoginResponse } from "@/lib/api/login"
import { createEffectorField, UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { navigateReplace } from "@/feature/navigation"
import { emailValidator, trimString } from "@/lib/validators"
import { routeNames } from "@/pages/route-names"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStoreObject, forward, sample } from "effector-root"

export const loginFormSent = createEvent()

export const loginFx = createEffect<UnpackedStoreObjectType<typeof $loginForm>, LoginResponse, AxiosError>({
  handler: ({ email, password }) => login({ email, password }),
})

export const resetLoginForm = createEvent()

sample({
  source: $dashboard,
  clock: loginFx.doneData,
  fn: (dashboard, data) => {
    let url
    if (!data.user.client && !data.user.coach) {
      url = routeNames.signup("2")
    } else if (data.user.coach?.isForeverRejected) {
      url = routeNames.client()
    } else if (dashboard === "client") {
      url = routeNames.client()
    } else if (dashboard === "coach") {
      url = routeNames.coach()
    } else if (data.user.coach) {
      url = routeNames.coach()
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
  from: loginFx.doneData,
  to: loggedIn,
})

forward({
  from: loginFx.doneData.map(response => ({ client: response.user.client, coach: response.user.coach })),
  to: setUserData,
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString),
  reset: resetLoginForm,
})

$emailError.on(loginFx, () => null).on(loginFx.fail, (state, { error }) => `Неверные данные`)

export const [$password, passwordChanged, $passwordError, $isPasswordCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: () => null,
  eventMapper: event => event.map(trimString),
  reset: resetLoginForm,
})

export const $loginForm = createStoreObject({
  email: $email,
  password: $password,
})

export const $loginFormErrors = createStoreObject({
  email: $emailError,
  password: $passwordError,
})

export const $isFormValid = combine(
  $isPasswordCorrect,
  $isEmailCorrect,
  (isPasswordCorrect, isEmailCorrect) => isPasswordCorrect && isEmailCorrect
)

sample({
  source: $loginForm,
  clock: loginFormSent,
  target: loginFx,
})
