import { UploadMediaResponse } from "@/lib/api/media"
import { date } from "@/lib/formatting/date"
import { createEffectorField, UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { trimString } from "@/lib/validators"
import {
  $userData,
  clientDataChanged,
  REGISTER_SAVE_KEY,
  signUpPageMounted,
} from "@/pages/auth/pages/signup/signup.model"
import { Dayjs } from "dayjs"
import { combine, createEffect, createEvent, createStore, forward, sample } from "effector-root"
import { combineEvents, spread } from "patronum"
import { createGate } from "@/scope"

export const step3Gate = createGate()

export const imageUploaded = createEvent<UploadMediaResponse>()
export const $image = createStore<UploadMediaResponse>({ id: -1, type: "IMAGE", file: "" }).on(
  imageUploaded,
  (state, payload) => payload
)

const $isImageError = combine(
  $image,
  $userData.map(userData => userData.type),
  (img, type) => {
    if (type === "coach" && !img.file) return "Изображение обязательно к загрузке"

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
    return null
  },
  eventMapper: event => event.map(trimString),
})

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField({
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле обязательно к заполнению"
    return null
  },
  eventMapper: event => event.map(trimString),
})

export const [$lastName, lastNameChanged, $lastNameError, $isLastNameCorrect] = createEffectorField({
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле обязательно к заполнению"
    return null
  },
  eventMapper: event => event.map(trimString),
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

    if (type === "coach" && !value) return "Поле обязательно к заполнению"
    return null
  },
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

    if (type === "coach" && !value) return "Поле обязательно к заполнению"
    return null
  },
})

export const $step3Form = combine({
  image: $image,
  name: $name,
  lastName: $lastName,
  birthday: $birthday,
  sex: $sex,
  email: $email,
})

sample({
  source: $step3Form,
  clock: $step3Form.updates,
  fn: data => ({
    avatar: data.image.file || null,
    birthDate: data.birthday ? data.birthday.format("YYYY-MM-DD") : null,
    firstName: data.name,
    lastName: data.lastName,
    sex: data.sex,
    email: data.email,
  }),
  target: clientDataChanged,
})

const loadDataFx = createEffect({
  handler() {
    const stringData = localStorage.getItem(REGISTER_SAVE_KEY)
    return JSON.parse(stringData!).clientData
  },
})

export const step3Mounted = createEvent()
const waitAllEvents = combineEvents({ events: [step3Mounted, signUpPageMounted] })

forward({
  from: waitAllEvents,
  to: loadDataFx,
})

spread({
  source: loadDataFx.doneData,
  targets: {
    firstName: nameChanged,
    lastName: lastNameChanged,
    email: emailChanged,
    birthDate: birthdayChanged.prepend((birthDate: string) =>
      date(birthDate, "YYYY-MM-DD").isValid() ? date(birthDate, "YYYY-MM-DD") : null
    ),
    sex: sexChanged,
    avatar: imageUploaded.prepend((avatar: string) => ({ id: -1, type: "IMAGE", file: avatar })),
  },
})

export const $step3FormErrors = combine({
  name: $nameError,
  lastName: $lastNameError,
  birthday: $birthdayError,
  sex: $sexError,
  email: $emailError,
})

export const $isStep3FormValid = combine(
  $isNameCorrect,
  $isLastNameCorrect,
  $isBirthdayCorrect,
  $isSexCorrect,
  $isImageCorrect,
  $isEmailCorrect,
  (...args) => args.every(val => val)
)
