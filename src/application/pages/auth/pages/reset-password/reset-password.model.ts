import { ResetPasswordRequest, resetPassword } from "@/application/lib/api/reset-password"
import { appDomain } from "@/application/store"

import { createEffectorField } from "@app/lib/generators/efffector"
import { navigate } from "@app/lib/navigation"
import { passwordValidator, trimString } from "@app/lib/validators"
import { AxiosError } from "axios"
import { combine, createStoreObject } from "effector"
import { signUpDomain } from "@app/pages/auth/pages/signup/signup.model"

const resetDomain = appDomain.createDomain()

export const resetFormSended = resetDomain.createEvent()

type ResetRType = {
  token: string
  password: string
}

export const resetFx = resetDomain.createEffect<ResetRType, ResetPasswordRequest, AxiosError>({
  handler: ({ password, token }) => resetPassword({ password, token })
})

resetFx.done.watch(data => {
  navigate(`/`)
})

export const [$password, passwordChanged, $passwordError, $isPasswordCorrect] = createEffectorField<string>({
  domain: resetDomain,
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

export const $commonError = resetDomain
  .createStore<string | null>(null)
  .on(resetFx, () => null)
  .on(resetFx.fail, (state, { error }) => {
    if (error.response?.data.token) {
      return `Ссылка больше недействительна`
    }

    return `Произошла ошибка при изменении пароля`
  })

export const $resetForm = createStoreObject({
  password: $password,
  passwordRepeat: $passwordRepeat
})

export const $resetFormErrors = createStoreObject({
  password: $passwordError,
  passwordRepeat: $passwordRepeatError
})

export const $isFormValid = combine(
  $isPasswordCorrect,
  $isPasswordRepeatCorrect,
  (isPasswordCorrect, isPasswordRepeatCorrect) => isPasswordCorrect && isPasswordRepeatCorrect
)

export const updateResetSuccessMessageVisibility = resetDomain.createEvent<boolean>()
export const $resetSuccessMessageVisibility = resetDomain
  .createStore(false)
  .on(updateResetSuccessMessageVisibility, (state, status) => status)
  .on(resetFx.done, () => true)
