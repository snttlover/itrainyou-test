import { uploadMedia } from "@/lib/api/media"
import { createEffectorField } from "@/lib/generators/efffector"
import { innValidator, phoneValidator, trimString } from "@/lib/validators"
import { combine, createEffect, createEvent, createStore, forward, restore } from "effector-root"
import { isArray } from "@/lib/network/casing"
import { config } from "@/config"
import { loadSystemInfoFx } from "@/models/units"
import { createGate } from "@/scope"
import { persist } from "effector-storage/local"
import { logout } from "@/lib/network/token"

export type Prices = {
    d30Price?: number
    d45Price?: number
    d60Price?: number
    d90Price?: number
}

type Price = {
    name: keyof Prices
    key: string
    isLoading: boolean
    value: number
}

type ChangePriceEvent = { name: keyof Prices; value: number }

type LegalDataType = {
  id: number
  selected: boolean
  name: string
  value: "SELF_EMPLOYMENT" | "IP_PROFESSIONAL_TAXES" | "IP_OTHER_TAXES"
}

const COACH_PRICES_SAVE_KEY = "__coach-prices-save-key__"
const COACH_CATEGORIES_SAVE_KEY = "__coach-categories-save-key__"
const COACH_EDUCATION_SAVE_KEY = "__coach_education-save-key__"
const COACH_WORK_EXPERIENCE_SAVE_KEY = "__coach-work-experience-save-key__"
const COACH_DESCRIPTION_SAVE_KEY = "__coach-description-save-key__"
const COACH_PHONE_SAVE_KEY = "__coach-phone-save-key__"
const COACH_PHOTOS_INTERVIEW_SAVE_KEY = "__coach-photos-interview-save-key__"
const COACH_VIDEO_INTERVIEW_SAVE_KEY = "__coach-video-interview-save-key__"
const COACH_SOCIAL_NETWORKS_SAVE_KEY = "__coach-social-networks-save-key__"
const COACH_SUPERVISIONS_NETWORKS_SAVE_KEY = "__coach-supervisions-networks-save-key__"
const COACH_INN_NETWORKS_SAVE_KEY = "__coach-inn-networks-save-key__"
const COACH_LEGAL_FORM_NETWORKS_SAVE_KEY = "__coach-legal-form-networks-save-key__"

export const coachInformationGate = createGate()

export const changePrice = createEvent<ChangePriceEvent>()

export const $feeRatio = createStore(0).on(
  loadSystemInfoFx.doneData,
  (_, data) => data.platformSessionFee
)

export const $prices = createStore<Price[]>([
  {
    name: "d30Price",
    key: "D30",
    isLoading: false,
    value: 0,
  },
  {
    name: "d45Price",
    key: "D45",
    isLoading: false,
    value: 0,
  },
  {
    name: "d60Price",
    key: "D60",
    isLoading: false,
    value: 0,
  },
  {
    name: "d90Price",
    key: "D90",
    isLoading: false,
    value: 0,
  },
])
  .on(changePrice, (state, { name, value }) =>
    state.map(price => ({ ...price, value: price.name === name ? value : price.value }))
  )
persist({
  store: $prices,
  key: COACH_PRICES_SAVE_KEY
})

export const $pricesWithoutFee = combine($prices, $feeRatio, (prices, feeRatio) =>
  prices.map(price => ({ ...price, valueWithoutFee: price ? price.value - price.value * feeRatio : 0 }))
)

const $schedule = $pricesWithoutFee.map(state => {
  const newState = state.reduce((a, key) => Object.assign(a, { [key.name]: key.value }), {})
  const emptyObjectForBackend = { isAvailable: false, weekdaySlots: [] }
  Object.assign(newState, emptyObjectForBackend)
  return newState
})

const $isScheduleFilled = $schedule.map(
  schedule => Object.values(schedule).some((value) => !isArray(value) && Boolean(value))
)

export const [$education, educationChanged, $educationError, $isEducationCorrect] = createEffectorField<string>({
  defaultValue: "",
  reset: logout,
  storageSaveKey: COACH_EDUCATION_SAVE_KEY,
  validator: value => {
    if (!value) return "Поле не должно быть пустым"
    return null
  },
})

export const changeLegalDataCheckBox = createEvent<number>()

export const $selectLegalForm = createStore<LegalDataType[]>([
  {id: 1, selected: false, name: "Я — самозанятый", value: "SELF_EMPLOYMENT"},
  {id: 2, selected: false, name: "Я ИП и уплачиваю налог на профессиональный доход (ИП-самозанятый)", value: "IP_PROFESSIONAL_TAXES"},
  {id: 3, selected: false, name: "ИП с любым другим налоговым режимом, кроме налога на профессиональный доход", value: "IP_OTHER_TAXES"},
]).on(changeLegalDataCheckBox, (state, payload) => {
  const newState = state.map(item => (payload === item.id ? {...item, selected: true } : {...item, selected: false }))
  return newState
})
persist({
  store: $selectLegalForm,
  key: COACH_LEGAL_FORM_NETWORKS_SAVE_KEY
})

export const $legalForm = $selectLegalForm.map(state => {
  const selectedItem = state.find(item => item.selected) || { id: null, name: null, selected: false, value: "" }
  return selectedItem?.value
})

export const [
  $workExperience,
  workExperienceChanged,
  $workExperienceError,
  $isWorkExperienceCorrect,
] = createEffectorField<string>({
  defaultValue: "",
  reset: logout,
  storageSaveKey: COACH_WORK_EXPERIENCE_SAVE_KEY,
  validator: value => {
    if (!value) return "Поле не должно быть пустым"
    return null
  },
})

