import { $dashboard, DashboardType } from "@/application/feature/dashboard/dashboard"
import { loggedIn, setUserData } from "@/application/feature/user/user.model"
import { login, LoginResponse } from "@/application/lib/api/login"
import { createEffectorField, UnpackedStoreObjectType } from "@/application/lib/generators/efffector"
import { emailValidator, trimString } from "@/application/lib/validators"
import { AxiosError } from "axios"
import { attach, combine, createEffect, createEvent, createStoreObject, forward, sample } from "effector-next"
import Router from "next/router"

export const loginFormSent = createEvent()

export const loginFx = createEffect<UnpackedStoreObjectType<typeof $loginForm>, LoginResponse, AxiosError>({
  handler: ({ email, password }) => login({ email, password }),
})

type RedirectParams = { data: LoginResponse; dashboard: DashboardType }

const _loginRedirectFx = createEffect({
  handler: ({ data, dashboard }: RedirectParams) => {
    if (!data.user.client && !data.user.coach) {
      Router.push("/auth/signup/[step]", "/auth/signup/2")
    } else if (data.user.coach?.isForeverRejected) {
      Router.push("/client/", "/client/")
    } else if (dashboard === "client") {
      Router.push("/client/", "/client/")
    } else if (dashboard === "coach") {
      Router.push("/coach/", "/coach/")
    } else if (data.user.coach) {
      Router.push("/coach", "/coach/")
    } else {
      Router.push("/client/", "/client/")
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
