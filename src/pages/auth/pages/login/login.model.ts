import { $dashboard, DashboardType } from "@/feature/dashboard/dashboard"
import { loggedIn, setUserData } from "@/feature/user/user.model"
import { login, LoginResponse } from "@/lib/api/login"
import { createEffectorField, UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { history } from "@/feature/navigation"
import { emailValidator, trimString } from "@/lib/validators"
import { AxiosError } from "axios"
import { attach, combine, createEffect, createEvent, createStoreObject, forward, sample } from "effector-root"

export const loginFormSent = createEvent()

export const loginFx = createEffect<UnpackedStoreObjectType<typeof $loginForm>, LoginResponse, AxiosError>({
  handler: ({ email, password }) => login({ email, password }),
})

type RedirectParams = { data: LoginResponse; dashboard: DashboardType }

const _loginRedirectFx = createEffect({
  handler: ({ data, dashboard }: RedirectParams) => {
    if (!data.user.client && !data.user.coach) {
      history.push("/auth/signup/2")
    } else if (data.user.coach?.isForeverRejected) {
      history.push("/client/")
    } else if (dashboard === "client") {
      history.push("/client/")
    } else if (dashboard === "coach") {
      history.push("/coach/")
    } else if (data.user.coach) {
      history.push("/coach/")
    } else {
      history.push("/client/")
    }
  },
})

const loginRedirectFx = attach({
  effect: _loginRedirectFx,
  mapParams: (response: LoginResponse, dashboard) => ({
    data: response,
    dashboard,
  }),
  source: $dashboard,
})

forward({
  from: loginFx.doneData,
  to: loggedIn,
})

forward({
  from: loginFx.doneData,
  to: loginRedirectFx,
})

forward({
  from: loginFx.doneData.map(response => ({ client: response.user.client, coach: response.user.coach })),
  to: setUserData,
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString),
})

$emailError.on(loginFx, () => null).on(loginFx.fail, (state, { error }) => `Неверные данные`)

export const [$password, passwordChanged, $passwordError, $isPasswordCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: () => null,
  eventMapper: event => event.map(trimString),
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
