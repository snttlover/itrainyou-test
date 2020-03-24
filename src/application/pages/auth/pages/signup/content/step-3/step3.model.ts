import { UploadMediaResponse } from "@app/lib/api/media"
import { createEffectorField } from "@app/lib/generators/efffector"
import { trimString } from "@app/lib/validators"
import {
  clientDataChanged,
  REGISTER_SAVE_KEY,
  signUpDomain
} from "@app/pages/auth/pages/signup/signup.model"
import { combine, createStoreObject } from "effector"
import * as dayjs from "dayjs"

export const imageUploaded = signUpDomain.createEvent<UploadMediaResponse>()
export const $image = signUpDomain
  .createStore<UploadMediaResponse>({ id: -1, type: "IMAGE", file: "" })
  .on(imageUploaded, (state, payload) => payload)
const $isImageCorrect = $image.map(img => !!img.file)

export const toggleUploadModal = signUpDomain.createEvent()
export const $isUploadModelOpen = signUpDomain
  .createStore(false)
  .on(toggleUploadModal, store => !store)
  .on(imageUploaded, () => false)

export const [$name, nameChanged, $nameError, $isNameCorrect] = createEffectorField({
  domain: signUpDomain,
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле обязательно к заполению"
    return null
  },
  eventMapper: event => event.map(trimString)
})

export const [$lastName, lastNameChanged, $lastNameError, $isLastNameCorrect] = createEffectorField({
  domain: signUpDomain,
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле обязательно к заполению"
    return null
  },
  eventMapper: event => event.map(trimString)
})

export const [$birthday, birthdayChanged, $birthdayError, $isBirthdayCorrect] = createEffectorField({
  domain: signUpDomain,
  defaultValue: dayjs(),
  validator: value => null
})

export const [$sex, sexChanged, $sexError, $isSexCorrect] = createEffectorField<"M" | "F">({
  domain: signUpDomain,
  defaultValue: "M",
  validator: value => {
    if (!value) return "Поле обязательно к заполению"
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
    avatar: data.image.file,
    birthDate: data.birthday.toISOString(),
    firstName: data.name,
    lastName: data.lastName,
    sex: data.sex
  })
})

export const step3Mounted = signUpDomain.createEvent()

step3Mounted.watch(() => {
  try {
    const stringData = localStorage.getItem(REGISTER_SAVE_KEY)
    if (!stringData) return
    const data = JSON.parse(stringData).clientData
    data?.firstName && nameChanged(data.firstName)
    data?.lastName && lastNameChanged(data.lastName)
    data?.birthDate && birthdayChanged(dayjs(data.birthDate))
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
