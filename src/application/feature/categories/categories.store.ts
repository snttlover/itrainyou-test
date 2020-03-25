import { Category, getCategories } from "@app/lib/api/categories"
import { appDomain } from "@app/store"
import { forward } from "effector"

const categoriesDomain = appDomain.createDomain('categories-domain')

const fetchCategoriesListFx = categoriesDomain.createEffect({
  handler: getCategories
})

export const loadCategories = categoriesDomain.createEvent()

export const $categoriesList = categoriesDomain.createStore<Category[]>([])
  .on(fetchCategoriesListFx.done, (state, payload) => payload.result)

forward({
  from: loadCategories,
  to: fetchCategoriesListFx
})
