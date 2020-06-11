import { UpdateMyUserRequest, updateMyUser } from "@/application/lib/api/users/update-my-user"
import { createEffectorField } from "@/application/lib/generators/efffector"
import { emailValidator, passwordValidator, trimString } from "@/application/lib/validators"
import { AxiosError } from "axios"
import { combine, createEffect, createStoreObject } from "effector-next"
import { toasts } from "@/application/components/layouts/behaviors/dashboards/common/toasts/toasts"
import Cookies from "js-cookie"
import { TOKEN_KEY } from "@/store"

type ResetRType = {
  email: string
  timeZone: string
}

export const changeGeneralSettingsFx = createEffect<ResetRType, UpdateMyUserRequest, AxiosError>({
  handler: ({ email, timeZone }) => updateMyUser({ email, timeZone }),
})

changeGeneralSettingsFx.done.watch(data => {
  // @ts-ignore
  Cookies.set(TOKEN_KEY, data.result.token)
  toasts.add({
    type: `info`,
    text: `Пароль изменен`,
  })
})

changeGeneralSettingsFx.fail.watch(data => {
  toasts.add({
    type: `error`,
    text: `Произошла ошибка при изменении пароля`,
  })
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString),
})

export const [$timeZone, timeZoneChanged, $timeZoneError, $isTimeZoneCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: v => {
    if (!v.trim()) {
      return `Это поле обязательно для заполнения`
    }
    return null
  },
  eventMapper: event => event.map(trimString),
})

export const $changeGeneralSettingsForm = createStoreObject({
  email: $email,
  timeZone: $timeZone,
})

export const $changeGeneralSettingsFormErrors = createStoreObject({
  email: $emailError,
  timeZone: $timeZoneError,
})

export const $isGeneralSettingsFormFormValid = combine(
  $isEmailCorrect,
  $isTimeZoneCorrect,
  (isEmailCorrect, isTimeZoneCorrect) => isEmailCorrect && isTimeZoneCorrect
)
