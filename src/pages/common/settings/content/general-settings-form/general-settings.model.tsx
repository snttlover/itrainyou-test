import { setUserData } from "@/feature/user/user.model"
import { getMyUserFx, GetMyUserResponse } from "@/lib/api/users/get-my-user"
import { updateMyUser } from "@/lib/api/users/update-my-user"
import { createEffectorField } from "@/lib/generators/efffector"
import { keysToCamel } from "@/lib/network/casing"
import { emailValidator, trimString } from "@/lib/validators"
import { createGate } from "@/scope"
import { combine, createEffect, createEvent, createStoreObject, forward } from "effector-root"
import { Toast, toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"

export const SettingsGate = createGate()

type ResetRType = {
  email: string
  timeZone: string
}

export const changeGeneralSettingsFx = createEffect({
  handler: ({ email, timeZone }: ResetRType) => updateMyUser({ email, timeZone }),
})

export const mounted = createEvent()

const successToast: Toast = {
  type: "info",
  text: "Данные профиля сохранены",
}

forward({
  from: changeGeneralSettingsFx.done.map(_ => successToast),
  to: [toasts.remove, toasts.add],
})

forward({
  from: changeGeneralSettingsFx.doneData,
  to: setUserData,
})

const errorToast: Toast = {
  type: "error",
  text: "Произошла ошибка при изменении профиля",
}

forward({
  from: changeGeneralSettingsFx.fail.map(_ => errorToast),
  to: [toasts.remove, toasts.add],
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString),
  reset: SettingsGate.open,
})

const userDoneData = getMyUserFx.doneData.map<GetMyUserResponse>(data => keysToCamel(data.data))

$email.on(userDoneData, (state, user) => user.email)

export const [$timeZone, timeZoneChanged, $timeZoneError, $isTimeZoneCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: v => {
    if (!v || !v.trim()) {
      return "Это поле обязательно для заполнения"
    }
    return null
  },
  eventMapper: event => event.map(trimString),
  reset: SettingsGate.open,
})

$timeZone.on(userDoneData, (state, user) => user.timeZone)

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
  to: [getMyUserFx],
})
