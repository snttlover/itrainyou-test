import { fetchCategoriesList } from "@/feature/categories/categories.store"
import {
  $form,
  $selectedCategories,
  descriptionChanged,
  educationChanged,
  restorePhotos,
  setCategories,
  videoInterviewChanged,
  workExperienceChanged,
  socialNetworkChanged,
  supervisionsChanged,
} from "@/feature/coach-get-access/coach-get-access.model"
import { $userData, loadUserData } from "@/feature/user/user.model"
import { updateMyCoach } from "@/lib/api/coach/update-my-coach"
import { InferStoreType } from "@/lib/types/effector"
import { combine, createEffect, createEvent, forward, sample } from "effector-root"
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
  const keys = Object.keys(form)
    .filter((key) => key !== "photos" && key !== "videoInterview")

  const paramsCount = keys.length + 1 // + categories

  let filledValuesCount = Number(categories.length > 0)

  for (const key of keys) {
    const value = form[key]

    if (Array.isArray(value) && value.length > 0) {
      // Проверяем что в массиве есть хоть один элемент
      filledValuesCount += 1
    } else if (isLiteralObject(value) && "d30Price" in value) {
      // Проверяем что хоть одно значение в расписании заполнено и не массив
      filledValuesCount += Number(Object.values(value).some((_value) => !!_value && !isArray(_value)))
    } else {
      // Проверяем что значение заполнено
      filledValuesCount += Number(!!value)
    }
  }

  return (filledValuesCount / paramsCount) * 100
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
  source: userDataLoaded.map(data => data.coach),
  targets: {
    socialNetworks: socialNetworkChanged,
    supervisions: supervisionsChanged,
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
  from: coachGetAccessMounted,
  to: fetchCategoriesList,
})
