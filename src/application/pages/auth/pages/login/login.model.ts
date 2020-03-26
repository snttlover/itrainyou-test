import { login, LoginResponse } from "@/application/lib/api/login"
import { createEffectorField, UnpackedStoreObjectType } from "@/application/lib/generators/efffector"
import { emailValidator, trimString } from "@/application/lib/validators"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStore, createStoreObject, sample } from "effector-next"

export const loginFormSended = createEvent()

export const loginFx = createEffect<UnpackedStoreObjectType<typeof $loginForm>, LoginResponse, AxiosError>({
  handler: ({ email, password }) => login({ email, password })
})

loginFx.done.watch(payload => {
  alert(`success login`)
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
  clock: loginFormSended,
  target: loginFx
})
