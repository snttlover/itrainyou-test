import { setUserData } from "@/feature/user/user.model"
import { getMyUserFx, GetMyUserResponse } from "@/lib/api/users/get-my-user"

import { $userData } from "@/feature/user/user.model"
import { updateMyUser } from "@/lib/api/users/update-my-user"
import { updateMyCoach, UpdateMyCoachRequest } from "@/lib/api/coach/update-my-coach"

import { createEffectorField } from "@/lib/generators/efffector"
import { keysToCamel } from "@/lib/network/casing"
import { phoneValidator, emailValidator, trimString } from "@/lib/validators"
import { createGate } from "@/scope"
import { combine, createEffect, createEvent, createStoreObject, forward } from "effector-root"
import { Toast, toasts } from "@/old-components/layouts/behaviors/dashboards/common/toasts/toasts"

export const SettingsGate = createGate()

type ResetRType = {
  email: string
  phone: string
  timeZone: string
}

export const changeGeneralSettingsFx = createEffect({
  handler: ({ email, phone, timeZone }: ResetRType) => {
    $userData.watch(userData => {
      const dataForPut: UpdateMyCoachRequest = {
        avatar: userData.coach.avatar,
        birthDate: userData.coach.birthDate,
        categories: userData.coach.categories.map(e => e.id),
        firstName: userData.coach.firstName,
        lastName: userData.coach.lastName,
        sex: userData.coach.sex,
        phone: phone,
      }
      console.log(userData)
      updateMyCoach(dataForPut)
      updateMyUser({ email, timeZone })
    })
  },
})


export const mounted = createEvent()

const successTаoast: Toast = {
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

export const [$phone, phoneChanged, $phoneError, $isPhoneCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: phoneValidator,
  eventMapper: event => event.map(trimString),
  reset: SettingsGate.open,
})

const userDoneData = getMyUserFx.doneData.map<GetMyUserResponse>(data => keysToCamel(data.data))

$email.on(userDoneData, (state, user) => user.email)
// Пока работает только для коуча
$phone.on(userDoneData, (state, user) => user.coach.phone)

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
