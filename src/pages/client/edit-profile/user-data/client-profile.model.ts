import { $userData, loadUserData } from "@/feature/user/user.model"
import { UploadMediaResponse } from "@/lib/api/media"
import { date } from "@/lib/formatting/date"
import { createEffectorField, UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { trimString } from "@/lib/validators"
import { createGate } from "@/scope"
import dayjs, { Dayjs } from "dayjs"
import { combine, createEffect, createEvent, createStore, Event, forward, restore, sample } from "effector-root"
import { every, spread } from "patronum"
import { updateMyClient } from "@/lib/api/client/update"
import { Toast, toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"
import { $isClientBecomingCoach } from "@/pages/client/profile/content/become-coach-dialog/models/units"

export const imageUploaded = createEvent<UploadMediaResponse>()
export const originalAvatarUploaded = createEvent<UploadMediaResponse>()
export const $image = createStore<UploadMediaResponse>({ id: -1, type: "IMAGE", file: "" }).on(
  imageUploaded,
  (state, payload) => payload
)
export const $originalAvatar = createStore<UploadMediaResponse>({ id: -1, type: "IMAGE", file: "" }).on(
  originalAvatarUploaded,
  (state, payload) => payload
)

const $isImageError = combine(
  $image,
  $userData.map(userData => userData.coach),
  (img, coach) => {
    if (coach !== null && !img.file) return "Изображение обязательно к загрузке"

    return null
  }
)
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

export const [$middleName, middleNameChanged, $middleNameError, $isMiddleNameCorrect] = createEffectorField<
  string,
  {
    userData: UnpackedStoreObjectType<typeof $userData>,
    isClientBecomingCoach: boolean,
    value: string
  }
  >({
    defaultValue: "",
    validatorEnhancer: $store => combine(
      $userData,
      $isClientBecomingCoach,
      $store,
      (userData, isClientBecomingCoach, value) => ({
        userData, isClientBecomingCoach, value
      })),
    validator: obj => {
      const coach = obj.userData.coach
      const isFieldRequired = coach !== null || obj.isClientBecomingCoach
      const value = obj.value

      if (isFieldRequired && !value) return "Поле обязательно к заполнению"
      return null
    },
    eventMapper: event => event.map(trimString),
  })

export const [$birthday, birthdayChanged, $birthdayError, $isBirthdayCorrect] = createEffectorField<
  Dayjs | "",
  {
    userData: UnpackedStoreObjectType<typeof $userData>,
    isClientBecomingCoach: boolean,
    value: Dayjs | ""
  }
  >({
    defaultValue: "",
    validatorEnhancer: $store => combine(
      $userData,
      $isClientBecomingCoach,
      $store,
      (userData, isClientBecomingCoach, value) => ({
        userData, isClientBecomingCoach, value
      })),
    validator: obj => {
      const coach = obj.userData.coach
      const isFieldRequired = coach !== null || obj.isClientBecomingCoach
      const value = obj.value

      if (isFieldRequired && !value) return "Поле обязательно к заполнению"
      return null
    },
  })

export const [$sex, sexChanged, $sexError, $isSexCorrect] = createEffectorField<
  "M" | "F" | "",
  {
    userData: UnpackedStoreObjectType<typeof $userData>,
    isClientBecomingCoach: boolean,
    value: "M" | "F" | "",
  }
  >({
    defaultValue: "",
    validatorEnhancer: $store => combine(
      $userData,
      $isClientBecomingCoach,
      $store,
      (userData, isClientBecomingCoach, value) => ({
        userData, isClientBecomingCoach, value
      })),
    validator: obj => {
      const coach = obj.userData.coach
      const isFieldRequired = coach !== null || obj.isClientBecomingCoach
      const value = obj.value

      if (isFieldRequired && !value) return "Поле обязательно к заполнению"
      return null
    },
  })

export const $clientProfileForm = combine({
  image: $image,
  name: $name,
  lastName: $lastName,
  middleName: $middleName,
  birthday: $birthday,
  sex: $sex,
  originalAvatar: $originalAvatar,
})

export const userProfileGate = createGate()

spread({
  source: (sample({
    clock: userProfileGate.open,
    source: $userData,
    fn: data => ({
      firstName: data.client!.firstName,
      lastName: data.client!.lastName,
      middleName: data.client!.middleName,
      birthDate: data.client!.birthDate,
      sex: data.client!.sex,
      avatar: data.client!.avatar,
      originalAvatar: data.client!.originalAvatar,
    }),
  }) as unknown) as Event<any>,
  targets: {
    firstName: nameChanged,
    lastName: lastNameChanged,
    middleName: middleNameChanged,
    birthDate: birthdayChanged.prepend((birthDate: string) =>
      date(birthDate, "YYYY-MM-DD").isValid() ? date(birthDate, "YYYY-MM-DD") : ""
    ),
    sex: sexChanged,
    avatar: imageUploaded.prepend((avatar: string) => ({ id: -1, type: "IMAGE", file: avatar })),
    originalAvatar: originalAvatarUploaded.prepend((originalAvatar: string) => ({ id: -1, type: "IMAGE", file: originalAvatar })),
  },
})

export const $clientProfileFormErrors = combine({
  name: $nameError,
  lastName: $lastNameError,
  birthday: $birthdayError,
  middleName: $middleNameError,
  sex: $sexError,
})

export const $isClientProfileFormValid = every({
  predicate: true,
  stores: [
    $originalAvatar.map(({file}) => !!file),
    $isNameCorrect,
    $isLastNameCorrect,
    $isBirthdayCorrect,
    $isSexCorrect,
    $isImageCorrect,
    $isMiddleNameCorrect
  ],
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
  from: saveClientUserDataFx.doneData.map((): Toast => ({ text: "Данные успешно обновлены", type: "info" })),
  to: toasts.add,
})

export const $clientProfileSaving = saveClientUserDataFx.pending


sample({
  // @ts-ignore
  source: combine($userData, $clientProfileForm, $image, $originalAvatar, (userData, form, lastImage, originalAvatar) => ({
    firstName: form.name,
    lastName: form.lastName,
    middleName: form.middleName,
    birthDate: form.birthday ? dayjs(form.birthday).format("YYYY-MM-DD") : undefined,
    avatar: lastImage.file === null ? null : lastImage.file || form.image,
    originalAvatar: originalAvatar.file === null ? null : originalAvatar.file || form.originalAvatar,
    categories: (userData.client?.categories || []).map(category => category.id),
    sex: form.sex || userData.client?.sex,
  })),
  clock: saveClientUserData,
  target: saveClientUserDataFx,
})

export const showFillFieldsToBecomeCoachWarningDialog = createEvent()
export const changeFillFieldsToBecomeCoachWarningDialogVisibility = createEvent<boolean>()

export const $fillFieldsToBecomeCoachWarningDialogVisibility = restore(
  changeFillFieldsToBecomeCoachWarningDialogVisibility,
  false
).reset(userProfileGate.close)

forward({
  from: showFillFieldsToBecomeCoachWarningDialog,
  to: changeFillFieldsToBecomeCoachWarningDialogVisibility.prepend(() => true),
})
