import { login, LoginResponse } from "@/application/lib/api/login"
import { appDomain } from "@/application/store"

import { createEffectorField, UnpackedStoreObjectType } from "@app/lib/generators/efffector"
import { emailValidator, trimString } from "@app/lib/validators"
import { AxiosError } from "axios"
import { combine, createStoreObject, sample } from "effector"

const loginDomain = appDomain.createDomain()

export const loginFormSended = loginDomain.createEvent()

export const loginFx = loginDomain.createEffect<UnpackedStoreObjectType<typeof $loginForm>, LoginResponse, AxiosError>({
  handler: ({ email, password }) => login({ email, password })
})

loginFx.done.watch(payload => {
  alert(`success login`)
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  domain: loginDomain,
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString)
})

export const $commonError = loginDomain
  .createStore<string | null>(null)
  .on(loginFx, () => null)
  .on(loginFx.fail, (state, { error }) => `Неверные данные`)

export const [$password, passwordChanged, $passwordError, $isPasswordCorrect] = createEffectorField<string>({
  domain: loginDomain,
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
