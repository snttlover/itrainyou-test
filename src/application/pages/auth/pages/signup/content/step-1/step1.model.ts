import { loggedIn } from "@/application/feature/user/user.model"
import { registerAsUser, RegisterAsUserResponse } from "@/application/lib/api/register"
import { createEffectorField, UnpackedStoreObjectType } from "@/application/lib/generators/efffector"
import { emailValidator, passwordValidator, trimString } from "@/application/lib/validators"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStoreObject, sample } from "effector"
import Router from "next/router"

export const step1Registered = createEvent()
export const registerFx = createEffect<
  UnpackedStoreObjectType<typeof $step1Form>,
  RegisterAsUserResponse,
  AxiosError
>({
  handler: ({ email, password }) => registerAsUser({ email, password })
})

registerFx.doneData.watch(payload => {
  loggedIn({ token: payload.token })
  Router.push('/signup/2')
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString)
})

$emailError.on(registerFx.fail, (state, { error }) => {
  if (error.response?.data.email) {
    return "Пользователь с данным email уже существует"
  }
  return state
})

export const [$password, passwordChanged, $passwordError, $isPasswordCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: passwordValidator,
  eventMapper: event => event.map(trimString)
})

export const [
  $passwordRepeat,
  passwordRepeatChanged,
  $passwordRepeatError,
  $isPasswordRepeatCorrect
] = createEffectorField<string>({
  defaultValue: "",
  validator: value => {
    const error = passwordValidator(value)
    const passwordValue = $password.getState()
    if (passwordValue !== value) return "Пароли не совпадают"
    return error
  },
  eventMapper: event => event.map(trimString)
})

export const $step1Form = createStoreObject({
  email: $email,
  password: $password,
  passwordRepeat: $passwordRepeat
})

export const $step1FormErrors = createStoreObject({
  email: $emailError,
  password: $passwordError,
  passwordRepeat: $passwordRepeatError
})

export const $isFormValid = combine(
  $isPasswordCorrect,
  $isEmailCorrect,
  $isPasswordRepeatCorrect,
  (isPasswordCorrect, isEmailCorrect, isPasswordRepeatCorrect) =>
    isPasswordCorrect && isEmailCorrect && isPasswordRepeatCorrect
)

sample({
  source: $step1Form,
  clock: step1Registered,
  target: registerFx
})
