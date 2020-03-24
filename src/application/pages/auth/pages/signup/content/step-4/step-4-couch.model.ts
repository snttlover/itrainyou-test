import { uploadMedia } from "@app/lib/api/media"
import { createEffectorField } from "@app/lib/generators/efffector"
import { trimString } from "@app/lib/validators"
import { couchDataChanged, REGISTER_SAVE_KEY, signUpDomain } from "@app/pages/auth/pages/signup/signup.model"
import { combine, createStoreObject, forward } from "effector"

export const [$education, educationChanged, $educationError, $isEducationCorrect] = createEffectorField<string>({
  domain: signUpDomain,
  defaultValue: "",
  eventMapper: event => event.map(trimString)
})

export const [
  $workExperience,
  workExperienceChanged,
  $workExperienceError,
  $isWorkExperienceCorrect
] = createEffectorField<string>({
  domain: signUpDomain,
  defaultValue: ""
})

export const [$description, descriptionChanged, $descriptionError, $isDescriptionCorrect] = createEffectorField<string>(
  {
    domain: signUpDomain,
    defaultValue: ""
  }
)

export const [$phone, phoneChanged, $phoneError, $isPhoneCorrect] = createEffectorField<string>({
  domain: signUpDomain,
  defaultValue: "",
  eventMapper: event => event.map(trimString)
})

export const videoUploadProgressChanged = signUpDomain.createEvent<number>()

export const videoUploadFx = signUpDomain.createEffect({
  handler(file: File) {
    return uploadMedia({ file, type: "OTHER" }, (pe: ProgressEvent) => {
      videoUploadProgressChanged(Math.round((pe.loaded * 100) / pe.total))
    })
  }
})

export const $videoUploadProgress = signUpDomain
  .createStore(0)
  .on(videoUploadProgressChanged, (state, payload) => payload)
  .reset(videoUploadFx.finally)

export const videoInterviewChanged = signUpDomain.createEvent<string>()
export const $videoInterview = signUpDomain
  .createStore("")
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

export const step4CouchMounted = signUpDomain.createEvent()

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
  } catch (e) {
    console.log(e)
  }
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

export const videoUploaded = signUpDomain.createEvent<File>()

forward({
  from: videoUploaded,
  to: videoUploadFx
})
