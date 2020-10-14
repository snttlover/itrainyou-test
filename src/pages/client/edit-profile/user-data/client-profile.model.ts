import { $userData, loadUserData } from "@/feature/user/user.model"
import { Sex } from "@/lib/api/interfaces/utils.interface"
import { UploadMediaResponse } from "@/lib/api/media"
import { date } from "@/lib/formatting/date"
import { createEffectorField } from "@/lib/generators/efffector"
import { trimString } from "@/lib/validators"
import { createGate } from "@/scope"
import dayjs, { Dayjs } from "dayjs"
import { combine, createEffect, createEvent, createStore, forward, restore, sample, Event } from "effector-root"
import { every, spread } from "patronum"
import { updateMyClient } from "@/lib/api/client/update"
import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"

export const imageUploaded = createEvent<UploadMediaResponse>()
export const $image = createStore<UploadMediaResponse>({ id: -1, type: "IMAGE", file: "" }).on(
  imageUploaded,
  (state, payload) => payload
)

const $isImageError = $image.map(img => (!img.file && "Изображение обязательно к загрузке") || null)
const $isImageCorrect = $isImageError.map(error => !error)

export const toggleUploadModal = createEvent()
export const $isUploadModelOpen = createStore(false)
  .on(toggleUploadModal, store => !store)
  .on(imageUploaded, () => false)

export const [$name, nameChanged, $nameError, $isNameCorrect] = createEffectorField({
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле обязательно к заполнению"
    if (/[^a-zA-Zа-яА-Я ]+/.test(value)) return "Можно использовать только буквы"
    return null
  },
  eventMapper: event => event.map(trimString),
})

export const [$lastName, lastNameChanged, $lastNameError, $isLastNameCorrect] = createEffectorField({
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле обязательно к заполнению"
    if (/[^a-zA-Zа-яА-Я ]+/.test(value)) return "Можно использовать только буквы"
    return null
  },
  eventMapper: event => event.map(trimString),
})

export const [$birthday, birthdayChanged, $birthdayError, $isBirthdayCorrect] = createEffectorField<Dayjs>({
  defaultValue: date(),
  validator: value => (!value ? "Поле обязательно к заполнению" : null),
})

export const [$sex, sexChanged, $sexError, $isSexCorrect] = createEffectorField<Sex>({
  defaultValue: "M",
  validator: value => (!value ? "Поле обязательно к заполнению" : null),
})

export const $clientProfileForm = combine({
  image: $image,
  name: $name,
  lastName: $lastName,
  birthday: $birthday,
  sex: $sex,
})

export const userProfileGate = createGate()

spread({
  source: sample({
    clock: userProfileGate.open,
    source: $userData,
    fn: data => ({
      firstName: data.client!.firstName,
      lastName: data.client!.lastName,
      birthDate: data.client!.birthDate,
      sex: data.client!.sex,
      avatar: data.client!.avatar,
    }),
  }) as Event<any>,
  targets: {
    firstName: nameChanged,
    lastName: lastNameChanged,
    birthDate: birthdayChanged.prepend((birthDate: string) =>
      date(birthDate, "YYYY-MM-DD").isValid() ? date(birthDate, "YYYY-MM-DD") : date()
    ),
    sex: sexChanged,
    avatar: imageUploaded.prepend((avatar: string) => ({ id: -1, type: "IMAGE", file: avatar })),
  },
})

export const $clientProfileFormErrors = combine({
  name: $nameError,
  lastName: $lastNameError,
  birthday: $birthdayError,
  sex: $sexError,
})

export const $isClientProfileFormValid = every({
  predicate: true,
  stores: [$isNameCorrect, $isLastNameCorrect, $isBirthdayCorrect, $isSexCorrect, $isImageCorrect],
})

export const saveClientUserData = createEvent()
const saveClientUserDataFx = createEffect({
  handler: updateMyClient,
})

forward({
  from: saveClientUserDataFx,
  to: loadUserData,
})

forward({
  from: saveClientUserDataFx.doneData.map((): Toast => ({ text: `Данные успешно обновлены`, type: `info` })),
  to: toasts.add,
})

export const $clientProfileSaving = saveClientUserDataFx.pending

sample({
  // @ts-ignore
  source: combine($userData, $clientProfileForm, $image, (userData, form, lastImage) => ({
    firstName: form.name,
    lastName: form.lastName,
    birthDate: dayjs(form.birthday).format("YYYY-MM-DD"),
    avatar: lastImage.file || form.image,
    categories: (userData.client?.categories || []).map(category => category.id),
    sex: userData.client?.sex || form.sex,
  })),
  clock: saveClientUserData,
  target: saveClientUserDataFx,
})

export const showClientProfileCoachDialog = createEvent()
export const changeClientProfileCoachWarningDilalogVisibility = createEvent<boolean>()
export const $clientProfileCoachWarningDilalogVisibility = restore(
  changeClientProfileCoachWarningDilalogVisibility,
  false
).reset(userProfileGate.close)

forward({
  from: showClientProfileCoachDialog,
  to: changeClientProfileCoachWarningDilalogVisibility.prepend(() => true),
})
