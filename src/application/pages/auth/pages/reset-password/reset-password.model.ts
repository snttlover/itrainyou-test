import { ResetPasswordRequest, resetPassword } from "@/application/lib/api/reset-password"
import { createEffectorField } from "@/application/lib/generators/efffector"
import { passwordValidator, trimString } from "@/application/lib/validators"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStore, createStoreObject } from "effector-next"
import Router from "next/router"

export const resetFormSended = createEvent()

type ResetRType = {
  token: string
  password: string
}

export const resetFx = createEffect<ResetRType, ResetPasswordRequest, AxiosError>({
  handler: ({ password, token }) => resetPassword({ password, token })
})

resetFx.done.watch(data => {
  Router.push(`/`)
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

export const $commonError = createStore<string | null>(null)
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

export const updateResetSuccessMessageVisibility = createEvent<boolean>()
export const $resetSuccessMessageVisibility = createStore(false)
  .on(updateResetSuccessMessageVisibility, (state, status) => status)
  .on(resetFx.done, () => true)
