import { loggedIn } from "#/feature/user/user.model"
import { registerAsUser, RegisterAsUserResponse } from "#/lib/api/register"
import { createEffectorField, UnpackedStoreObjectType } from "#/lib/generators/efffector"
import { navigatePush } from "#/feature/navigation"
import { emailValidator, passwordValidator, trimString } from "#/lib/validators"
import { userDataReset } from "#/pages/auth/pages/signup/signup.model"
import { routeNames } from "#/pages/route-names"
import { createGate } from "#/scope"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStoreObject, forward, sample } from "effector-root"

export const step1Gate = createGate()

export const step1Registered = createEvent()
export const registerFx = createEffect<UnpackedStoreObjectType<typeof $step1Form>, RegisterAsUserResponse, AxiosError>({
  handler: ({ email, password }) => registerAsUser({ email, password }),
})

forward({
  from: registerFx.doneData.map(data => ({ token: data.token })),
  to: loggedIn,
})

forward({
  from: registerFx.doneData,
  to: userDataReset,
})

forward({
  from: registerFx.doneData.map(() => ({ url: routeNames.signup("2") })),
  to: navigatePush,
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString),
  reset: step1Gate.open,
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
  eventMapper: event => event.map(trimString),
  reset: step1Gate.open,
})

export const [
  $passwordRepeat,
  passwordRepeatChanged,
  $passwordRepeatError,
  $isPasswordRepeatCorrect,
] = createEffectorField<string, { value: string; $password: string }>({
  validatorEnhancer: $store => combine($store, $password, (value, password) => ({ $password: password, value })),
  defaultValue: "",
  validator: v => {
    const error = passwordValidator(v.value)
    if (v.$password !== v.value) return "Пароли не совпадают"
    return error
  },
  eventMapper: event => event.map(trimString),
  reset: step1Gate.open,
})

export const $step1Form = createStoreObject({
  email: $email,
  password: $password,
  passwordRepeat: $passwordRepeat,
})

export const $step1FormErrors = createStoreObject({
  email: $emailError,
  password: $passwordError,
  passwordRepeat: $passwordRepeatError,
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
  target: registerFx,
})
