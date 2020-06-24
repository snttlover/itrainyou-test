import { fetchCategoriesList } from "@/feature/categories/categories.store"
import {
  $form,
  $selectedCategories,
  descriptionChanged,
  educationChanged,
  phoneChanged,
  restorePhotos,
  toggleCategory,
  videoInterviewChanged,
  workExperienceChanged,
} from "@/feature/coach-get-access/coach-get-access.model"
import { $userData, loadUserData, UserData } from "@/feature/user/user.model"
import { updateMyCoach } from "@/lib/api/coach/update-my-coach"
import { InferStoreType } from "@/lib/types/effector"
import { attach, combine, createEffect, createEvent, forward, sample } from "effector"

const calculateProgress = ({
  form,
  categories,
}: {
  form: InferStoreType<typeof $form>
  categories: InferStoreType<typeof $selectedCategories>
}) => {
  const values = Object.values(form)
  let length = values.length

  let filledValues = values
    .map(value => {
      if (Array.isArray(value)) return value.length > 0
      return Boolean(value)
    })
    .reduce((acc, value) => acc + Number(value), 0)

  length++
  filledValues += Number(categories.length !== 0)

  return (filledValues / length) * 100
}

const $fullForm = combine({ form: $form, categories: $selectedCategories })

export const $progress = $fullForm.map(calculateProgress)

export const updateCoachData = createEvent()
export const patchCoachDataFx = createEffect({
  handler: updateMyCoach,
})

sample({
  source: $fullForm.map(({ form, categories }) => ({ ...form, categories })),
  clock: updateCoachData,
  target: patchCoachDataFx,
})

forward({
  from: patchCoachDataFx.done,
  to: loadUserData,
})

export const coachGetAccessMounted = createEvent()

const fillCoachData = attach({
  source: $userData,
  effect: createEffect({
    handler: (userData: UserData) => {
      const coach = userData.coach
      coach?.description && descriptionChanged(coach.description)
      coach?.education && educationChanged(coach.education)
      coach?.phone && phoneChanged(coach.phone)
      coach?.photos && restorePhotos(coach.photos)
      coach?.videoInterview && videoInterviewChanged(coach.videoInterview)
      coach?.workExperience && workExperienceChanged(coach.workExperience)
      coach?.categories && coach.categories.forEach(cat => toggleCategory(cat.id))
    },
  }),
  mapParams: (_: void, userData: UserData) => userData,
})

forward({
  from: coachGetAccessMounted,
  to: fetchCategoriesList,
})

forward({
  from: coachGetAccessMounted,
  to: fillCoachData,
})
