import { Category, getCategories } from "@/application/lib/api/categories"
import { createUniversalStore } from "@/store"
import { createEffect} from "effector"

export const fetchCategoriesListFx = createEffect({
  handler: getCategories
})

export const $categoriesList = createUniversalStore<Category[]>([])
  .on(fetchCategoriesListFx.done, (state, payload) => payload.result)
