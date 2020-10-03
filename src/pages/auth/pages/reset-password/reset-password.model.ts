import { navigatePush } from "@/feature/navigation"
import { ResetPasswordRequest, resetPassword } from "@/lib/api/reset-password"
import { createEffectorField } from "@/lib/generators/efffector"
import { passwordValidator, trimString } from "@/lib/validators"
import { routeNames } from "@/pages/route-names"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStore, createStoreObject, forward } from "effector-root"

type ResetRType = {
  token: string
  password: string
}

export const resetFx = createEffect<ResetRType, ResetPasswordRequest, AxiosError>({
  handler: ({ password, token }) => resetPassword({ password, token }),
})

forward({
  from: resetFx.done.map(() => ({ url: routeNames.login() })),
  to: navigatePush,
})

export const [$password, passwordChanged, $passwordError, $isPasswordCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: passwordValidator,
  eventMapper: event => event.map(trimString),
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
  passwordRepeat: $passwordRepeat,
})

export const $resetFormErrors = createStoreObject({
  password: $passwordError,
  passwordRepeat: $passwordRepeatError,
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
