import { UpdateMyUserRequest, updateMyUser } from "@/application/lib/api/users/update-my-user"
import { createEffectorField } from "@/application/lib/generators/efffector"
import { emailValidator, passwordValidator, trimString } from "@/application/lib/validators"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStoreObject, forward } from "effector-next"
import { Toast, toasts } from "@/application/components/layouts/behaviors/dashboards/common/toasts/toasts"
import Cookies from "js-cookie"
import { TOKEN_KEY } from "@/store"
import { getMyUser } from "@/application/lib/api/users/get-my-user"

type ResetRType = {
  email: string
  timeZone: string
}

export const changeGeneralSettingsFx = createEffect<ResetRType, UpdateMyUserRequest, AxiosError>({
  handler: ({ email, timeZone }) => updateMyUser({ email, timeZone }),
})

const loadProfileFx = createEffect({
  handler: getMyUser,
})

export const mounted = createEvent()

const successToast: Toast = {
  type: `info`,
  text: `Данные профиля сохранены`,
}

changeGeneralSettingsFx.done.watch(data => {
  toasts.remove(successToast)
  toasts.add(successToast)
})

const errorToast: Toast = {
  type: `error`,
  text: `Произошла ошибка при изменении профиля`,
}

changeGeneralSettingsFx.fail.watch(data => {
  toasts.remove(errorToast)
  toasts.add(errorToast)
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString),
})

$email.on(loadProfileFx.doneData, (state, user) => user.email)

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

$timeZone.on(loadProfileFx.doneData, (state, user) => user.timeZone)

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

forward({
  from: mounted,
  to: [loadProfileFx],
})
