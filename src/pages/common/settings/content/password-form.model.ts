import { changePassword, ChangePasswordResponse } from "@/lib/api/users/change-password"
import { createEffectorField } from "@/lib/generators/efffector"
import { changeToken } from "@/lib/network/token"
import { passwordValidator, trimString } from "@/lib/validators"
import { createGate } from "@/scope"
import { AxiosError } from "axios"
import { combine, createEffect, createStoreObject, forward } from "effector-root"
import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"

export const PasswordFormGate = createGate()

type ResetRType = {
  oldPassword: string
  password: string
}

export const changePasswordFx = createEffect<ResetRType, ChangePasswordResponse, AxiosError>({
  handler: ({ password, oldPassword }) => changePassword({ newPassword: password, oldPassword }),
})

const successToast: Toast = {
  type: `info`,
  text: `Пароль изменен`,
}

forward({
  from: changePasswordFx.done.map(_ => successToast),
  to: [toasts.remove, toasts.add],
})

forward({
  from: changePasswordFx.done.map(data => data.result.token),
  to: changeToken,
})

const errorToast: Toast = {
  type: `error`,
  text: `Произошла ошибка при изменении пароля`,
}

forward({
  from: changePasswordFx.fail.map(_ => errorToast),
  to: [toasts.remove, toasts.add],
})

export const [$password, passwordChanged, $passwordError, $isPasswordCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: passwordValidator,
  eventMapper: event => event.map(trimString),
  reset: PasswordFormGate.open,
})

export const [$oldPassword, oldPasswordChanged, $oldPasswordError, $isOldPasswordCorrect] = createEffectorField<string>(
  {
    defaultValue: "",
    validator: v => {
      if (!v.trim()) {
        return `Это поле обязательно для заполнения`
      }
      return null
    },
    eventMapper: event => event.map(trimString),
    reset: PasswordFormGate.open,
  }
)

$oldPasswordError
  .on(changePasswordFx, () => ``)
  .on(changePasswordFx.fail, (state, { error }) => {
    if (error.response?.data.old_password) {
      return `Вы указали неверный пароль`
    }

    return state
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
  reset: PasswordFormGate.open,
})

export const $changePasswordForm = createStoreObject({
  oldPassword: $oldPassword,
  password: $password,
  passwordRepeat: $passwordRepeat,
})

export const $changePasswordFormErrors = createStoreObject({
  oldPassword: $oldPasswordError,
  password: $passwordError,
  passwordRepeat: $passwordRepeatError,
})

export const $isPasswordFormFormValid = combine(
  $isPasswordCorrect,
  $isPasswordRepeatCorrect,
  $isOldPasswordCorrect,
  (isPasswordCorrect, isPasswordRepeatCorrect, isOldPasswordCorrect) =>
    isPasswordCorrect && isPasswordRepeatCorrect && isOldPasswordCorrect
)
