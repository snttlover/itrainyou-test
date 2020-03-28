import { Category, getCategories } from "@/application/lib/api/categories"
import { createEffect} from "effector-next"
import { createStore } from "effector-next"

export const fetchCategoriesListFx = createEffect({
  handler: () => getCategories()
})

export const $categoriesList = createStore<Category[]>([])
  .on(fetchCategoriesListFx.done, (state, payload) => payload.result)
