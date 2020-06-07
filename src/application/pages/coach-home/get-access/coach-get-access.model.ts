import { $form, $selectedCategories } from "@/application/feature/coach-get-access/coach-get-access.model"
import { InferStoreType } from "@/application/lib/types/effector"
import { combine } from "effector"

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

export const $progress = combine({ form: $form, categories: $selectedCategories }).map(calculateProgress)
