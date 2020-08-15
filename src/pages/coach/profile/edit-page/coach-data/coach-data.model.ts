import { fetchCategoriesList } from "@/feature/categories/categories.store"
import { videoInterviewChanged } from "@/feature/coach-get-access/coach-get-access.model"
import { $userData } from "@/feature/user/user.model"
import { uploadMedia } from "@/lib/api/media"
import { createEffectorField } from "@/lib/generators/efffector"
import { phoneValidator, trimString } from "@/lib/validators"
import { createGate } from "@/scope"
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  createStoreObject,
  forward,
  restore,
  sample,
} from "effector-root"
import { every, spread } from "patronum"

export const CoachDataGate = createGate()

export const [$education, educationChanged, $educationError, $isEducationCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле не должно быть пустым"
    return null
  },
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

export const [$phone, phoneChanged, $phoneError, $isPhoneCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: phoneValidator,
  eventMapper: event => event.map(trimString),
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

export const $photosError = $photos.map(photos => (photos.length === 0 ? "Должна быть хоть одна фотография" : null))
export const $isPhotosCorrect = $photosError.map(error => !error)

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

export const $form = createStoreObject({
  education: $education,
  workExperience: $workExperience,
  description: $description,
  phone: $phone,
  photos: $photos,
})

export const $formErrors = combine({
  categories: $categoriesError,
  education: $educationError,
  workExperience: $workExperienceError,
  description: $descriptionError,
  phone: $phoneError,
  photos: $photosError,
})

export const $formValid = every(true, [
  $isEducationCorrect,
  $isWorkExperienceCorrect,
  $isDescriptionCorrect,
  $isPhoneCorrect,
  $isCategoriesCorrect,
  $isPhotosCorrect,
])

const userDataLoaded = sample({
  source: $userData,
  clock: CoachDataGate.open,
})

spread(
  userDataLoaded.map(data => data.coach),
  {
    description: descriptionChanged,
    education: educationChanged,
    phone: phoneChanged,
    photos: restorePhotos,
    videoInterview: videoInterviewChanged,
    workExperience: workExperienceChanged,
  }
)

forward({
  from: userDataLoaded.map(data => data.coach?.categories.map(cat => cat.id) || []),
  to: setCategories,
})

forward({
  from: CoachDataGate.open,
  to: fetchCategoriesList,
})
