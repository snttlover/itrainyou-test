import { ChangePasswordRequest, changePassword } from "@/application/lib/api/users/change-password"
import { createEffectorField } from "@/application/lib/generators/efffector"
import { passwordValidator, trimString } from "@/application/lib/validators"
import { AxiosError } from "axios"
import { combine, createEffect, createStoreObject } from "effector-next"
import { Toast, toasts } from "@/application/components/layouts/behaviors/dashboards/common/toasts/toasts"
import Cookies from "js-cookie"
import { TOKEN_KEY } from "@/store"

type ResetRType = {
  oldPassword: string
  password: string
}

export const changePasswordFx = createEffect<ResetRType, ChangePasswordRequest, AxiosError>({
  handler: ({ password, oldPassword }) => changePassword({ newPassword: password, oldPassword }),
})

const successToast: Toast = {
  type: `info`,
  text: `Пароль изменен`,
}
changePasswordFx.done.watch(data => {
  // @ts-ignore
  Cookies.set(TOKEN_KEY, data.result.token)
  toasts.remove(successToast)
  toasts.add(successToast)
})

const errorToast: Toast = {
  type: `error`,
  text: `Произошла ошибка при изменении пароля`,
}

changePasswordFx.fail.watch(data => {
  toasts.remove(errorToast)
  toasts.add(errorToast)
})

export const [$password, passwordChanged, $passwordError, $isPasswordCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: passwordValidator,
  eventMapper: event => event.map(trimString),
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
  }
)


$oldPasswordError.on(changePasswordFx.fail, (state, { error }) => {
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
  validatorEnhancer: $store => combine($store, $password, value => ({ $password: $password.getState(), value })),
  defaultValue: "",
  validator: v => {
    const error = passwordValidator(v.value)
    if (v.$password !== v.value) return "Пароли не совпадают"
    return error
  },
  eventMapper: event => event.map(trimString),
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
