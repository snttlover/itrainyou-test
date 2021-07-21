import { fetchCategoriesList } from "@/feature/categories/categories.store"
import { videoInterviewChanged } from "@/feature/coach-get-access/coach-get-access.model"
import { $userData } from "@/feature/user/user.model"
import { uploadMedia } from "@/lib/api/media"
import { createEffectorField } from "@/lib/generators/efffector"
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
  Event,
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

export const $form = createStoreObject({
  education: $education,
  workExperience: $workExperience,
  description: $description,
  photos: $photos,
})

export const $formErrors = combine({
  categories: $categoriesError,
  education: $educationError,
  workExperience: $workExperienceError,
  description: $descriptionError,
})

export const $formValid = every({
  predicate: true,
  stores: [
    $isEducationCorrect,
    $isWorkExperienceCorrect,
    $isDescriptionCorrect,
    $isCategoriesCorrect,
  ],
})

const userDataLoaded = sample({
  source: $userData,
  clock: CoachDataGate.open,
})

spread({
  source: (userDataLoaded.map(data => data.coach) as unknown) as Event<any>,
  targets: {
    description: descriptionChanged,
    education: educationChanged,
    photos: restorePhotos,
    videoInterview: videoInterviewChanged,
    workExperience: workExperienceChanged,
  },
})

forward({
  from: userDataLoaded.map(data => data.coach?.categories.map(cat => cat.id) || []),
  to: setCategories,
})

forward({
  from: CoachDataGate.open,
  to: fetchCategoriesList,
})
