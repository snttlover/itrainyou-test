import { loggedIn } from "@app/feature/user/user.model"
import { registerAsUser, RegisterAsUserResponse } from "@app/lib/api/register"
import { createEffectorField, UnpackedStoreObjectType } from "@app/lib/generators/efffector"
import { emailValidator, passwordValidator, trimString } from "@app/lib/validators"
import { nextStep, signUpDomain } from "@app/pages/auth/pages/signup/signup.model"
import { AxiosError } from "axios"
import { combine, createStoreObject, sample } from "effector"

export const step1Registered = signUpDomain.createEvent()
export const registerFx = signUpDomain.createEffect<
  UnpackedStoreObjectType<typeof $step1Form>,
  RegisterAsUserResponse,
  AxiosError
>({
  handler: ({ email, password }) => registerAsUser({ email, password })
})

registerFx.done.watch(payload => {
  loggedIn({ token: payload.result.token })
  nextStep()
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  domain: signUpDomain,
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
  domain: signUpDomain,
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
  domain: signUpDomain,
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
