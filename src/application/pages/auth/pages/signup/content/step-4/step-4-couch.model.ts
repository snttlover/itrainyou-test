import { uploadMedia } from "@/application/lib/api/media"
import { createEffectorField } from "@/application/lib/generators/efffector"
import { trimString } from "@/application/lib/validators"
import { $userData, couchDataChanged, REGISTER_SAVE_KEY } from "@/application/pages/auth/pages/signup/signup.model"
import { combine, createEffect, createEvent, createStore, createStoreObject, forward } from "effector-next"

export const [$education, educationChanged, $educationError, $isEducationCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле не должно быть пустым"
    return null
  },
  eventMapper: event => event.map(trimString)
})

export const [
  $workExperience,
  workExperienceChanged,
  $workExperienceError,
  $isWorkExperienceCorrect
] = createEffectorField<string>({
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле не должно быть пустым"
    return null
  }
})

export const [$description, descriptionChanged, $descriptionError, $isDescriptionCorrect] = createEffectorField<string>(
  {
    defaultValue: "",
    validator: value => {
      if (!value) return "Поле не должно быть пустым"
      return null
    }
  }
)

export const [$phone, phoneChanged, $phoneError, $isPhoneCorrect] = createEffectorField<string>({
  defaultValue: "",
  validator: value => {
    if (!value) return "Поле не должно быть пустым"
    return null
  },
  eventMapper: event => event.map(trimString)
})

export const videoUploadProgressChanged = createEvent<number>()

export const videoUploadFx = createEffect({
  handler(file: File) {
    return uploadMedia({ file, type: "OTHER" }, (pe: ProgressEvent) => {
      videoUploadProgressChanged(Math.round((pe.loaded * 100) / pe.total))
    })
  }
})

export const $videoUploadProgress = createStore(0)
  .on(videoUploadProgressChanged, (state, payload) => payload)
  .reset(videoUploadFx.finally)

export const videoInterviewChanged = createEvent<string>()
export const $videoInterview = createStore("")
  .on(videoInterviewChanged, (state, payload) => payload)
  .on(videoUploadFx.doneData, (state, payload) => payload.file)
  .reset(videoUploadFx)

export const $step4Form = createStoreObject({
  education: $education,
  workExperience: $workExperience,
  description: $description,
  phone: $phone,
  videoInterview: $videoInterview
})

$step4Form.updates.watch(data => {
  couchDataChanged({
    ...data
  })
})

export const step4CouchMounted = createEvent()

step4CouchMounted.watch(() => {
  try {
    const stringData = localStorage.getItem(REGISTER_SAVE_KEY)
    if (!stringData) return
    const data = JSON.parse(stringData).couchData
    data.description && descriptionChanged(data.description)
    data.education && educationChanged(data.education)
    data.phone && phoneChanged(data.phone)
    data.videoInterview && videoInterviewChanged(data.videoInterview)
    data.workExperience && workExperienceChanged(data.workExperience)
  } catch (e) {}
})

const $categoriesError = $userData.map(userData => {
  if (userData.categories.length < 1) return 'Должна быть выбрана хоть одна категория'
  if (userData.categories.length > 3) return 'Вы не можете выбрать более 3 категорий'
  return null
})

const $isCategoriesCorrect = $categoriesError.map(value => !value)

const $videoInterviewError = $videoInterview.map(video => {
  if (!video) return 'Необходимо загрузить видео с интервью'

  return null
})

const $isVideoInterviewCorrect = $videoInterviewError.map(value => !value)

export const $step4FormErrors = createStoreObject({
  categories: $categoriesError,
  education: $educationError,
  workExperience: $workExperienceError,
  description: $descriptionError,
  phone: $phoneError,
  video: $videoInterviewError
})

export const $step4FormValid = combine(
  $isEducationCorrect,
  $isWorkExperienceCorrect,
  $isDescriptionCorrect,
  $isPhoneCorrect,
  $isCategoriesCorrect,
  $isVideoInterviewCorrect,
  (...args) => args.every(val => val)
)

export const videoUploaded = createEvent<File>()

forward({
  from: videoUploaded,
  to: videoUploadFx
})
