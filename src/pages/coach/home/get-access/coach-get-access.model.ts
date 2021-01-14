import { fetchCategoriesList } from "@/feature/categories/categories.store"
import {
  $form,
  $selectedCategories,
  descriptionChanged,
  educationChanged,
  phoneChanged,
  restorePhotos,
  setCategories,
  videoInterviewChanged,
  workExperienceChanged,
} from "@/feature/coach-get-access/coach-get-access.model"
import { $userData, loadUserData } from "@/feature/user/user.model"
import { updateMyCoach } from "@/lib/api/coach/update-my-coach"
import { InferStoreType } from "@/lib/types/effector"
import { combine, createEffect, createEvent, forward, sample, Event } from "effector-root"
import { spread } from "patronum"
import { isLiteralObject } from "@/lib/helpers/utils"
import { isArray } from "@/lib/network/casing"

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

      // @ts-ignore
      // Проверка заполненность цен в расписании (schedule)
      if (isLiteralObject(value) && "d30Price" in value) {
        return Object.values(value).some((_value) => !isArray(_value) && Boolean(_value))
      }
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

const userDataLoaded = sample({
  source: $userData,
  clock: coachGetAccessMounted,
})

spread({
  source: userDataLoaded.map(data => data.coach) as Event<any>,
  targets: {
    description: descriptionChanged,
    education: educationChanged,
    phone: phoneChanged,
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
  from: coachGetAccessMounted,
  to: fetchCategoriesList,
})
