import { uploadMedia } from "@/application/lib/api/media"
import { createEffectorField } from "@/application/lib/generators/efffector"
import { trimString } from "@/application/lib/validators"
import { couchDataChanged, REGISTER_SAVE_KEY } from "@/application/pages/auth/pages/signup/signup.model"
import { combine, createEffect, createEvent, createStore, createStoreObject, forward } from "effector-next"

export const [$education, educationChanged, $educationError, $isEducationCorrect] = createEffectorField<string>({
  defaultValue: "",
  eventMapper: event => event.map(trimString)
})

export const [
  $workExperience,
  workExperienceChanged,
  $workExperienceError,
  $isWorkExperienceCorrect
] = createEffectorField<string>({
  defaultValue: ""
})

export const [$description, descriptionChanged, $descriptionError, $isDescriptionCorrect] = createEffectorField<string>(
  {
    defaultValue: ""
  }
)

export const [$phone, phoneChanged, $phoneError, $isPhoneCorrect] = createEffectorField<string>({
  defaultValue: "",
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

export const $step4FormErrors = createStoreObject({
  education: $educationError,
  workExperience: $workExperienceError,
  description: $descriptionError,
  phone: $phoneError
})

export const $step4FormValid = combine(
  $isEducationCorrect,
  $isWorkExperienceCorrect,
  $isDescriptionCorrect,
  $isPhoneCorrect,
  (...args) => args.every(val => val)
)

export const videoUploaded = createEvent<File>()

forward({
  from: videoUploaded,
  to: videoUploadFx
})
