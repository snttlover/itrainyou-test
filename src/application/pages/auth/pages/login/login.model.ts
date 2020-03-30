import { loggedIn } from "@/application/feature/user/user.model"
import { login, LoginResponse } from "@/application/lib/api/login"
import { createEffectorField, UnpackedStoreObjectType } from "@/application/lib/generators/efffector"
import { emailValidator, trimString } from "@/application/lib/validators"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStore, createStoreObject, sample } from "effector-next"
import Router from "next/router"

export const loginFormSent = createEvent()

export const loginFx = createEffect<UnpackedStoreObjectType<typeof $loginForm>, LoginResponse, AxiosError>({
  handler: ({ email, password }) => login({ email, password })
})

loginFx.doneData.watch(data => {
  loggedIn({ token: data.token })
  if (!data.user.client && !data.user.coach) {
    Router.push('/signup/[step]', '/signup/2')
  } else {
    Router.push('/', '/')
  }
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString)
})

export const $commonError = createStore<string | null>(null)
  .on(loginFx, () => null)
  .on(loginFx.fail, (state, { error }) => `Неверные данные`)

export const [$password, passwordChanged, $passwordError, $isPasswordCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: () => null,
  eventMapper: event => event.map(trimString)
})

export const $loginForm = createStoreObject({
  email: $email,
  password: $password
})

export const $loginFormErrors = createStoreObject({
  email: $emailError,
  password: $passwordError
})

export const $isFormValid = combine(
  $isPasswordCorrect,
  $isEmailCorrect,
  (isPasswordCorrect, isEmailCorrect) => isPasswordCorrect && isEmailCorrect
)

sample({
  source: $loginForm,
  clock: loginFormSent,
  target: loginFx
})
