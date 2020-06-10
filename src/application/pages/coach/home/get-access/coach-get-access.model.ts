import { $form, $selectedCategories } from "@/application/feature/coach-get-access/coach-get-access.model"
import { loadUserDataFx } from "@/application/feature/user/user.model"
import { updateMyCoach } from "@/application/lib/api/coach/update-my-coach"
import { InferStoreType } from "@/application/lib/types/effector"
import { combine, createEffect, createEvent, forward, sample } from "effector"

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
  to: loadUserDataFx,
})
