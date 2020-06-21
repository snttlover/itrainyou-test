import { ChangePasswordRequest, changePassword } from "@/lib/api/users/change-password"
import { createEffectorField } from "@/lib/generators/efffector"
import { passwordValidator, trimString } from "@/lib/validators"
import { AxiosError } from "axios"
import { combine, createEffect, createStoreObject } from "effector-root"
import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import Cookies from "js-cookie"
import { TOKEN_KEY } from "@/store"
import { videoUploadProgressChanged } from "@/feature/coach-get-access/coach-get-access.model"
import { changeToken } from "@/feature/user/user.model"

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
  const token: string = data.result.token
  Cookies.set(TOKEN_KEY, token)
  changeToken(token)
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
