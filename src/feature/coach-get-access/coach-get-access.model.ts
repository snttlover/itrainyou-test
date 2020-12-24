import { uploadMedia } from "@/lib/api/media"
import { createEffectorField } from "@/lib/generators/efffector"
import { phoneValidator, trimString, innValidator } from "@/lib/validators"
import { combine, createEffect, createEvent, createStore, forward, restore } from "effector-root"
import { getSystemInfo } from "@/lib/api/system-info"

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

export const changePrice = createEvent<ChangePriceEvent>()

export const loadSystemInfoFx = createEffect({
  handler: getSystemInfo,
})

export const $feeRatio = createStore(0).on(loadSystemInfoFx.doneData, (_, data) => data.platformSessionFee)
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

export const $pricesWithFee = combine($prices, $feeRatio, (prices, feeRatio) =>
  prices.map(price => ({ ...price, valueWithFee: price ? price.value + price.value * feeRatio : 0 }))
)

const $schedule = $pricesWithFee.map(state => {
  const newState = state.reduce((a, key) => Object.assign(a, { [key.name]: key.valueWithFee }), {})
  const emptyObjectForBackend = {isAvailable: false, weekdaySlots: []}
  Object.assign(newState, emptyObjectForBackend)
  return newState
})

export const [$education, educationChanged, $educationError, $isEducationCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле не должно быть пустым"
    return null
  },
})

type LegalDataType = {
    id: number
    selected: boolean
    name: string
    value: string
}
export const changeLegalDataCheckBox = createEvent<number>()

export const $selectLegalForm = createStore<LegalDataType[]>([
  {id: 1, selected: false, name: "Я — самозанятый", value: "SELF_EMPLOYMENT"},
  {id: 2, selected: false, name: "У меня ИП, уплачивающие налог на профессиональный доход (ИП-самозанятые)", value: "IP_PROFESSIONAL_TAXES"},
  {id: 3, selected: false, name: "ИП с любым другим налоговым режимом, кроме налога на профессиональный доход", value: "IP_OTHER_TAXES"},
]).on(changeLegalDataCheckBox, (state, payload) => {
  const newState = state.map(item => (payload === item.id ? {...item, selected: true } : {...item, selected: false }))
  return newState
})

export const $legalForm = $selectLegalForm.map(state => {
  const selectedItem = state.find(item => item.selected)
  return selectedItem?.value
})

export const [
  $workExperience,
  workExperienceChanged,
  $workExperienceError,
  $isWorkExperienceCorrect,
] = createEffectorField<string>({
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле не должно быть пустым"
    return null
  },
})

export const [$description, descriptionChanged, $descriptionError, $isDescriptionCorrect] = createEffectorField<string>(
  {
    defaultValue: "",
    validator: value => {
      if (!value) return "Поле не должно быть пустым"
      return null
    },
  }
)

export const [$socialNetworks, socialNetworkChanged, $socialNetworkError, $issocialNetworkCorrect] = createEffectorField<string>(
  {
    defaultValue: "",
    validator: value => {
      if (!value) return "Поле не должно быть пустым"
      return null
    },
  }
)

export const [$supervisions, supervisionsChanged, $supervisionsError, $issupervisionsCorrect] = createEffectorField<string>(
  {
    defaultValue: "",
    validator: value => {
      if (!value) return "Поле не должно быть пустым"
      return null
    },
  }
)

export const [$inn, innChanged, $innError, $isInnCorrect] = createEffectorField<string>(
  {
    defaultValue: "",
    validator: innValidator,
    eventMapper: event => event.map(trimString),
  }
)

export const [$phone, phoneChanged, $phoneError, $isPhoneCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: phoneValidator,
  eventMapper: event => event.map(trimString),
})

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

const $videoInterviewError = $videoInterview.map(video => {
  if (!video) return "Необходимо загрузить видео с интервью"

  return null
})

const $isVideoInterviewCorrect = $videoInterviewError.map(value => !value)

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

export const toggleCategory = createEvent<number>()
export const setCategories = createEvent<number[]>()

export const $selectedCategories = restore(setCategories, []).on(toggleCategory, (state, payload) => {
  if (state.includes(payload)) return state.filter(category => category !== payload)
  return [...state, payload]
})

const $categoriesError = $selectedCategories.map(categories => {
  if (categories.length < 1) return "Должна быть выбрана хоть одна категория"
  if (categories.length > 3) return "Вы не можете выбрать более 3 категорий"
  return null
})

const $isCategoriesCorrect = $categoriesError.map(value => !value)

export const $form = combine({
  education: $education,
  workExperience: $workExperience,
  description: $description,
  phone: $phone,
  photos: $photos,
  videoInterview: $videoInterview,
  legalForm: $legalForm,
  socialNetworks: $socialNetworks,
  supervisions: $supervisions,
  inn: $inn,
  schedule: $schedule,
})

export const $formErrors = combine({
  categories: $categoriesError,
  education: $educationError,
  workExperience: $workExperienceError,
  description: $descriptionError,
  phone: $phoneError,
  video: $videoInterviewError,
  socialNetworks: $socialNetworkError,
  supervisions: $supervisionsError,
  inn: $innError,
})

export const $formValid = combine(
  $isEducationCorrect,
  $isWorkExperienceCorrect,
  $isDescriptionCorrect,
  $isPhoneCorrect,
  $isInnCorrect,
  $issupervisionsCorrect,
  $isCategoriesCorrect,
  $isVideoInterviewCorrect,
  (...args) => args.every(val => val)
)

export const videoUploaded = createEvent<File>()

forward({
  from: videoUploaded,
  to: videoUploadFx,
})
