import { setUserData } from "@/feature/user/user.model"
import { getMyUserFx, GetMyUserResponse } from "@/lib/api/users/get-my-user"

import { updateMyUser } from "@/lib/api/users/update-my-user"

import { createEffectorField } from "@/lib/generators/efffector"
import { keysToCamel } from "@/lib/network/casing"
import { phoneValidator, emailValidator, trimString } from "@/lib/validators"
import { createGate } from "@/scope"
import { combine, createEffect, createEvent, createStoreObject, forward, guard} from "effector-root"
import { Toast, toasts } from "@/old-components/layouts/behaviors/dashboards/common/toasts/toasts"

export const SettingsGate = createGate()

type ResetRType = {
  email: string
  phone: string
  timeZone: string
}

export const changeGeneralSettingsFx = createEffect({
  handler: ({ email, phone, timeZone }: ResetRType) => updateMyUser({ email, timeZone, phone: "+"+phone.replace(/\D+/g,"") })
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

guard({
  source: changeGeneralSettingsFx.fail.map(_ => errorToast),
  filter: changeGeneralSettingsFx.fail.map(error => !error.error.response.data.email[0] && !error.error.response.data.phone[0]),
  target: [toasts.remove, toasts.add],
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: emailValidator,
  eventMapper: event => event.map(trimString),
  reset: SettingsGate.open,
})

export const [$phone, phoneChanged, $phoneError, $isPhoneCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: phoneValidator,
  eventMapper: event => event.map(trimString),
  reset: SettingsGate.open,
})

guard({
  source: changeGeneralSettingsFx.fail.map(error => error.error.response.data.email[0]),
  filter: emailError => emailError,
  target: $emailError,
})


guard({
  source: changeGeneralSettingsFx.fail.map(error => error.error.response.data.phone[0]),
  filter: phoneError => phoneError,
  target: $phoneError,
})

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

const userDoneData = getMyUserFx.doneData.map<GetMyUserResponse>(data => keysToCamel(data.data))

$email.on(userDoneData, (state, user) => user.email)
$phone.on(userDoneData, (state, user) => user.phone)
$timeZone.on(userDoneData, (state, user) => user.timeZone)

export const $changeGeneralSettingsForm = createStoreObject({
  email: $email,
  phone: $phone,
  timeZone: $timeZone,
})

export const $changeGeneralSettingsFormErrors = createStoreObject({
  email: $emailError,
  phone: $phoneError,
  timeZone: $timeZoneError,
})

export const $isGeneralSettingsFormFormValid = combine(
  $isEmailCorrect,
  $isPhoneCorrect,
  $isTimeZoneCorrect,
  (isEmailCorrect, isPhoneCorrect, isTimeZoneCorrect) => isEmailCorrect && isPhoneCorrect && isTimeZoneCorrect
)

forward({
  from: mounted,
  to: [getMyUserFx],
})
