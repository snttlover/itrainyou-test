import { UploadMediaResponse } from "@/application/lib/api/media"
import { createEffectorField, UnpackedStoreObjectType } from "@/application/lib/generators/efffector"
import { trimString } from "@/application/lib/validators"
import { $userData, clientDataChanged, REGISTER_SAVE_KEY } from "@/application/pages/auth/pages/signup/signup.model"
import dayjs, { Dayjs } from "dayjs"
import { combine, createEvent, createStore, createStoreObject } from "effector-next"

export const imageUploaded = createEvent<UploadMediaResponse>()
export const $image = createStore<UploadMediaResponse>({ id: -1, type: "IMAGE", file: "" }).on(
  imageUploaded,
  (state, payload) => payload
)

const $isImageError = combine(
  $image,
  $userData.map(userData => userData.type),
  (img, type) => {
    if (type === "couch" && !img.file) return "Изображение обязательно к загрузке"

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
    if (!value) return "Поле обязательно к заполению"
    return null
  },
  eventMapper: event => event.map(trimString)
})

export const [$lastName, lastNameChanged, $lastNameError, $isLastNameCorrect] = createEffectorField({
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле обязательно к заполению"
    return null
  },
  eventMapper: event => event.map(trimString)
})

export const [$birthday, birthdayChanged, $birthdayError, $isBirthdayCorrect] = createEffectorField<
  Dayjs | null,
  { userData: UnpackedStoreObjectType<typeof $userData>; value: Dayjs | null }
>({
  defaultValue: null,
  validatorEnhancer: $store => combine($userData, $store, (userData, value) => ({ userData, value })),
  validator: obj => {
    const type = obj.userData.type
    const value = obj.value

    if (type === "couch" && !value) return "Поле обязательно к заполению"
    return null
  }
})

export const [$sex, sexChanged, $sexError, $isSexCorrect] = createEffectorField<
  "M" | "F" | "",
  { userData: UnpackedStoreObjectType<typeof $userData>; value: "M" | "F" | "" }
>({
  defaultValue: "",
  validatorEnhancer: $store => combine($userData, $store, (userData, value) => ({ userData, value })),
  validator: obj => {
    const type = obj.userData.type
    const value = obj.value

    if (type === "couch" && !value) return "Поле обязательно к заполению"
    return null
  }
})

export const $step3Form = createStoreObject({
  image: $image,
  name: $name,
  lastName: $lastName,
  birthday: $birthday,
  sex: $sex
})

$step3Form.updates.watch(data => {
  clientDataChanged({
    avatar: data.image.file || null,
    birthDate: data.birthday ? data.birthday.format("YYYY-MM-DD") : null,
    firstName: data.name,
    lastName: data.lastName,
    sex: data.sex
  })
})

export const step3Mounted = createEvent()

step3Mounted.watch(() => {
  try {
    const stringData = localStorage.getItem(REGISTER_SAVE_KEY)
    if (!stringData) return
    const data = JSON.parse(stringData).clientData
    data?.firstName && nameChanged(data.firstName)
    data?.lastName && lastNameChanged(data.lastName)
    data?.birthDate && birthdayChanged(dayjs(data.birthDate, "YYYY-MM-DD"))
    data?.sex && sexChanged(data.sex)
    data?.avatar && imageUploaded({ id: -1, type: "IMAGE", file: data.avatar })
  } catch (e) {}
})

export const $step3FormErrors = createStoreObject({
  name: $nameError,
  lastName: $lastNameError,
  birthday: $birthdayError,
  sex: $sexError
})

export const $isStep3FormValid = combine(
  $isNameCorrect,
  $isLastNameCorrect,
  $isBirthdayCorrect,
  $isSexCorrect,
  $isImageCorrect,
  (...args) => args.every(val => val)
)
