import { setUserData } from "@/feature/user/user.model"

import { updateMyUser, UpdateMyUserResponse, UpdateMyUserResponseError } from "@/lib/api/users/update-my-user"

import { createEffectorField } from "@/lib/generators/efffector"
import { phoneValidator, emailValidator, trimString } from "@/lib/validators"
import { createGate } from "@/scope"
import { getMyUserApiFx } from "@/shared/api/users/get-my-user"
import { combine, createEffect, createEvent, createStoreObject, forward, guard, merge, split } from "effector-root"
import { Toast, toasts } from "@/old-components/layouts/behaviors/dashboards/common/toasts/toasts"
import { AxiosError } from "axios"

export const SettingsGate = createGate()

type ResetRType = {
  email: string
  phone: string
  timeZone: string
}

export const changeGeneralSettingsFx = createEffect<
  ResetRType,
  UpdateMyUserResponse,
  AxiosError<UpdateMyUserResponseError>
>({
  handler: ({ email, phone, timeZone }) => updateMyUser({
    email, timeZone, phone: "+"+phone.replace(/\D+/g,"")
  })
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
  source: changeGeneralSettingsFx.failData,
  filter: (error) => !error?.response?.data?.email?.[0] && !error?.response?.data?.phone?.[0],
  target: merge([toasts.remove.prepend(() => errorToast), toasts.add.prepend(() => errorToast)]),
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

forward({
  from: changeGeneralSettingsFx.failData.filterMap(
    (error) => error?.response?.data?.email?.[0] && "Данный email уже занят"
  ),
  to: $emailError,
})

forward({
  from: changeGeneralSettingsFx.failData.filterMap(
    (error) => error?.response?.data?.phone?.[0] && "Данный телефон уже занят"
  ),
  to: $phoneError,
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

$email.on(getMyUserApiFx.fx.doneBody, (state, user) => user.email)
$phone.on(getMyUserApiFx.fx.doneBody, (state, user) => user.phone)
$timeZone.on(getMyUserApiFx.fx.doneBody, (state, user) => user.timeZone)

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
  to: [getMyUserApiFx.fx],
})
