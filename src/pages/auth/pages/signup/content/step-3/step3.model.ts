import { UploadMediaResponse } from "@/lib/api/media"
import { date } from "@/lib/formatting/date"
import { createEffectorField, UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { phoneValidator, emailValidator, trimString } from "@/lib/validators"
import { Dayjs } from "dayjs"
import { combine, createEffect, createEvent, createStore, forward, sample } from "effector-root"
import { combineEvents, spread } from "patronum"
import { $isSocialSignupInProgress } from "@/feature/user/user.model"
import { REGISTER_SAVE_KEY } from "@/pages/auth/pages/signup/models/types"
import { $registerUserData, clientDataChanged, signUpPageMounted, $priceRanges } from "@/pages/auth/pages/signup/models/units"


export const step3FormSubmitted = createEvent()
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
  $registerUserData.map(userData => userData.type),
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

export const [$email, emailChanged, $emailError, $isEmailCorrect] = createEffectorField<
  string,
  { isSocialSignupInProgress: UnpackedStoreObjectType<typeof $isSocialSignupInProgress>; value: string }
  >({
    defaultValue: "",
    validatorEnhancer: $store => combine($isSocialSignupInProgress, $store, (isSocialSignupInProgress, value) => ({ isSocialSignupInProgress, value })),
    validator: obj => obj.isSocialSignupInProgress ? emailValidator(obj.value) : null,
    eventMapper: event => event.map(trimString),
  })

export const [$phone, phoneChanged, $phoneError, $isPhoneCorrect] = createEffectorField<
  string,
  { userData: UnpackedStoreObjectType<typeof $userData>; value: string }
  >({
    defaultValue: "",
    validatorEnhancer: $store => combine($userData, $store, (userData, value) => ({ userData, value })),
    validator: obj => {
      const type = obj.userData.type
      const value = obj.value
      if (type === "coach" && !value) return "Поле обязательно к заполнению"
      return phoneValidator(obj.value)
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

export const [$middleName, middleNameChanged, $middleNameError, $isMiddleNameCorrect] = createEffectorField<
  string,
  { userData: UnpackedStoreObjectType<typeof $registerUserData>; value: string }
  >({
    defaultValue: "",
    validatorEnhancer: $store => combine($registerUserData, $store, (userData, value) => ({ userData, value })),
    validator: obj => {
      const type = obj.userData.type
      const value = obj.value

      if (type === "coach" && !value) return "Поле обязательно к заполнению"
      return null
    },
    eventMapper: event => event.map(trimString),
  })

export const [$birthday, birthdayChanged, $birthdayError, $isBirthdayCorrect] = createEffectorField<
  Dayjs | null,
  { userData: UnpackedStoreObjectType<typeof $registerUserData>; value: Dayjs | null }
>({
  defaultValue: null,
  validatorEnhancer: $store => combine($registerUserData, $store, (userData, value) => ({ userData, value })),
  validator: obj => {
    const type = obj.userData.type
    const value = obj.value

    if (type === "coach" && !value) return "Поле обязательно к заполнению"
    return null
  },
})

export const [$sex, sexChanged, $sexError, $isSexCorrect] = createEffectorField<
  "M" | "F" | "",
  { userData: UnpackedStoreObjectType<typeof $registerUserData>; value: "M" | "F" | "" }
>({
  defaultValue: "",
  validatorEnhancer: $store => combine($registerUserData, $store, (userData, value) => ({ userData, value })),
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
  middleName: $middleName,
  sex: $sex,
  email: $email,
  phone: $phone,
  originalAvatar: $originalAvatar,
  priceRanges: [],
})

sample({
  source: $step3Form,
  clock: $step3Form.updates,
  fn: data => ({
    avatar: data.image.file || null,
    birthDate: data.birthday ? data.birthday.format("YYYY-MM-DD") : null,
    firstName: data.name,
    lastName: data.lastName,
    middleName: data.middleName,
    sex: data.sex,
    email: data.email,
    phone: data.phone,
    originalAvatar: data.originalAvatar.file || null,
    priceRanges: data.priceRanges
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
    middleName: middleNameChanged,
    email: emailChanged,
    phone: phoneChanged,
    birthDate: birthdayChanged.prepend((birthDate: string) =>
      date(birthDate, "YYYY-MM-DD").isValid() ? date(birthDate, "YYYY-MM-DD") : null
    ),
    sex: sexChanged,
    avatar: imageUploaded.prepend((avatar: string) => ({ id: -1, type: "IMAGE", file: avatar })),
    originalAvatar: originalAvatarUploaded.prepend((avatar: string) => ({ id: -1, type: "IMAGE", file: avatar })),
  },
})

export const $step3FormErrors = combine({
  name: $nameError,
  lastName: $lastNameError,
  birthday: $birthdayError,
  sex: $sexError,
  email: $emailError,
  phone: $phoneError,
  middleName: $middleNameError,
})

export const $isStep3FormValid = combine(
  $isNameCorrect,
  $isLastNameCorrect,
  $isBirthdayCorrect,
  $isSexCorrect,
  $isImageCorrect,
  $isEmailCorrect,
  $isPhoneCorrect,
  $isMiddleNameCorrect,
  (...args) => args.every(val => val)
)