export const [$description, descriptionChanged, $descriptionError, $isDescriptionCorrect] = createEffectorField<string>(
  {
    defaultValue: "",
    reset: logout,
    storageSaveKey: COACH_DESCRIPTION_SAVE_KEY,
    validator: value => {
      if (!value) return "Поле не должно быть пустым"
      return null
    },
  }
)

export const [$socialNetworks, socialNetworkChanged, $socialNetworkError, $isSocialNetworkCorrect] = createEffectorField<string>(
  {
    defaultValue: "",
    reset: logout,
    storageSaveKey: COACH_SOCIAL_NETWORKS_SAVE_KEY,
    validator: value => {
      if (!value) return "Поле не должно быть пустым"
      return null
    },
  }
)

export const [$supervisions, supervisionsChanged, $supervisionsError, $isSupervisionsCorrect] = createEffectorField<string>(
  {
    defaultValue: "",
    reset: logout,
    storageSaveKey: COACH_SUPERVISIONS_NETWORKS_SAVE_KEY,
    validator: value => {
      if (!value) return "Поле не должно быть пустым"
      return null
    },
  }
)

export const [$inn, innChanged, $innError, $isInnCorrect] = createEffectorField<string>(
  {
    defaultValue: "",
    reset: logout,
    storageSaveKey: COACH_INN_NETWORKS_SAVE_KEY,
    validator: innValidator,
    eventMapper: event => event.map(trimString),
  }
)

<<<<<<< HEAD
=======
export const [$phone, phoneChanged, $phoneError, $isPhoneCorrect] = createEffectorField<string>({
  defaultValue: "",
  reset: logout,
  storageSaveKey: COACH_PHONE_SAVE_KEY,
  validator: phoneValidator,
  eventMapper: event => event.map(trimString),
})

>>>>>>> development
export const videoUploadProgressChanged = createEvent<number>()

export const videoUploadFx = createEffect({
  handler(file: File) {
    return uploadMedia({ file, type: "OTHER" }, (pe: ProgressEvent) => {
      videoUploadProgressChanged(Math.round((pe.loaded * 100) / pe.total))
    })
  },
})

export const $videoUploadProgress = createStore(0)
  .on(videoUploadProgressChanged, (state, payload) => payload)
  .reset(videoUploadFx.finally)

export const videoInterviewChanged = createEvent<string>()
export const $videoInterview = createStore("")
  .on(videoInterviewChanged, (state, payload) => payload)
  .on(videoUploadFx.doneData, (state, payload) => payload.file)
  .reset(videoUploadFx)
persist({
  store: $videoInterview,
  key: COACH_VIDEO_INTERVIEW_SAVE_KEY
})

export const photoUploadFx = createEffect({
  handler: (file: File) => {
    return uploadMedia({ file, type: "IMAGE" })
  },
})

export const photoRemoved = createEvent<number>()
export const restorePhotos = createEvent<string[]>()

export const $photos = createStore<string[]>([])
  .on(photoUploadFx.doneData, (state, payload) => [...state, payload.file])
  .on(restorePhotos, (_, payload) => payload)
  .on(photoRemoved, (state, index) => [...state.slice(0, index), ...state.slice(index + 1)])
persist({
  store: $photos,
  key: COACH_PHOTOS_INTERVIEW_SAVE_KEY
})

export const toggleCategory = createEvent<number>()
export const setCategories = createEvent<number[]>()

export const $selectedCategories = restore(setCategories, []).on(toggleCategory, (state, payload) => {
  if (state.includes(payload)) return state.filter(category => category !== payload)
  return [...state, payload]
})
persist({
  store: $selectedCategories,
  key: COACH_CATEGORIES_SAVE_KEY
})


const $categoriesError = $selectedCategories.map(categories => {
  if (categories.length < 1) return "Должна быть выбрана хоть одна категория"
  if (categories.length > 3) return "Вы не можете выбрать более 3 категорий"
  return null
})

const $isCategoriesCorrect = $categoriesError.map(value => !value)

let formFields = {
  education: $education,
  workExperience: $workExperience,
  description: $description,
  photos: $photos,
  videoInterview: $videoInterview,
  socialNetworks: $socialNetworks,
  supervisions: $supervisions,
  schedule: $schedule,
}
if (config.SERVER_DEFAULT_PAYMENT_SYSTEM !== "TINKOFF") {
  formFields = {...{legalForm: $legalForm, inn: $inn}, ...formFields}
}
export const $form = combine(formFields)

let formErrors = {
  categories: $categoriesError,
  education: $educationError,
  workExperience: $workExperienceError,
  description: $descriptionError,
  socialNetworks: $socialNetworkError,
  supervisions: $supervisionsError,
  inn: $innError,
}
if (config.SERVER_DEFAULT_PAYMENT_SYSTEM !== "TINKOFF") {
  formErrors = {...{inn: $innError,}, ...formErrors}
}
export const $formErrors = combine(formErrors)

let formValidFields = {
  $isEducationCorrect,
  $isWorkExperienceCorrect,
  $isDescriptionCorrect,
  $isInnCorrect,
  $isSupervisionsCorrect,
  $isScheduleFilled,
  $isCategoriesCorrect,
}
if (config.SERVER_DEFAULT_PAYMENT_SYSTEM !== "TINKOFF") {
  formValidFields = {...{$isInnCorrect,}, ...formValidFields}
}

export const $formValid = combine(
  formValidFields,
  (...args) => args.every(val => val)
)

export const videoUploaded = createEvent<File>()

forward({
  from: videoUploaded,
  to: videoUploadFx,
})
